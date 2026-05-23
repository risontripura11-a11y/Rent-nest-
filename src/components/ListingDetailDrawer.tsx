import React, { useState, useEffect } from 'react';
import { 
  X, MapPin, Phone, MessageSquare, Heart, Compass, 
  Sparkles, ShieldCheck, CheckSquare, Calendar, PhoneCall, 
  Map, ThumbsUp, Trash2, ArrowRight, Star, Bookmark
} from 'lucide-react';
import { Listing, Comment, Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ListingDetailDrawerProps {
  listing: Listing | null;
  onClose: () => void;
  onLikeToggle: (id: string) => void;
  onFavoriteToggle?: (id: string) => void; // Added favorite toggle from detail drawer
  onAddComment: (listingId: string, commentText: string) => void;
  onAddReview: (listingId: string, rating: number, text: string) => void; // Added review callback
  onUpdateStatus?: (listingId: string, status: 'available' | 'rented') => void; // Update lease status callback
  onDeleteListing?: (id: string) => void; // Optional if deleted by user
  onStartChat?: (listing: Listing) => void; // Start chat callback
  currentUserEmail?: string;
}

export default function ListingDetailDrawer({
  listing,
  onClose,
  onLikeToggle,
  onFavoriteToggle,
  onAddComment,
  onAddReview,
  onUpdateStatus,
  onDeleteListing,
  onStartChat,
  currentUserEmail
 }: ListingDetailDrawerProps) {
  const [commentInput, setCommentInput] = useState('');
  const [reviewInput, setReviewInput] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewHoverRating, setReviewHoverRating] = useState<number | null>(null);
  const [callActive, setCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [copied, setCopied] = useState(false);

  // Tabs Configuration
  const [activeTab, setActiveTab] = useState<'comments' | 'reviews' | 'payment'>('comments');

  // Interactive Secure Advance BDT Booking States
  const [paymentProvider, setPaymentProvider] = useState<'bkash' | 'nagad' | 'rocket' | 'card'>('bkash');
  const [paymentStep, setPaymentStep] = useState<'init' | 'otp' | 'pin' | 'processing' | 'success'>('init');
  const [phoneNumber, setPhoneNumber] = useState('017');
  const [otpCode, setOtpCode] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [pinNumber, setPinNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [receiptTxn, setReceiptTxn] = useState('');


  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!listing) return null;

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(listing.id, commentInput.trim());
    setCommentInput('');
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;
    onAddReview(listing.id, reviewRating, reviewInput.trim());
    setReviewInput('');
    setReviewRating(5);
  };

  const generateRandomTxn = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let res = '';
    for (let i = 0; i < 8; i++) {
       res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TXN-${paymentProvider.toUpperCase()}-${res}`;
  };

  const startPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentProvider === 'bkash' || paymentProvider === 'nagad' || paymentProvider === 'rocket') {
      if (phoneNumber.length < 11) {
        alert('Please enter a valid 11-digit Bangladesh phone number!');
        return;
      }
    } else {
      if (!cardNumber || !cardHolder) {
        alert('Please enter your card number and cardholder name!');
        return;
      }
    }

    // Generate random OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(code);
    setPaymentStep('otp');
    
    // Toast helper
    setTimeout(() => {
      alert(`[Secure Gateway Simulator SMS] Your RentNest verification OTP code is: ${code}`);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== sentOtp) {
      alert(`Incorrect OTP code! Please simulate again or input the code sent via simulated alert: ${sentOtp}`);
      return;
    }
    setPaymentStep('pin');
  };

  const handleConfirmPinCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    
    setTimeout(() => {
      const generated = generateRandomTxn();
      setReceiptTxn(generated);
      setPaymentStep('success');
      
      // Update status to 'rented' using callback prop!
      if (onUpdateStatus) {
        onUpdateStatus(listing.id, 'rented');
      }
    }, 1800);
  };

  const handleCancelBooking = () => {
    if (confirm('Cancel this holding booking and refund BDT Advance back to your wallet?')) {
      if (onUpdateStatus) {
        onUpdateStatus(listing.id, 'available');
      }
      setPaymentStep('init');
      setPhoneNumber('017');
      setOtpCode('');
      setPinNumber('');
      setCardNumber('');
      setCardHolder('');
    }
  };

  const copyContact = () => {
    navigator.clipboard.writeText(listing.contact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startCallSimulator = () => {
    setCallActive(true);
    setCallStatus('ringing');
    
    // Simulate ring transition
    const rTimeout = setTimeout(() => {
      setCallStatus('connected');
    }, 2500);

    return () => clearTimeout(rTimeout);
  };

  const endCallSimulation = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallActive(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900"
      />

      {/* Drawer Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10"
      >
        {/* Sticky Header */}
        <div className="p-4 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className={`px-2 md:px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wide ${
              listing.type === 'bachelor' ? 'bg-emerald-100 text-emerald-800' :
              listing.type === 'sublet' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {listing.type} Stays
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: #{listing.id}</span>
          </div>
          <div className="flex items-center gap-2">
            {onDeleteListing && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this listing?')) {
                    onDeleteListing(listing.id);
                    onClose();
                  }
                }}
                title="Delete Listing"
                className="p-2 text-rose-500 hover:bg-rose-50 cursor-pointer rounded-lg transition-colors border border-transparent hover:border-rose-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* Main Visual Image Hero */}
          <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-slate-100">
            <img 
              src={listing.photo} 
              alt={listing.title} 
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            {listing.status === 'rented' && (
              <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-xs">
                <span className="text-amber-400 border-2 border-amber-400 bg-slate-900/90 font-display font-extrabold text-2xl tracking-widest px-8 py-3 rounded-xl uppercase">
                  Already Rented
                </span>
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="space-y-3">
            <h1 className="font-display font-bold text-xl md:text-2xl text-slate-900 leading-tight">
              {listing.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>Available: <b className="text-slate-700 font-medium">{listing.availableFrom}</b></span>
              </div>
            </div>
          </div>

          {/* Pricing Highlight Box */}
          <div className="bg-indigo-50/50 border border-indigo-100/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-800">Monthly Rent (Fixed)</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display font-extrabold text-3xl text-indigo-950">৳ {listing.rent.toLocaleString()}</span>
                <span className="text-slate-500 font-medium text-sm">/ BDT</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => onLikeToggle(listing.id)}
                className={`py-2 px-3 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  listing.likedByMe 
                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${listing.likedByMe ? 'fill-white' : ''}`} />
                <span>{listing.likedByMe ? 'Liked' : 'Like'} ({listing.likes})</span>
              </button>

              {onFavoriteToggle && (
                <button
                  onClick={() => onFavoriteToggle(listing.id)}
                  className={`py-2 px-3 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                    listing.isFavorited 
                      ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${listing.isFavorited ? 'fill-white' : ''}`} />
                  <span>{listing.isFavorited ? 'Saved' : 'Save'}</span>
                </button>
              )}

              <button
                onClick={copyContact}
                className="py-2 px-3 bg-indigo-600 text-white rounded-xl font-semibold text-xs hover:bg-indigo-700 cursor-pointer shadow-sm transition-all flex items-center gap-1.5 mr-auto"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Phone'}</span>
              </button>
            </div>
          </div>

          {/* Details Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Bedrooms', val: `${listing.bedrooms} BHK`, icon: Compass },
              { label: 'Washrooms', val: `${listing.bathrooms} Bath`, icon: ShieldCheck },
              { label: 'Room Size', val: listing.size ? `${listing.size} sq.ft` : 'Shared Standard', icon: Sparkles },
              { label: 'Occupancy Pref', val: listing.genderPreference ? `${listing.genderPreference} preferred` : 'Family/Any', icon: CheckSquare }
            ].map((meta, i) => {
              const IconComp = meta.icon;
              return (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex flex-col justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{meta.label}</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <IconComp className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold text-sm text-slate-800 capitalize leading-none">{meta.val}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Location Section */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Map className="w-4 h-4 text-indigo-600" />
              <span>Exact Address & Location Map</span>
            </h3>
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 text-xs">
              <div className="font-semibold text-slate-850 mb-1">Physical Address:</div>
              <p className="text-slate-500 font-mono leading-relaxed bg-white/70 p-2.5 rounded-lg border border-slate-200/50 mb-3">{listing.address}</p>

              {/* Simulated visual vector map box */}
              <div className="aspect-video relative rounded-lg bg-orange-50 border border-orange-100 overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }} />
                <div className="absolute w-2 h-2 rounded-full bg-rose-500 anim-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xs" />
                <div className="absolute w-6 h-6 rounded-full border border-rose-400/40 bg-rose-500/10 anim-ping top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative bg-white/90 backdrop-blur-xs px-3 py-2 rounded-lg max-w-xs shadow-xs border border-orange-200/50">
                  <div className="font-bold text-slate-800 text-[10px] uppercase flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>RentNest Map Simulator</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">Facing road and public utility linkages. Real map loads here.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-base text-slate-800">Post Description</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {listing.description}
            </p>
          </div>

          {/* Amenities & Utility Options */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-base text-slate-800">Integrated Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((amenity, idx) => (
                <span 
                  key={idx} 
                  className="bg-indigo-50/40 text-indigo-700 border border-indigo-100/30 font-medium text-xs px-3  py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Landlord Contact Terminal */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-indigo-500/10 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-indigo-500/10 pointer-events-none" />

            <div className="relative">
              <span className="text-[10px] tracking-wider uppercase bg-white/10 text-indigo-200 px-2.5 py-1 rounded-full font-bold">
                Direct Landlord Reach-out
              </span>
              <h3 className="font-display font-bold text-lg mt-3">Post Owner: {listing.postedBy}</h3>
              <p className="text-indigo-200/70 text-xs mt-1 leading-relaxed">
                Connect via virtual calling terminal, copy verified contact numbers, or spawn rapid preset chat linkages.
              </p>

              {/* Call dials & simulated contact buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {onStartChat && (
                  <button
                    onClick={() => listing && onStartChat(listing)}
                    className="col-span-1 sm:col-span-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white py-3.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-indigo-400/30 active:scale-98 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300 fill-emerald-300/20" />
                    <span>Start Secure In-App Live Chat</span>
                  </button>
                )}

                <button
                  onClick={startCallSimulator}
                  className="bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-700"
                >
                  <PhoneCall className="w-4 h-4" />
                  Simulate Phone Call
                </button>

                <a
                  href={`https://wa.me/${listing.contact.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(listing.postedBy)},%20I%20saw%20your%20listing%20for%2520"${encodeURIComponent(listing.title)}"%2520on%2520RentNest.%20Is%20it%20available?`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/15 text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Simulate WhatsApp Applet
                </a>
              </div>

              {/* Active simulated call connection */}
              {callActive && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="bg-indigo-950 rounded-2xl p-4 border border-indigo-500/20 text-center space-y-3 relative">
                    <div className="flex justify-center gap-1 items-center h-6">
                      {callStatus === 'ringing' && (
                        <>
                          <div className="w-1.5 bg-indigo-400 rounded-sm animate-bounce [animation-delay:0.1s] h-3" />
                          <div className="w-1.5 bg-indigo-400 rounded-sm animate-bounce [animation-delay:0.2s] h-5" />
                          <div className="w-1.5 bg-indigo-400 rounded-sm animate-bounce [animation-delay:0.3s] h-3" />
                        </>
                      )}
                      {callStatus === 'connected' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-xs text-indigo-200 uppercase tracking-widest leading-none">
                        {callStatus === 'ringing' ? 'Calling...' : callStatus === 'connected' ? 'Connected (Inc. Simulator)' : 'Call Disconnected'}
                      </div>
                      <div className="font-display font-black text-xl text-white mt-1.5 tracking-wide">
                        {listing.contact}
                      </div>
                      <div className="text-[10px] text-indigo-300/60 font-mono mt-1">
                        Posted by {listing.postedBy}
                      </div>
                    </div>

                    {callStatus === 'connected' && (
                      <p className="text-[11px] text-slate-300 italic px-4 leading-relaxed bg-black/20 py-2.5 rounded-lg border border-indigo-500/20 max-w-xs mx-auto">
                        &ldquo;Hello! RentNest call simulation active. Yes, the bachelor/sublet stay is available. You can visit tomorrow.&rdquo;
                      </p>
                    )}

                    <button
                      onClick={endCallSimulation}
                      className="bg-red-600 hover:bg-red-700 hover:scale-102 text-white font-semibold text-[10px] px-4 py-1.5 rounded-lg cursor-pointer transition"
                    >
                      End Call
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Premium Selector Tabs for Comments, Reviews, and Advanced Payments */}
          <div className="border-t border-slate-105 pt-6 space-y-5">
            <div className="flex border-b border-slate-100 pb-px gap-1 overflow-x-auto">
              {[
                { id: 'comments', label: `Community Q&A (${listing.comments.length})`, icon: MessageSquare },
                { id: 'reviews', label: `Resident Reviews (${listing.reviews?.length || 0})`, icon: Star },
                { id: 'payment', label: '৳ Secure Advance Payment', icon: ShieldCheck, badge: listing.status === 'rented' ? 'Reserved' : 'Live Gateway' }
              ].map((tb) => {
                const TabIcon = tb.icon;
                const active = activeTab === tb.id;
                return (
                  <button
                    key={tb.id}
                    onClick={() => setActiveTab(tb.id as any)}
                    className={`pb-3 px-3.5 text-xs font-bold whitespace-nowrap relative cursor-pointer flex items-center gap-1.5 transition-all outline-hidden ${
                      active ? 'text-indigo-600' : 'text-slate-450 hover:text-slate-705'
                    }`}
                  >
                    <TabIcon className={`w-3.5 h-3.5 ${active ? 'fill-indigo-50/50' : ''}`} />
                    <span>{tb.label}</span>
                    {tb.badge && (
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                        listing.status === 'rented' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {tb.badge}
                      </span>
                    )}
                    {active && (
                      <motion.div 
                        layoutId="activeDrawerTab" 
                        className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 rounded-full" 
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: Comments */}
            {activeTab === 'comments' && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {listing.comments.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="text-xs text-slate-450 italic">No community comments yet. Ask about location features, roommates, bills, or schedule a tour!</p>
                    </div>
                  ) : (
                    listing.comments.map((comm) => (
                      <div key={comm.id} className="flex gap-3 items-start text-xs border-b border-slate-50 pb-3">
                        <img 
                          src={comm.userAvatar} 
                          alt={comm.userName} 
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 mt-0.5"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-[12px]">{comm.userName}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{comm.timestamp}</span>
                          </div>
                          <p className="text-slate-600 text-[12px] leading-relaxed pr-4">
                            {comm.text}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Form */}
                <form onSubmit={submitComment} className="flex gap-2.5 pt-2">
                  <input 
                    type="text" 
                    placeholder="Write a message or ask landlord a public query..." 
                    className="flex-1 bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-hidden focus:border-indigo-500 focus:bg-white transition-all"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 cursor-pointer text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition"
                  >
                    Post Message
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                {/* Reviews List */}
                <div className="space-y-4">
                  {!listing.reviews || listing.reviews.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="text-xs text-slate-450 italic">No past resident reviews yet. Be the first to add your rating feedback!</p>
                    </div>
                  ) : (
                    listing.reviews.map((rev) => (
                      <div key={rev.id} className="flex gap-3 items-start text-xs border-b border-slate-50 pb-3">
                        <img 
                          src={rev.userAvatar} 
                          alt={rev.userName} 
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 mt-0.5"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 text-[12px]">{rev.userName}</span>
                              <span className="text-[10px] text-slate-405 font-medium">{rev.timestamp}</span>
                            </div>
                            <div className="flex gap-px">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star 
                                  key={s} 
                                  className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 text-[12.5px] leading-relaxed pr-2">
                            {rev.text}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Submission Form */}
                <form onSubmit={submitReview} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block uppercase tracking-wide">Write Tenant Feedback Score</span>
                  
                  {/* Interactive Star picker */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500 mr-2">Your Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const isFilled = reviewHoverRating !== null 
                          ? starValue <= reviewHoverRating 
                          : starValue <= reviewRating;
                        return (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() => setReviewRating(starValue)}
                            onMouseEnter={() => setReviewHoverRating(starValue)}
                            onMouseLeave={() => setReviewHoverRating(null)}
                            className="p-0.5 cursor-pointer text-slate-300 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-5 h-5 ${isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <textarea 
                      required
                      placeholder="Comment on location, landlord responsiveness, utility bills, water/power supply, or area safety..." 
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-hidden focus:border-indigo-500 transition-all resize-none height h-20"
                      value={reviewInput}
                      onChange={(e) => setReviewInput(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-indigo-600 cursor-pointer text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition"
                    >
                      Publish Verification Review
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT: BDT Secure Advance Payments holding portal */}
            {activeTab === 'payment' && (
              <div className="bg-indigo-50/20 p-5 rounded-3xl border border-indigo-100/30 space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-700 font-mono">BDT Rent Booking System</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                      Instantly holding stays by sending security deposits or token reservation advances to the verified landlord. This protects the stay option during physical tours.
                    </p>
                  </div>
                </div>

                {/* Active booking state checker */}
                {listing.status === 'rented' ? (
                  /* RENTED / BOOKED STATE: Show current receipt statement */
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden space-y-4">
                    {/* Watermark badge holding */}
                    <div className="absolute right-[-24px] top-[14px] rotate-45 bg-emerald-500 text-white text-[8px] font-black uppercase px-8 py-1 tracking-widest text-center shadow-xs">
                      Paid
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-display font-black text-xs text-emerald-800">SIMULATED ADVANCE BOOKING RECEIPT</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Payer Student / User</span>
                        <span className="font-bold text-slate-805">Rison Tripura</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Verified Landlord</span>
                        <span className="font-bold text-slate-805">{listing.postedBy}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Transaction ID</span>
                        <span className="font-bold text-indigo-650">{receiptTxn || 'TXN-BKASH-3D8F92'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Advance holding count</span>
                        <span className="font-bold text-slate-805">৳ 1,500 BDT</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-[11px] text-emerald-800 leading-relaxed font-semibold">
                      ✓ This stay is booked on hold under your account. The landlord has been flagged of your secure deposit. You can schedule a final move-in key pickup.
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[9px] text-slate-400 italic">Paid on 2026-05-23</span>
                      <button
                        onClick={handleCancelBooking}
                        className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border border-rose-100/50"
                      >
                        Release Hold &amp; Refund ৳
                      </button>
                    </div>
                  </div>
                ) : (
                  /* AVAILABLE STATE: Render checkout multi-step checkout form */
                  <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                    
                    {/* Amount spec list */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Holding Deposit BDT</span>
                        <span className="font-display font-black text-lg text-slate-850">৳ 1,500 <span className="text-xs text-slate-400 font-normal">flat token</span></span>
                      </div>
                      <div className="text-right text-[10px] text-slate-500">
                        <span>Original monthly Rent: ৳<b>{listing.rent.toLocaleString()}</b></span>
                      </div>
                    </div>

                    {/* Step Init: Choose gateway & phone input */}
                    {paymentStep === 'init' && (
                      <form onSubmit={startPaymentSubmit} className="space-y-4">
                        {/* Channel selector */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">Select Booking Channel</label>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { id: 'bkash', label: 'bKash', color: 'border-pink-300 bg-pink-50/20 text-pink-700 active:border-pink-600' },
                              { id: 'nagad', label: 'Nagad', color: 'border-orange-300 bg-orange-50/20 text-orange-700 active:border-orange-600' },
                              { id: 'rocket', label: 'Rocket', color: 'border-purple-300 bg-purple-50/20 text-purple-700 active:border-purple-600' },
                              { id: 'card', label: 'Cards', color: 'border-slate-300 bg-slate-50/50 text-slate-700 active:border-slate-600' }
                            ].map((prov) => {
                              const sel = paymentProvider === prov.id;
                              return (
                                <button
                                  key={prov.id}
                                  type="button"
                                  onClick={() => setPaymentProvider(prov.id as any)}
                                  className={`p-2 border-2 rounded-xl text-center text-xs font-extrabold transition cursor-pointer select-none ${
                                    sel ? 'border-indigo-650 bg-indigo-50/30 text-indigo-700' : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500'
                                  }`}
                                >
                                  {prov.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Switch fields based on mobile vs card */}
                        {paymentProvider === 'card' ? (
                          <div className="space-y-2.5">
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Cardholder Name</span>
                              <input 
                                type="text" 
                                required
                                placeholder="e.g. Rison Tripura" 
                                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                              />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Credit Card Number</span>
                              <input 
                                type="text" 
                                required
                                placeholder="4321 •••• •••• 8890" 
                                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">Personal MFS Phone Number</label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-500 text-xs font-bold font-mono">+88</span>
                              <input 
                                type="text" 
                                required
                                placeholder="01712xxxxxx" 
                                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-xs text-slate-800 font-mono"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-sm cursor-pointer select-none"
                        >
                          Send Secure BDT ৳ Advance Verification
                        </button>
                      </form>
                    )}

                    {/* Step OTP: Input OTP Code */}
                    {paymentStep === 'otp' && (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-[10px] text-amber-805 leading-relaxed">
                          <b>Secure OTP Simulation Box:</b> In a real system, you will receive an SMS. For this preview, copy the OTP code shown in your alert, or simply use <b>{sentOtp}</b> to proceed.
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">6-Digit Verification SMS OTP</label>
                          <input 
                            type="text" 
                            required
                            maxLength={6}
                            placeholder="••••••" 
                            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-center text-sm font-bold tracking-widest text-slate-800 font-mono focus:bg-white transition-all focus:border-indigo-500"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                          />
                        </div>

                        <div className="flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => setPaymentStep('init')}
                            className="flex-1 py-2.5 border border-slate-205 text-slate-500 font-semibold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-xs cursor-pointer"
                          >
                            Verify Secure OTP
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Step PIN: Input secure PIN */}
                    {paymentStep === 'pin' && (
                      <form onSubmit={handleConfirmPinCode} className="space-y-4">
                        <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl text-[10px] text-indigo-805 leading-relaxed">
                          <b>PIN Security Code:</b> Authenticating transaction with bank wallet. Type any simulated 4 or 5 digit passcode to process the advance payment securely.
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">Enter Secure PIN / Password</label>
                          <input 
                            type="password" 
                            required
                            maxLength={5}
                            placeholder="•••••" 
                            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-center text-sm font-bold tracking-widest text-slate-800 font-mono focus:bg-white transition-all focus:border-indigo-500"
                            value={pinNumber}
                            onChange={(e) => setPinNumber(e.target.value)}
                          />
                        </div>

                        <div className="flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => setPaymentStep('otp')}
                            className="flex-1 py-2.5 border border-slate-205 text-slate-500 font-semibold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
                          >
                            Back to OTP
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 hover:scale-102 active:scale-98 transition shadow-xs cursor-pointer"
                          >
                            Pay ৳ 1,500 Hold Advance
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Step Processing: Simulated delay loading */}
                    {paymentStep === 'processing' && (
                      <div className="py-6 flex flex-col items-center justify-center text-center space-y-3.5">
                        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-650 rounded-full animate-spin" />
                        <div>
                          <span className="text-xs font-bold text-slate-700 block text-animate">Authorizing Bank Settlement...</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">MFS: {paymentProvider.toUpperCase()} Network Gateway</span>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
