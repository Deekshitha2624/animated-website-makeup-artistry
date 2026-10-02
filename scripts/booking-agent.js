import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const DB_PATH = path.join(__dirname, '../public/bookings.json');

// Twilio Config from environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || ''; // e.g., 'whatsapp:+14155238886'
const FOUNDER_PHONE_NUMBER = process.env.FOUNDER_PHONE_NUMBER || 'whatsapp:+918072270912';     // e.g., 'whatsapp:+91XXXXXXXXXX'

// Generic Helper to send a Twilio WhatsApp message
function sendTwilioMessage(toNumber, bodyText, label) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    console.log('\n======================================================================');
    console.log(`📱 [WHATSAPP DISPATCH SIMULATED (Missing API Keys in .env)]`);
    console.log(`Recipient (${label}): ${toNumber}`);
    console.log('----------------------------------------------------------------------');
    console.log(bodyText);
    console.log('======================================================================\n');
    return;
  }

  const postData = new URLSearchParams({
    To: toNumber,
    From: TWILIO_WHATSAPP_NUMBER,
    Body: bodyText,
  }).toString();

  const options = {
    hostname: 'api.twilio.com',
    port: 443,
    path: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
    },
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      if (res.statusCode === 201) {
        console.log(`📱 [WhatsApp Agent] Twilio message (${label}) dispatched successfully to ${toNumber}`);
      } else {
        console.error(`❌ [WhatsApp Agent] Twilio WhatsApp request (${label}) failed: ${res.statusCode}`, body);
      }
    });
  });

  req.on('error', (err) => {
    console.error(`❌ [WhatsApp Agent] Twilio connection error (${label}):`, err);
  });

  req.write(postData);
  req.end();
}

// Main Dispatcher to notify both Owner and Customer
function sendWhatsAppNotification(booking) {
  // Format Customer Phone for Twilio
  let clientPhone = booking.phone.trim();
  if (!clientPhone.startsWith('+') && !clientPhone.startsWith('whatsapp:')) {
    if (clientPhone.length === 10) {
      clientPhone = '+91' + clientPhone; // Default to India prefix if 10 digits
    } else {
      clientPhone = '+' + clientPhone;
    }
  }
  const clientWhatsappNumber = clientPhone.startsWith('whatsapp:') ? clientPhone : 'whatsapp:' + clientPhone;

  // 1. Dispatch Summary to Owner (Priya)
  const ownerText = `✨ *Aura Makeup - New Booking Reservation* ✨\n\n` +
                    `👤 *Name:* ${booking.name}\n` +
                    `📅 *Date:* ${booking.date}\n` +
                    `💄 *Service:* ${booking.type.toUpperCase()}\n` +
                    `📍 *Location:* ${booking.location}\n` +
                    `📧 *Email:* ${booking.email}\n` +
                    `📞 *Client Phone:* ${booking.phone}\n\n` +
                    `Please check your bookings calendar dashboard!`;
  
  sendTwilioMessage(FOUNDER_PHONE_NUMBER, ownerText, 'Owner Summary');

  // 2. Dispatch Confirmation to Customer
  const customerText = `Hello ${booking.name},\n\n` +
                        `Thank you for submitting your booking request to *Aura Makeup* for *${booking.date}*!\n\n` +
                        `We have received your reservation request and will text you soon to confirm your details. We look forward to creating your luxury look!\n\n` +
                        `Warm regards,\n` +
                        `Priya & The Aura Makeup Team`;
  
  sendTwilioMessage(clientWhatsappNumber, customerText, 'Customer Confirmation');
}

// HTTP Server
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // GET /api/bookings
  if (req.method === 'GET' && parsedUrl.pathname === '/api/bookings') {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to read bookings database' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  // POST /api/bookings
  if (req.method === 'POST' && parsedUrl.pathname === '/api/bookings') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const newBooking = JSON.parse(body);
        
        if (!newBooking.date || !newBooking.name || !newBooking.email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Required fields missing: date, name, email' }));
          return;
        }

        // Read current file
        fs.readFile(DB_PATH, 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database access failure' }));
            return;
          }

          let bookings = [];
          try {
            bookings = JSON.parse(data);
          } catch (e) {
            bookings = [];
          }

          // Check availability conflict
          const dateConflict = bookings.some(b => b.date === newBooking.date);
          if (dateConflict) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Selected date is already booked.' }));
            return;
          }

          // Save new booking
          bookings.push(newBooking);
          fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2), (writeErr) => {
            if (writeErr) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Database write failure' }));
              return;
            }

            console.log(`📅 [Booking System] Registered new reservation: ${newBooking.name} on ${newBooking.date}`);
            
            // Dispatch WhatsApp Alert
            sendWhatsAppNotification(newBooking);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newBooking));
          });
        });

      } catch (parseErr) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON request payload' }));
      }
    });
    return;
  }

  // POST /api/chat
  if (req.method === 'POST' && parsedUrl.pathname === '/api/chat') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const chatReq = JSON.parse(body);
        const userMsg = (chatReq.message || '').trim().toLowerCase();

        if (!userMsg) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message is required' }));
          return;
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

        // If Gemini API Key is set, call the actual API
        if (GEMINI_API_KEY) {
          const systemPrompt = `You are Priya's AI Concierge, a luxury customer support assistant for Aura Makeup (Priya's bridal and editorial makeup studio). Be polite, elegant, warm, and professional. Keep your answers concise, clear, and highly focused.
          Aura Makeup details:
          - Founder: Priya, Lead Makeup Artist. Famous for luminous, editorial skin.
          - Services: Bridal Makeup ($850+), Engagement Makeup, Reception Makeup, Party & Guest Makeup, HD & Airbrush Makeup, Makeup Workshops.
          - Prices: Classic Elegance ($600+), Couture Diamond ($850+), Editorial Royal ($1200+).
          - WhatsApp bookings: client requests are saved to database, clients get a confirmation text, and Priya gets a summary text immediately to her number 918072270912.
          - Trial sessions: highly recommended 2-3 months before the wedding.
          - Products used: elite luxury brands (Chanel, Dior, Tom Ford, Charlotte Tilbury, Pat McGrath).
          - Bridal party size: up to 8 people. Senior associates assist for larger groups.
          - Location: Based in Milan & New York, travels worldwide for destination weddings.`;

          const apiPayload = JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: chatReq.message }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { maxOutputTokens: 250, temperature: 0.6 }
          });

          const apiOptions = {
            hostname: 'generativelanguage.googleapis.com',
            port: 443,
            path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(apiPayload)
            }
          };

          const apiReq = https.request(apiOptions, (apiRes) => {
            let apiBody = '';
            apiRes.on('data', (chunk) => { apiBody += chunk; });
            apiRes.on('end', () => {
              try {
                if (apiRes.statusCode === 200) {
                  const apiResponse = JSON.parse(apiBody);
                  const replyText = apiResponse.candidates[0].content.parts[0].text;
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ reply: replyText }));
                } else {
                  console.warn(`⚠️ [Gemini API] Request failed with status ${apiRes.statusCode}. Falling back to rule engine.`);
                  runLocalMatcher(chatReq.message, res);
                }
              } catch (e) {
                runLocalMatcher(chatReq.message, res);
              }
            });
          });

          apiReq.on('error', (err) => {
            console.error('❌ [Gemini API] Connection error:', err);
            runLocalMatcher(chatReq.message, res);
          });

          apiReq.write(apiPayload);
          apiReq.end();

        } else {
          // If no API Key is set, run local rule matcher
          runLocalMatcher(chatReq.message, res);
        }

      } catch (parseErr) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON request payload' }));
      }
    });
    return;
  }

  // Local rule-based matcher function
  function runLocalMatcher(rawMsg, responseObj) {
    const msg = rawMsg.toLowerCase();
    let reply = "";

    if (msg.includes('price') || msg.includes('package') || msg.includes('cost') || msg.includes('pricing') || msg.includes('rate') || msg.includes('charge')) {
      reply = "Aura Makeup offers three bespoke pricing packages to fit your wedding aesthetic:\n\n• *Classic Elegance ($600+):* Full bridal application, standard skin-prep, and soft glam.\n• *Couture Diamond ($850+):* Custom HD/Airbrush makeup, luxury skin-prep, and custom hair consulting.\n• *Editorial Royal ($1,200+):* Full day coverage, multiple look changes, premium hair styling, and styling consultations.\n\nYou can view all details under our 'Packages' section!";
    } else if (msg.includes('product') || msg.includes('brand') || msg.includes('kit') || msg.includes('makeup used') || msg.includes('cream')) {
      reply = "Priya exclusively utilizes elite luxury brands in her kit to guarantee flawless, photographic longevity. These include *Chanel, Dior, Tom Ford, Charlotte Tilbury, and Pat McGrath Labs*, selected specifically for your skin type.";
    } else if (msg.includes('trial') || msg.includes('consultation') || msg.includes('test') || msg.includes('practice')) {
      reply = "Yes, bridal trial sessions are highly recommended! We suggest scheduling your trial 2–3 months before your wedding date. This is booked as part of our Bespoke Bridal Packages.";
    } else if (msg.includes('party') || msg.includes('guest') || msg.includes('bridesmaid') || msg.includes('group') || msg.includes('size') || msg.includes('people')) {
      reply = "Aura Makeup coordinates bookings for bridal parties of up to 8 people. For larger groups, Priya coordinates with senior associate artists to ensure everyone is ready on schedule.";
    } else if (msg.includes('priya') || msg.includes('elena') || msg.includes('artist') || msg.includes('founder') || msg.includes('lead')) {
      reply = "Priya is the Lead Makeup Artist and Founder of Aura Makeup. She is celebrated for her signature 'luminous from within' editorial skin finishes, serving brides worldwide from Milan and New York.";
    } else if (msg.includes('book') || msg.includes('reserve') || msg.includes('calendar') || msg.includes('available') || msg.includes('date')) {
      reply = "To check availability and secure your date, please head to the 'Book Consultation' section. Select an open date on our luxury interactive calendar, fill out your details, and click submit. You will receive an instant WhatsApp confirmation!";
    } else if (msg.includes('location') || msg.includes('studio') || msg.includes('where') || msg.includes('travel') || msg.includes('destination')) {
      reply = "Aura Makeup is available worldwide for destination weddings. Priya is based out of Milan and New York, and frequently travels to destinations like Lake Como, Paris, and the Amalfi Coast.";
    } else {
      reply = "Thank you for contacting Aura Makeup. We would love to be part of your special day. For specific booking questions or availability inquiries, please select your target date on our calendar above and submit your reservation request. Priya or her concierge team will connect with you via WhatsApp shortly!";
    }

    // Simulate short network delay to feel like a real chatbot
    setTimeout(() => {
      responseObj.writeHead(200, { 'Content-Type': 'application/json' });
      responseObj.end(JSON.stringify({ reply: reply }));
    }, 600);
  }

  // Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`🤖 [Booking Agent Backend] Running locally on http://localhost:${PORT}`);
  console.log(`📁 Database path: ${DB_PATH}`);
});
