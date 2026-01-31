
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe } from 'lucide-react';
import { MockDB } from '../db';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Engineering',
    budget: '$10k - $50k',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set this in your .env as VITE_FORMSPREE_ENDPOINT="https://formspree.io/f/mwvbjlqd"
  const FORMSPREE_ENDPOINT = (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/mwvbjlqd';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget,
        message: formData.message,
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // keep local copy as before
        MockDB.addInquiry(formData);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          projectType: 'Web Development',
          budget: '$25k - $50k',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        setError(data?.error || data?.errors?.[0]?.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-navy mb-10 tracking-tighter leading-none">Let's Discuss Your <span className="text-ice">Next Move.</span></h1>
            <p className="text-xl text-navy/60 mb-16 font-medium leading-relaxed">Whether you are architecting a new platform or upgrading existing infrastructure, our engineering leads are ready to consult.</p>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-navy text-ice rounded-2xl flex items-center justify-center shrink-0 shadow-xl">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-navy text-lg mb-1">Technical Inquiry</h4>
                  <p className="text-navy/60 font-bold">pentacode05@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-navy text-ice rounded-2xl flex items-center justify-center shrink-0 shadow-xl">
                  <Globe className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-navy text-lg mb-1">HQ Location</h4>
                  <p className="text-navy/60 font-bold">Lahore, Punjab, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 lg:p-20 rounded-[3rem] border border-navy/5 shadow-2xl relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 bg-ice/10 text-ice rounded-full flex items-center justify-center mb-10">
                  <CheckCircle className="w-14 h-14" />
                </div>
                <h3 className="text-4xl font-black text-navy mb-4">Brief Received.</h3>
                <p className="text-navy/60 font-bold">An engineering lead will review your requirements and respond within 12 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-10 text-ice font-bold hover:underline">Send another brief</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                      placeholder="Alex Rivera"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">Work Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                      placeholder="alex@enterprise.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">Project Domain</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold appearance-none cursor-pointer"
                    >
                      <option value="Web Engineering">Web Engineering</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="AI Implementation">AI Implementation</option>
                      {/* <option value="Infrastructure Audit">Infrastructure Audit</option> */}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">Target Budget</label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold appearance-none cursor-pointer"
                    >
                      <option value="$50 - $1K">$50 - $1K</option>
                      <option value="$1k - $10k">$1k - $10k</option>
                      <option value="$10k - $50k">$10k - $50k</option>
                      <option value="$50k+">$50k+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-navy/40">Technical Brief</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                    placeholder="Describe your goals, tech stack, and timeline..."
                  ></textarea>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 font-bold">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full py-6 ${loading ? 'opacity-60 cursor-not-allowed' : 'bg-navy hover:bg-navy-light'} text-white rounded-2xl font-black text-xl shadow-2xl transition-soft flex items-center justify-center group hover-lift`}
                >
                  {loading ? 'Sending…' : 'Submit Brief'}
                  <Send className="ml-4 w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-1 transition-soft" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
