import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID || 'placeholder'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-titanium-800 p-12 rounded-3xl text-center max-w-xl mx-auto border border-white/5"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-blue-500" />
        </div>
        <h3 className="text-3xl font-bold mb-4 tracking-tight">Thank You.</h3>
        <p className="text-titanium-400">
          Your message has been received. Our specialists will review your request and get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-blue-500 font-semibold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-titanium-800 p-8 md:p-12 rounded-3xl max-w-4xl mx-auto border border-white/5"
    >
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Contact Us.</h2>
          <p className="text-titanium-400 mb-8 leading-relaxed">
            Looking for a specific titanium-glass installation? Our studio specializes in bespoke aerospace-themed art for private residences and public spaces.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-titanium-700 flex items-center justify-center text-blue-500">
                📍
              </div>
              <span className="text-titanium-200">Titanium Heights, San Francisco CA</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-titanium-700 flex items-center justify-center text-blue-500">
                ✉️
              </div>
              <span className="text-titanium-200">concierge@luminagrove.com</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-titanium-500">Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white"
                placeholder="Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-titanium-500">Email</label>
              <input 
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-titanium-500">Message</label>
            <textarea 
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none text-white"
              placeholder="How can we help?"
            />
          </div>
          <button
            disabled={status === 'submitting'}
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};
