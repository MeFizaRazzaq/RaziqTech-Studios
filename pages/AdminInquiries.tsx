
import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Mail, 
  Calendar, 
  DollarSign, 
  Tag, 
  Archive, 
  Check, 
  Send, 
  Reply, 
  MoreVertical, 
  ArrowLeft,
  User as UserIcon,
  MessageSquare,
  Search,
  Inbox,
  Clock,
  ExternalLink
} from 'lucide-react';
import { MockDB } from '../db';
import { Inquiry, Message } from '../types';
import { useAuth } from '../App';

const AdminInquiries: React.FC = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState(MockDB.getInquiries());
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedInquiry = inquiries.find(i => i.id === selectedInquiryId);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setInquiries(MockDB.getInquiries());
    };
    window.addEventListener('db-update', handleUpdate);
    return () => window.removeEventListener('db-update', handleUpdate);
  }, []);

  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedInquiry?.thread]);

  const toggleStatus = (id: string, status: Inquiry['status']) => {
    MockDB.updateInquiryStatus(id, status);
    setInquiries(MockDB.getInquiries());
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiryId || !replyContent.trim() || !user) return;

    MockDB.addReplyToInquiry(selectedInquiryId, {
      senderName: user.name,
      senderEmail: user.email,
      content: replyContent,
      isAdmin: true
    });

    setReplyContent('');
    setInquiries(MockDB.getInquiries());
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.projectType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pl-72 h-screen bg-neutral-offwhite flex flex-col overflow-hidden">
      <AdminSidebar />
      
      {/* Header */}
      <div className="bg-white border-b border-navy/5 px-12 py-8 flex items-center justify-between z-10">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Technical Leads CRM</h1>
          <p className="text-navy/40 font-bold text-sm uppercase tracking-widest">Inbound Pipeline & Communication relay</p>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30" />
          <input 
            type="text" 
            placeholder="Search by client identifier..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold text-sm"
          />
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar List */}
        <div className="w-[450px] border-r border-navy/5 bg-white overflow-y-auto">
          <div className="p-4 border-b border-navy/5 flex items-center justify-between bg-neutral-offwhite/30">
            <span className="text-[10px] font-black uppercase tracking-widest text-navy/40 flex items-center">
              <Inbox className="w-3 h-3 mr-2" />
              Incoming Buffers
            </span>
          </div>
          {filteredInquiries.length === 0 ? (
            <div className="p-12 text-center opacity-30">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p className="font-black text-xs uppercase tracking-widest">No matching leads</p>
            </div>
          ) : (
            <div className="divide-y divide-navy/5">
              {filteredInquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => setSelectedInquiryId(inq.id)}
                  className={`w-full p-8 text-left transition-soft hover:bg-neutral-offwhite/50 relative overflow-hidden group ${selectedInquiryId === inq.id ? 'bg-ice/5 border-l-4 border-ice' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${inq.status === 'New' ? 'bg-navy text-ice' : 'bg-neutral-offwhite text-navy/40'}`}>
                        {inq.name.charAt(0)}
                      </div>
                      <p className="font-black text-navy">{inq.name}</p>
                    </div>
                    <p className="text-[9px] font-black text-navy/30 uppercase">{new Date(inq.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-black text-ice uppercase tracking-widest mb-1">{inq.projectType}</p>
                    <p className="text-sm text-navy/50 font-medium line-clamp-1">{inq.message}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-navy/40 px-2 py-1 bg-neutral-offwhite rounded-lg uppercase tracking-widest">
                      Budget: {inq.budget}
                    </span>
                    {inq.status === 'New' && (
                      <div className="w-2 h-2 rounded-full bg-ice shadow-[0_0_8px_#3AAFA9]"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Conversation View */}
        <div className="flex-grow bg-white flex flex-col relative">
          {selectedInquiry ? (
            <>
              {/* Converstation Header */}
              <div className="p-10 border-b border-navy/5 flex items-center justify-between bg-white shadow-sm relative z-10">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center text-2xl font-black text-ice">
                    {selectedInquiry.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-navy tracking-tight">{selectedInquiry.name}</h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs font-bold text-navy/40">{selectedInquiry.email}</p>
                      <span className="w-1 h-1 rounded-full bg-navy/20"></span>
                      <p className="text-xs font-black text-ice uppercase tracking-widest">{selectedInquiry.status} Lead</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleStatus(selectedInquiry.id, 'Archived')}
                    className="p-4 bg-neutral-offwhite text-navy/40 hover:text-red-500 rounded-2xl transition-soft shadow-sm"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleStatus(selectedInquiry.id, 'Read')}
                    className="px-8 py-4 bg-navy text-white rounded-2xl font-black text-sm hover:bg-navy-light transition-soft shadow-xl"
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>

              {/* Thread Area */}
              <div className="flex-grow overflow-y-auto p-12 space-y-12 bg-neutral-offwhite/30">
                {/* Initial Inquiry Message */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-white p-10 rounded-[2.5rem] rounded-tl-none border border-navy/5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Mail className="w-12 h-12" />
                    </div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-2 h-2 rounded-full bg-ice"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Initial Brief Received</span>
                    </div>
                    <p className="text-navy/70 leading-relaxed font-medium text-lg mb-8">
                      {selectedInquiry.message}
                    </p>
                    <div className="pt-6 border-t border-navy/5 flex items-center space-x-10">
                      <div className="flex items-center text-[10px] font-black text-navy/40 uppercase tracking-widest">
                        <Tag className="w-4 h-4 mr-2" /> {selectedInquiry.projectType}
                      </div>
                      <div className="flex items-center text-[10px] font-black text-navy/40 uppercase tracking-widest">
                        <DollarSign className="w-4 h-4 mr-2" /> {selectedInquiry.budget}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thread Messages */}
                {selectedInquiry.thread?.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                    <div className={`max-w-[75%] p-8 rounded-[2rem] shadow-lg ${msg.isAdmin ? 'bg-navy text-white rounded-tr-none' : 'bg-white text-navy rounded-tl-none border border-navy/5'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${msg.isAdmin ? 'text-ice' : 'text-navy/40'}`}>
                          {msg.senderName} {msg.isAdmin && ' (Support Engineer)'}
                        </p>
                        <p className={`text-[9px] font-bold ${msg.isAdmin ? 'text-white/30' : 'text-navy/20'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <p className={`leading-relaxed ${msg.isAdmin ? 'font-medium' : 'font-semibold'}`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={threadEndRef} />
              </div>

              {/* Reply Box */}
              <div className="p-8 bg-white border-t border-navy/5 relative">
                <form onSubmit={handleSendReply} className="relative">
                  <textarea 
                    rows={4}
                    placeholder="Compose technical response..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full p-8 bg-neutral-offwhite border-2 border-transparent rounded-[2rem] focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold text-navy resize-none pr-32"
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={!replyContent.trim()}
                    className="absolute bottom-6 right-6 p-5 bg-ice text-white rounded-2xl shadow-xl shadow-ice/20 hover:bg-ice-dark transition-soft disabled:opacity-30 disabled:shadow-none"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </form>
                <div className="mt-4 flex items-center space-x-6 px-4">
                  <div className="flex items-center space-x-2 text-[10px] font-black text-navy/30 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Real-time Relay Active</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-black text-navy/30 uppercase tracking-widest">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Send via solution@raziqtech.com</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-24 text-center">
              <div className="w-40 h-40 bg-neutral-offwhite rounded-[3rem] flex items-center justify-center mb-10 border-4 border-white shadow-xl">
                <Mail className="w-16 h-16 text-navy/10" />
              </div>
              <h3 className="text-3xl font-black text-navy mb-4 tracking-tight">Select a Technical Brief</h3>
              <p className="text-navy/40 font-bold max-w-sm">Review incoming leads from global enterprises and initiate strategic consultations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
