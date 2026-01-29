
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Zap, CheckCircle, Star, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  console.log('Home component rendering...');
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-36 lg:pt-40 lg:pb-56 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-ice/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[0%] right-[10%] w-[600px] h-[600px] bg-navy/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ice/10 border border-ice/20 text-ice text-xs font-black uppercase tracking-widest mb-10 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            <span>Enterprise Software Solutions</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-navy tracking-tighter leading-[0.95] mb-10">
            Precision Code. <br />
            <span className="text-ice">Impactful Results.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-navy/60 leading-relaxed mb-14 font-medium">
            PentaCode provides elite web, mobile, and AI engineering services for startups and enterprises ready to scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8">
            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-ice text-white rounded-2xl font-black hover:bg-ice-dark transition-soft shadow-2xl shadow-ice/30 flex items-center justify-center group hover-lift">
              Start Free Consultation
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-soft" />
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-navy/5 text-navy font-black rounded-2xl hover:border-ice hover:text-ice transition-soft flex items-center justify-center hover-lift">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-32 bg-neutral-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-navy mb-6 tracking-tight">Technical Excellence Across <br />Every Modality</h2>
              <p className="text-lg text-navy/60 font-medium">We specialize in three core pillars of digital transformation.</p>
            </div>
            <Link to="/services" className="mt-8 lg:mt-0 text-ice font-bold flex items-center hover:underline group">
              Browse All Services <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-soft" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Code className="w-10 h-10" />,
                title: 'Web Engineering',
                desc: 'Highly scalable Next.js and Go-based cloud architectures designed for millions of concurrent users.',
                color: 'bg-white border-b-4 border-ice'
              },
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: 'Mobile Ecosystems',
                desc: 'Cross-platform and native mobile experiences that maintain fluid performance and deep user engagement.',
                color: 'bg-white border-b-4 border-navy'
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: 'AI Integration',
                desc: 'Customized LLM pipelines, predictive analytics, and computer vision models that drive business intelligence.',
                color: 'bg-white border-b-4 border-ice'
              }
            ].map((s, i) => (
              <div key={i} className={`${s.color} p-10 rounded-3xl card-shadow hover-lift transition-soft group`}>
                <div className="w-16 h-16 rounded-2xl bg-neutral-offwhite flex items-center justify-center mb-10 text-navy group-hover:bg-ice group-hover:text-white transition-soft">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black text-navy mb-5">{s.title}</h3>
                <p className="text-navy/60 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ice rounded-full blur-[200px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-10 tracking-tight leading-tight">Elite Engineering <br /> For High-Stakes Projects</h2>
              <div className="space-y-8">
                {[
                  'Senior-Lead Engineering Teams',
                  'ISO-Grade Security Protocols',
                  'Predictable Agile Delivery',
                  'Full-Cycle Maintenance & Support'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 group">
                    <div className="p-2 bg-ice/20 rounded-lg group-hover:bg-ice transition-soft">
                      <CheckCircle className="w-6 h-6 text-ice group-hover:text-white" />
                    </div>
                    <span className="text-xl text-white/80 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: '99.9%', desc: 'Uptime Reliability' },
                { label: '150+', desc: 'Ships completed' },
                { label: '24h', desc: 'SLA Response' },
                { label: '10M+', desc: 'End Users' }
              ].map((stat, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-soft">
                  <p className="text-4xl font-black text-ice mb-2">{stat.label}</p>
                  <p className="text-white/50 font-bold uppercase tracking-widest text-xs">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
           <h2 className="text-5xl font-black text-navy mb-8">Ready to Elevate Your Technology?</h2>
           <p className="text-xl text-navy/60 mb-12 font-medium">Join 50+ industry leaders who trust RaziqTech for their most critical software assets.</p>
           <Link to="/contact" className="inline-flex items-center px-12 py-6 bg-navy text-white rounded-2xl font-black text-xl hover:bg-navy-light transition-soft hover-lift shadow-2xl">
             Get a Project Quote
             <ArrowRight className="ml-4 w-6 h-6" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
