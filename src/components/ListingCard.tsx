import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, MapPin, Phone, Eye, Calendar, Award, CheckCircle2, Bookmark, Star } from 'lucide-react';
import { Listing } from '../types';
import { motion } from 'motion/react';

interface ListingCardProps {
  key?: React.Key;
  listing: Listing;
  onSelect: (listing: Listing) => void;
  onLikeToggle: (id: string) => void;
  onFavoriteToggle?: (id: string) => void;
  onAddComment: (listingId: string, commentText: string) => void;
  onStartChat?: (listing: Listing) => void;
}

export default function ListingCard({
  listing,
  onSelect,
  onLikeToggle,
  onFavoriteToggle,
  onAddComment,
  onStartChat
}: ListingCardProps) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState('');
  const [shareFeedback, setShareFeedback] = useState(false);

  // Calculate review averages
  const reviewsList = listing.reviews || [];
  const averageRating = reviewsList.length > 0 
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)
    : null;

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'bachelor':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'sublet':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'flat':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    onAddComment(listing.id, newCommentInput.trim());
    setNewCommentInput('');
  };

  const handleShare = () => {
    setShareFeedback(true);
    navigator.clipboard.writeText(`RentNest Listing: ${listing.title} at ${listing.location}. Contact: ${listing.contact}`);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Post Owner Header (Facebook Group Feed style) */}
      <div className="p-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-3">
          <img
            src={listing.postedByAvatar}
            alt={listing.postedBy}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-slate-800 hover:text-indigo-600 cursor-pointer">{listing.postedBy}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 fill-indigo-50" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{listing.postedTime}</span>
              <span>•</span>
              <span className="capitalize">{listing.type} poster</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border tracking-wide uppercase ${getCategoryColor(listing.type)}`}>
            {listing.type}
          </span>
          <span className={`text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-sm ${
            listing.status === 'available' ? 'bg-indigo-600 text-white' : 'bg-rose-150 text-rose-800 border-2 border-rose-300'
          }`}>
            {listing.status === 'available' ? 'Available' : 'Rented / Booked'}
          </span>
        </div>
      </div>

      {/* Listing Cover Cover photo or interactive quick view slider */}
      <div className="relative group cursor-pointer overflow-hidden aspect-video bg-slate-100" onClick={() => onSelect(listing)}>
        <img
          src={listing.photo}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-slate-905/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg font-display font-bold text-sm shadow-xs flex items-center gap-1">
          <span className="font-mono text-indigo-400">৳</span>
          <span className="font-sans">{listing.rent.toLocaleString()}</span>
          <span className="text-[10px] font-normal text-slate-300">/mo</span>
        </div>

        {listing.genderPreference && listing.genderPreference !== 'any' && (
          <div className="absolute top-3 right-3 bg-indigo-905/80 text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1">
            <Award className="w-3 h-3 text-indigo-300" />
            <span className="capitalize">{listing.genderPreference} Bachelor Only</span>
          </div>
        )}

        {/* Floating Bookmark Favorite Save Icon */}
        {onFavoriteToggle && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(listing.id);
            }}
            className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
              listing.isFavorited 
                ? 'bg-rose-600 text-white hover:bg-rose-700 hover:scale-105' 
                : 'bg-slate-900/60 text-slate-100 hover:bg-slate-950 hover:text-white hover:scale-105'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${listing.isFavorited ? 'fill-white' : ''}`} />
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 via-slate-950/10 to-transparent p-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 text-xs text-white font-medium">
            <Eye className="w-4 h-4" />
            <span>Click for quick tour</span>
          </div>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title row with star rating average */}
        <div className="flex items-start justify-between gap-2.5 mb-2.5">
          <h3 
            onClick={() => onSelect(listing)}
            className="font-display font-semibold text-base text-slate-800 leading-snug hover:text-indigo-600 cursor-pointer transition-colors line-clamp-2"
          >
            {listing.title}
          </h3>
          {averageRating && (
            <div className="flex items-center gap-0.5 shrink-0 bg-amber-50 text-amber-805 px-2 py-0.5 rounded-lg text-xs font-black border border-amber-200/50">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{averageRating}</span>
              <span className="text-[9px] text-amber-640/60 font-bold">({reviewsList.length})</span>
            </div>
          )}
        </div>

        {/* Location & Raw Address */}
        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700">{listing.location}</span>
            <p className="line-clamp-1 mt-0.5 text-slate-400 text-[11px]">{listing.address}</p>
          </div>
        </div>

        {/* Key Features (Rooms, Washrooms, Size) */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 text-center mb-4 text-xs font-medium text-slate-600 border border-slate-100">
          <div>
            <span className="block text-slate-400 text-[10px] uppercase font-semibold">Rooms</span>
            <span className="text-sm font-bold text-slate-800">{listing.bedrooms} BHK</span>
          </div>
          <div>
            <span className="block text-slate-400 text-[10px] uppercase font-semibold">Washrooms</span>
            <span className="text-sm font-bold text-slate-800">{listing.bathrooms} Bath</span>
          </div>
          <div>
            <span className="block text-slate-400 text-[10px] uppercase font-semibold">Size</span>
            <span className="text-sm font-bold text-slate-800">{listing.size || 'N/A'} sft</span>
          </div>
        </div>

        {/* Snippet Description */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {listing.description}
        </p>

        {/* Contact Info Indicator */}
        <div className="mt-auto pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 text-indigo-600">
            <Phone className="w-3.5 h-3.5" />
            <span>Contact: {listing.contact}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-normal">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px]">{listing.availableFrom}</span>
          </div>
        </div>
      </div>

      {/* Social Actions Panel */}
      <div className="px-4 py-2 border-t border-slate-50 bg-slate-50/40 flex items-center justify-between text-slate-500 text-xs font-medium select-none">
        {/* Like Button */}
        <button
          onClick={() => onLikeToggle(listing.id)}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 ${
            listing.likedByMe ? 'text-rose-600 bg-rose-50/50 hover:bg-rose-100/30' : 'text-slate-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${listing.likedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>{listing.likes} Likes</span>
        </button>

        {/* Comment Button Toggle */}
        <button
          onClick={() => setCommentOpen(!commentOpen)}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 ${
            commentOpen ? 'bg-indigo-50/60 text-indigo-600' : 'text-slate-600'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{listing.comments.length} Comments</span>
        </button>

        {/* In-App Live Chat shortcut button */}
        {onStartChat && (
          <button
            onClick={() => onStartChat(listing)}
            className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer hover:bg-indigo-50 text-indigo-600 font-bold border border-transparent hover:border-indigo-100"
          >
            <MessageSquare className="w-4 h-4 fill-indigo-200/50 text-indigo-500 animate-pulse" />
            <span>Chat</span>
          </button>
        )}

        {/* Copy Share Details */}
        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 text-slate-600 relative`}
        >
          <Share2 className="w-4 h-4" />
          <span>{shareFeedback ? 'Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Feed Quick Comments (Expand inline like facebook group post) */}
      {commentOpen && (
        <div className="border-t border-slate-100 p-4 bg-slate-50/80">
          <div className="space-y-3 max-h-48 overflow-y-auto mb-3 scrollbar-thin">
            {listing.comments.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic text-center py-2">No comments yet. Start the conversation!</p>
            ) : (
              listing.comments.map((comm) => (
                <div key={comm.id} className="flex gap-2.5 items-start text-xs">
                  <img
                    src={comm.userAvatar}
                    alt={comm.userName}
                    className="w-7 h-7 rounded-full object-cover mt-0.5 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-white px-3 py-2 rounded-2xl border border-slate-100 max-w-[85%]">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-slate-800 text-[11px]">{comm.userName}</span>
                      <span className="text-[9px] text-slate-400">{comm.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{comm.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick reply comment form */}
          <form onSubmit={submitComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a question about this listing..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-hidden focus:border-indigo-500"
              value={newCommentInput}
              onChange={(e) => setNewCommentInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 cursor-pointer text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </motion.article>
  );
}
