import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, MapPin, Sparkles } from 'lucide-react';
import { Calendar } from './Calendar';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    type: 'bridal',
  });

  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch booked dates from backend on mount
  useEffect(() => {
    const fetchBookings = async () => {
      const isLocal = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

      if (isLocal) {
        try {
          const res = await fetch('http://localhost:3001/api/bookings');
          if (res.ok) {
            const data = await res.json();
            const dates = data.map((b: any) => b.date);
            setBookedDates(dates);
            return;
          }
        } catch (e) {
          console.warn("Local booking agent offline, using fallback");
        }
      }

      // Fallback for production or offline local testing: fetch from static bookings.json
      try {
        const resStatic = await fetch('/bookings.json');
        if (resStatic.ok) {
          const data = await resStatic.json();
          setBookedDates(data.map((b: any) => b.date));
        }
      } catch (err) {
        const stored = localStorage.getItem('aura_bookings');
        if (stored) {
          setBookedDates(JSON.parse(stored));
        } else {
          // Initial mock pre-bookings
          const initialMock = ['2026-07-25', '2026-08-01', '2026-08-15'];
          setBookedDates(initialMock);
        }
      }
    };
    fetchBookings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      alert("Please select a date on the calendar first.");
      return;
    }
    setIsSubmitting(true);

    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    let submittedToBackend = false;

    if (isLocal) {
      try {
        const res = await fetch('http://localhost:3001/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const data = await res.json();
          bookedDates.push(data.date);
          setBookedDates([...bookedDates]);
          submittedToBackend = true;
        }
      } catch (err) {
        console.warn("Local booking agent connection failed, falling back to WhatsApp dispatch");
      }
    }

    if (submittedToBackend) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        date: '',
        type: 'bridal',
      });
    } else {
      // Save locally to localStorage so the calendar picker updates visually for this session
      const updatedDates = [...bookedDates, formData.date];
      setBookedDates(updatedDates);
      localStorage.setItem('aura_bookings', JSON.stringify(updatedDates));

      // Construct a pre-formatted WhatsApp message redirecting user directly to Priya
      const whatsappText = encodeURIComponent(
        `Hello Priya, I would like to confirm my reservation request for Aura Makeup! I look forward to your confirmation text soon.\n\n` +
        `✨ *Reservation Summary* ✨\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📅 *Date:* ${formData.date}\n` +
        `💄 *Service:* ${formData.type.toUpperCase()}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📍 *Location:* ${formData.location}\n` +
        `📧 *Email:* ${formData.email}`
      );
      
      const waLink = `https://wa.me/918072270912?text=${whatsappText}`;
      
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open WhatsApp click-to-chat in new tab
      window.open(waLink, '_blank');

      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        date: '',
        type: 'bridal',
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-luxury-black text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      {/* Background Decorative Gold Grid Lines */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-400/2 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Editorial Inquiry Text & Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-xs font-sans tracking-[0.3em] uppercase text-gold-300 mb-3"
            >
              Reserve Your Date
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="font-serif text-4xl md:text-5xl tracking-wide uppercase font-light mb-8"
            >
              Book Consultation
            </motion.h2>
            <p className="font-sans text-sm text-gold-100/70 font-light leading-relaxed mb-10">
              Dates for the current bridal season fill quickly. Please submit your inquiry details below. We reply to all bespoke bridal consultations within 24–48 business hours with custom quote configurations.
            </p>

            {/* Quick Details List */}
            <div className="space-y-6 font-sans text-xs tracking-wider text-gold-200/80">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-400/10 flex items-center justify-center text-gold-400">
                  <Mail size={14} />
                </div>
                <span>inquiries@auramakeup.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-400/10 flex items-center justify-center text-gold-400">
                  <MapPin size={14} />
                </div>
                <span>Available Worldwide (Based in Milan & New York)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-400/10 flex items-center justify-center text-gold-400">
                  <Sparkles size={14} />
                </div>
                <span>Exclusive Bookings Open for 2026/2027 Seasons</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Booking Form */}
          <div className="lg:col-span-7 bg-luxury-dark/40 border border-gold-400/10 p-8 md:p-12 relative min-h-[500px] flex items-center justify-center">
            
            {/* Form Success Overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-luxury-dark z-20 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full border border-gold-400 flex items-center justify-center text-gold-400 mb-6">
                  <Check size={28} />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-gold-50 tracking-wider uppercase font-light mb-4">
                  Inquiry Received
                </h3>
                <p className="font-sans text-xs text-gold-100/60 tracking-widest max-w-sm mx-auto leading-relaxed">
                  Thank you for choosing Aura Makeup. Priya and her concierge team will review your date and details and connect with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 font-sans text-[10px] tracking-[0.2em] text-gold-400 hover:text-gold-300 uppercase transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400/80 mb-2 font-medium">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0c0c0c] border border-gold-400/15 focus:border-gold-400/50 px-4 py-3 text-sm font-sans tracking-wide text-gold-50 outline-none transition-all duration-300 rounded-none shadow-inner"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400/80 mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0c0c0c] border border-gold-400/15 focus:border-gold-400/50 px-4 py-3 text-sm font-sans tracking-wide text-gold-50 outline-none transition-all duration-300 rounded-none shadow-inner"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400/80 mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0c0c0c] border border-gold-400/15 focus:border-gold-400/50 px-4 py-3 text-sm font-sans tracking-wide text-gold-50 outline-none transition-all duration-300 rounded-none shadow-inner"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400/80 mb-2 font-medium">
                    Event Location / Venue
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#0c0c0c] border border-gold-400/15 focus:border-gold-400/50 px-4 py-3 text-sm font-sans tracking-wide text-gold-50 outline-none transition-all duration-300 rounded-none shadow-inner"
                  />
                </div>
              </div>

              {/* Row 3: Service Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400/80 mb-2 font-medium">
                    Select Service
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-[#0c0c0c] border border-gold-400/15 focus:border-gold-400/50 px-4 py-3 text-sm font-sans tracking-wide text-gold-50 outline-none transition-all duration-300 cursor-pointer appearance-none rounded-none text-gold-100/80 pr-10"
                    >
                      <option value="bridal" className="bg-luxury-dark text-gold-50">Bridal Makeup</option>
                      <option value="engagement" className="bg-luxury-dark text-gold-50">Engagement Makeup</option>
                      <option value="reception" className="bg-luxury-dark text-gold-50">Reception Makeup</option>
                      <option value="party" className="bg-luxury-dark text-gold-50">Party & Guest Makeup</option>
                      <option value="hd-airbrush" className="bg-luxury-dark text-gold-50">HD & Airbrush Makeup</option>
                      <option value="workshops" className="bg-luxury-dark text-gold-50">Makeup Workshops</option>
                    </select>
                    <span className="absolute right-4 top-3.5 pointer-events-none text-gold-400 text-xs">▼</span>
                  </div>
                </div>
              </div>

              {/* Custom React Calendar Component */}
              <div className="space-y-2 relative">
                <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-gold-400/80 font-medium">
                  Select Event Date on Calendar
                </label>
                <Calendar
                  bookedDates={bookedDates}
                  selectedDate={formData.date}
                  onChange={(dateStr) => setFormData((prev) => ({ ...prev, date: dateStr }))}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-sans text-xs tracking-[0.25em] font-medium bg-gold-400 hover:bg-gold-300 text-luxury-black py-4 transition-all duration-500 rounded-none uppercase hover-luxury flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-gold-400/10"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-luxury-black border-t-transparent rounded-full" />
                    Processing Consultation...
                  </>
                ) : (
                  'Send Reservation Request'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
