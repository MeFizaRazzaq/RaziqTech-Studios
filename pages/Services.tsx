
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, BrainCircuit, Check, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const categories = [
    {
      id: 'web',
      icon: <Code className="w-10 h-10" />,
      title: 'Web Engineering',
      description: 'We develop robust, distributed web applications designed for infinite scalability. Our architectural approach ensures low latency, high availability, and ironclad security.',
      useCases: ['SaaS Product Engineering', 'Internal Enterprise Portals', 'Real-time Financial Dashboards', 'Headless CMS Ecosystems'],
      techs: ['Next.js', 'Go', 'Kubernetes', 'PostgreSQL'],
      bg: 'bg-white border-l-8 border-ice'
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Mobile App Development',
      description: 'Premium mobile experiences that feel native regardless of the platform. We focus on gestures, performance, and offline-first capabilities for superior UX.',
      useCases: ['Fintech Payment Systems', 'Consumer Lifestyle Apps', 'Field Service Management', 'Social Engagement Hubs'],
      techs: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
      bg: 'bg-white border-l-8 border-navy'
    },
    {
      id: 'ai',
      icon: <BrainCircuit className="w-10 h-10" />,
      title: 'AI / ML Solutions',
      description: 'Deep technical implementation of artificial intelligence. We go beyond wrappers to build custom inference engines and predictive models that solve real problems.',
      useCases: ['Predictive Logistics AI', 'NLP Customer Success Bot', 'Visual Quality Inspection', 'Churn Prediction Models'],
      techs: ['Python', 'PyTorch', 'TensorFlow', 'Azure AI'],
      bg: 'bg-white border-l-8 border-ice'
    }
  ];

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-32">
          <h1 className="text-5xl lg:text-6xl font-black text-navy mb-8 tracking-tighter">Capabilities Statement</h1>
          <p className="text-xl text-navy/60 leading-relaxed font-medium">RaziqTech provides a specialized suite of software engineering services designed to push the boundaries of what's possible for your business.</p>
        </div>

        <div className="space-y-40">
          {categories.map((cat, i) => (
            <div key={cat.id} className={`flex flex-col lg:flex-row gap-24 items-start ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className="inline-block p-4 bg-navy text-ice rounded-2xl mb-10 shadow-xl">
                  {cat.icon}
                </div>
                <h2 className="text-4xl font-black text-navy mb-8 tracking-tight">{cat.title}</h2>
                <p className="text-xl text-navy/60 leading-relaxed mb-10 font-medium">{cat.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {cat.useCases.map((use, idx) => (
                    <div key={idx} className="flex items-center space-x-4 text-navy font-bold group">
                      <div className="w-6 h-6 rounded-full bg-ice/20 flex items-center justify-center text-ice group-hover:bg-ice group-hover:text-white transition-soft">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>{use}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                  {cat.techs.map((t, idx) => (
                    <span key={idx} className="px-4 py-2 bg-neutral-offwhite text-navy/70 rounded-xl text-sm font-black border border-navy/5">
                      {t}
                    </span>
                  ))}
                </div>

                <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-ice text-white rounded-2xl font-black hover:bg-ice-dark transition-soft shadow-lg hover-lift">
                  Request Service Brief
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </div>
              
              <div className="lg:w-1/2 w-full h-[500px] rounded-[3rem] overflow-hidden bg-navy group relative card-shadow border border-navy/5">
                 <img src={`https://picsum.photos/seed/${cat.id}tech/1000/1000`} alt={cat.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-soft duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60"></div>
                 <div className="absolute bottom-12 left-12 right-12">
                    <p className="text-white text-3xl font-black mb-2">{cat.title} Case Study</p>
                    <p className="text-white/70 font-bold">Scaling for 1M+ active daily sessions.</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
