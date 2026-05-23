import React, { useState, useEffect } from 'react';
import { 
  Home, Plus, Users, Search, RefreshCw, Star, 
  MapPin, Clock, Phone, Grid, List, CheckCircle, Flame, Building2, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Listing, FilterState, RentalType, Conversation, Message } from './types';
import { INITIAL_LISTINGS, DEFAULT_POST_AVATAR } from './mockData';
import SidebarFilters from './components/SidebarFilters';
import ListingCard from './components/ListingCard';
import ListingDetailDrawer from './components/ListingDetailDrawer';
import CreateListingModal from './components/CreateListingModal';
import ChatInbox from './components/ChatInbox';

export default function App() {
  const currentUserEmail = 'risontripura11@gmail.com';
  // Persistence state
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Filtering & searching controls
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    location: 'all',
    minPrice: 0,
    maxPrice: 0,
    gender: 'any',
    bedrooms: 'any',
    showFavoritesOnly: false,
    minRating: 'all'
  });

  // UI States
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState<'grid' | 'list'>('grid');

  // Load listings from localStorage or fall back to INITIAL_LISTINGS
  useEffect(() => {
    const saved = localStorage.getItem('rentnest:listings');
    if (saved) {
      try {
        setListings(JSON.parse(saved));
      } catch (e) {
        setListings(INITIAL_LISTINGS);
      }
    } else {
      setListings(INITIAL_LISTINGS);
    }
  }, []);

  // Sync / load Conversations
  useEffect(() => {
    const defaultConversations: Conversation[] = [
      {
        id: '1-risontripura11@gmail.com',
        listingId: '1',
        listingTitle: 'Single Room for Male Bachelor near University Campus',
        listingPhoto: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        landlordName: 'Sajid Ahmed',
        landlordAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
        landlordContact: '01712345678',
        tenantEmail: 'risontripura11@gmail.com',
        unread: true,
        messages: [
          {
            id: 'm1',
            senderName: 'Sajid Ahmed',
            senderAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
            senderEmail: 'landholder@verified.bd',
            text: 'Hi Rison, thanks for showing interest in my single room in Mirpur-2! Are you a student or service holder?',
            timestamp: '2 hours ago'
          },
          {
            id: 'm2',
            senderName: 'Rison Tripura',
            senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            senderEmail: 'risontripura11@gmail.com',
            text: 'Hi Sajid brother! I am a student. Is the high-speed Wi-Fi stable for online exams?',
            timestamp: '1.5 hours ago'
          },
          {
            id: 'm3',
            senderName: 'Sajid Ahmed',
            senderAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
            senderEmail: 'landholder@verified.bd',
            text: 'Absolutely, we have a premium fiber connection with power backup. Let me know when you would like to visit.',
            timestamp: '1 hour ago'
          }
        ]
      },
      {
        id: '2-risontripura11@gmail.com',
        listingId: '2',
        listingTitle: 'Stunning Double Bed Sublet for Couple or Working Female',
        listingPhoto: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        landlordName: 'Nusrat Jahan',
        landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        landlordContact: '01988776655',
        tenantEmail: 'risontripura11@gmail.com',
        messages: [
          {
            id: 'm4',
            senderName: 'Nusrat Jahan',
            senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            senderEmail: 'landholder@verified.bd',
            text: 'Assalamu alaikum. The sublet room in Dhanmondi is still available for viewing. Please let me know if you would like to visit.',
            timestamp: '3 hours ago'
          }
        ]
      }
    ];

    const savedChats = localStorage.getItem('rentnest:conversations');
    if (savedChats) {
      try {
        setConversations(JSON.parse(savedChats));
      } catch (e) {
        setConversations(defaultConversations);
      }
    } else {
      setConversations(defaultConversations);
      localStorage.setItem('rentnest:conversations', JSON.stringify(defaultConversations));
    }

    const syncConversations = () => {
      const updatedChats = localStorage.getItem('rentnest:conversations');
      if (updatedChats) {
        try {
          setConversations(JSON.parse(updatedChats));
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener('rentnest:chats_updated', syncConversations);
    return () => window.removeEventListener('rentnest:chats_updated', syncConversations);
  }, []);

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(date.toLocaleDateString('en-US', options) + ' UTC');
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save changes to localStorage helper
  const saveListings = (updatedListings: Listing[]) => {
    setListings(updatedListings);
    localStorage.setItem('rentnest:listings', JSON.stringify(updatedListings));
  };

  // State mutation handlers
  const handleLikeToggle = (id: string) => {
    const updated = listings.map(l => {
      if (l.id === id) {
        const liked = !l.likedByMe;
        return {
          ...l,
          likedByMe: liked,
          likes: liked ? l.likes + 1 : Math.max(0, l.likes - 1)
        };
      }
      return l;
    });
    saveListings(updated);

    // Keep drawer in sync if open
    if (selectedListing && selectedListing.id === id) {
      setSelectedListing(updated.find(x => x.id === id) || null);
    }
  };

  const handleFavoriteToggle = (id: string) => {
    const updated = listings.map(l => {
      if (l.id === id) {
        return {
          ...l,
          isFavorited: !l.isFavorited
        };
      }
      return l;
    });
    saveListings(updated);

    // Keep drawer in sync if open
    if (selectedListing && selectedListing.id === id) {
      setSelectedListing(updated.find(x => x.id === id) || null);
    }
  };

  const handleAddComment = (listingId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      userName: 'Rison Tripura', // Personalized from active session e-mail
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: commentText,
      timestamp: 'Just now'
    };

    const updated = listings.map(l => {
      if (l.id === listingId) {
        return {
          ...l,
          comments: [...l.comments, newComment]
        };
      }
      return l;
    });

    saveListings(updated);

    // Keep drawer in sync if open
    if (selectedListing && selectedListing.id === listingId) {
      setSelectedListing(updated.find(x => x.id === listingId) || null);
    }
  };

  const handleAddReview = (listingId: string, rating: number, text: string) => {
    const newReview = {
      id: `r-${Date.now()}`,
      userName: 'Rison Tripura',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating,
      text,
      timestamp: 'Just now'
    };

    const updated = listings.map(l => {
      if (l.id === listingId) {
        return {
          ...l,
          reviews: [...(l.reviews || []), newReview]
        };
      }
      return l;
    });

    saveListings(updated);

    // Keep drawer in sync if open
    if (selectedListing && selectedListing.id === listingId) {
      setSelectedListing(updated.find(x => x.id === listingId) || null);
    }
  };

  const handleUpdateStatus = (listingId: string, status: 'available' | 'rented') => {
    const updated = listings.map(l => {
      if (l.id === listingId) {
        return {
          ...l,
          status
        };
      }
      return l;
    });
    saveListings(updated);

    // Keep drawer in sync if open
    if (selectedListing && selectedListing.id === listingId) {
      setSelectedListing(updated.find(x => x.id === listingId) || null);
    }
  };

  const handleCreateListing = (listingData: any) => {
    const newListing: Listing = {
      ...listingData,
      id: `list-${Date.now()}`,
      postedBy: 'Rison Tripura',
      postedByAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      postedTime: 'Just now',
      likes: 0,
      comments: [],
      status: 'available'
    };

    saveListings([newListing, ...listings]);
  };

  const handleDeleteListing = (id: string) => {
    const updated = listings.filter(l => l.id !== id);
    saveListings(updated);
    setSelectedListing(null);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const updated = conversations.map(c => {
      if (c.id === conversationId) {
        const newMsg: Message = {
          id: `m-${Date.now()}`,
          senderName: 'Rison Tripura',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          senderEmail: currentUserEmail,
          text,
          timestamp: 'Just now'
        };
        return {
          ...c,
          messages: [...c.messages, newMsg],
          unread: false
        };
      }
      return c;
    });

    setConversations(updated);
    localStorage.setItem('rentnest:conversations', JSON.stringify(updated));
  };

  const handleStartChat = (listing: Listing) => {
    if (listing.postedBy === 'Rison Tripura') {
      alert("This is your own rental post! You cannot message yourself.");
      return;
    }

    const convId = `${listing.id}-${currentUserEmail}`;
    const alreadyExists = conversations.some(c => c.id === convId);

    let updatedConvs = [...conversations];

    if (!alreadyExists) {
      const newConv: Conversation = {
        id: convId,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPhoto: listing.photo,
        landlordName: listing.postedBy,
        landlordAvatar: listing.postedByAvatar,
        landlordContact: listing.contact,
        tenantEmail: currentUserEmail,
        unread: false,
        messages: [
          {
            id: `m-init-${Date.now()}`,
            senderName: listing.postedBy,
            senderAvatar: listing.postedByAvatar,
            senderEmail: 'landholder@verified.bd',
            text: `Hi Rison, thanks for interest in my property: "${listing.title}". I am ready to schedule viewings or discuss rent configurations!`,
            timestamp: 'Just now'
          }
        ]
      };
      updatedConvs = [newConv, ...conversations];
      setConversations(updatedConvs);
      localStorage.setItem('rentnest:conversations', JSON.stringify(updatedConvs));
    }

    // Expand active conversation ID and pop up the central inbox panel instantly
    setActiveConversationId(convId);
    setSelectedListing(null); // Close the detail drawer so there is no layout overlap
    setIsInboxOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      location: 'all',
      minPrice: 0,
      maxPrice: 0,
      gender: 'any',
      bedrooms: 'any',
      showFavoritesOnly: false,
      minRating: 'all'
    });
    setSearchQuery('');
  };

  // Dynamic calculations for counters based on loaded data
  const counts = {
    all: listings.length,
    bachelor: listings.filter(l => l.type === 'bachelor').length,
    sublet: listings.filter(l => l.type === 'sublet').length,
    flat: listings.filter(l => l.type === 'flat').length
  };

  // Core Filtering Pipeline
  const filteredListings = listings.filter(listing => {
    // 1. Search Query Regex match Title, Description, Address, Location
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = listing.title.toLowerCase().includes(q);
      const inDesc = listing.description.toLowerCase().includes(q);
      const inAddress = listing.address.toLowerCase().includes(q);
      const inLoc = listing.location.toLowerCase().includes(q);
      if (!inTitle && !inDesc && !inAddress && !inLoc) return false;
    }

    // 2. Rental Type Category
    if (filters.type !== 'all' && listing.type !== filters.type) {
      return false;
    }

    // 3. Location District zone
    if (filters.location !== 'all' && listing.location !== filters.location) {
      return false;
    }

    // 4. Budget constraints
    if (filters.minPrice > 0 && listing.rent < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice > 0 && listing.rent > filters.maxPrice) {
      return false;
    }

    // 5. Gender limits (specifically for bachelor setup tags)
    if (filters.type === 'bachelor' && filters.gender !== 'any' && listing.genderPreference) {
      if (listing.genderPreference !== 'any' && listing.genderPreference !== filters.gender) {
        return false;
      }
    }

    // 6. Bed Sizes BHK
    if (filters.type !== 'bachelor' && filters.bedrooms !== 'any') {
      if (listing.bedrooms !== filters.bedrooms) {
        return false;
      }
    }

    // 7. Favorites status Filter
    if (filters.showFavoritesOnly && !listing.isFavorited) {
      return false;
    }

    // 8. Reviews Score Minimum Indicator
    if (filters.minRating && filters.minRating !== 'all') {
      const minVal = Number(filters.minRating);
      const reviews = listing.reviews || [];
      if (reviews.length === 0) {
        return false; // No reviews doesn't meet star threshold
      }
      const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
      if (avg < minVal) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Interactive Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand Logo & Community Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                  RentNest
                </span>
                <p className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-600 flex items-center gap-1 font-mono">
                  <CheckCircle className="w-3 h-3 text-indigo-500 fill-indigo-100" />
                  BD RENTALS NETWORK
                </p>
              </div>
            </div>

            {/* Post button for smaller screens */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="md:hidden p-2 bg-indigo-600 text-white rounded-xl shadow-md cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Clock Display and Personal welcome banner */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-500">
            {/* Live Clock */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 border border-slate-200/40 px-3 py-1.5 rounded-xl text-slate-600 font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{currentTime || 'Loading Clock...'}</span>
            </div>

            {/* Email session display */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200/40 px-3 py-1.5 rounded-xl text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="truncate max-w-[200px]">Live: <b>Rison</b> ({currentUserEmail})</span>
            </div>

            {/* Live Chat Inbox Portal Trigger */}
            <button
              type="button"
              onClick={() => setIsInboxOpen(true)}
              className="relative flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white border border-indigo-400/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs font-bold active:scale-98"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-200 fill-indigo-200/10" />
              <span>In-App Chats</span>
              {conversations.some(c => c.unread) && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}
            </button>

            {/* Publish Action Button Desktop */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-indigo-650 hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] text-white py-2 px-4 rounded-xl font-bold cursor-pointer shadow-md shadow-indigo-600/15 transition-all text-sm"
              id="publish-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Rental Post</span>
            </button>
          </div>
        </div>
      </header>

      {/* Community Cover Banner (Facebook Group Vibe) */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-4 md:px-8 border-b border-indigo-900/40 relative overflow-hidden">
        {/* Abstract grids */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-indigo-200 font-bold text-xs uppercase px-3 py-1 rounded-full border border-white/10">
              <Users className="w-3.5 h-3.5" />
              <span>Community Group Mirror</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-4xl text-white tracking-tight leading-tight">
              Dhaka &amp; Chattogram Metro City Area Rental Board
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Find secure single rooms, temporary sublets, and independent master flats across major zones of Dhaka and Chattogram Metros. Message or call landlords directly with simulated live feedback.
            </p>
          </div>

          {/* Quick Real Estate Counters metrics */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
            <div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-indigo-300 text-[10px] uppercase font-bold font-mono">Bachelor</span>
              <span className="font-display font-black text-xl text-white mt-1 block">{counts.bachelor}</span>
            </div>
            <div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-indigo-300 text-[10px] uppercase font-bold font-mono">Sublet</span>
              <span className="font-display font-black text-xl text-white mt-1 block">{counts.sublet}</span>
            </div>
            <div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-indigo-300 text-[10px] uppercase font-bold font-mono">Full Flat</span>
              <span className="font-display font-black text-xl text-white mt-1 block">{counts.flat}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main App Grid containing filters and feed board */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Dynamic Left sidebar selectors */}
        <section className="col-span-1 lg:col-span-4 lg:sticky lg:top-24">
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClearFilters={handleClearFilters}
            availableCounts={counts}
          />
        </section>

        {/* Right side listing feed board */}
        <section className="col-span-1 lg:col-span-8 space-y-6">

          {/* Create Post rapid box (Identical to Facebook group "What's on your mind?") */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Rison Tripura"
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 bg-slate-50 hover:bg-slate-100/80 text-left px-5 py-3 rounded-2xl font-semibold text-xs text-slate-400 border border-slate-200/50 cursor-pointer transition"
            >
              Have rooms/flats to rent? Write a rental post here, Rison...
            </button>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div>
              <h2 className="font-display font-bold text-lg text-slate-800 flex items-center gap-1.5">
                <span>Active Listings Board</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-mono">{filteredListings.length} found</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Showing matching rooms, sublets and apartments.</p>
            </div>

            {/* Layout layout grids toggle */}
            <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/35">
              <button
                onClick={() => setActiveLayout('grid')}
                className={`p-1.5 rounded-lg cursor-pointer transition ${activeLayout === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="Grid representation"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveLayout('list')}
                className={`p-1.5 rounded-lg cursor-pointer transition ${activeLayout === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="List representation"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feed Grid listings view */}
          <AnimatePresence mode="popLayout">
            {filteredListings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-slate-450" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 mb-1">No Matching Listings</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Check your search term, filters, or price scope. Try choosing other area districts of Dhaka is also a good start.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="py-2.5 px-6 bg-indigo-600 cursor-pointer text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-sm"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className={activeLayout === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'flex flex-col gap-6'
              }>
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onSelect={setSelectedListing}
                    onLikeToggle={handleLikeToggle}
                    onFavoriteToggle={handleFavoriteToggle}
                    onAddComment={handleAddComment}
                    onStartChat={handleStartChat}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

        </section>

      </main>

      {/* Community Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-4 md:px-8 mt-auto text-center text-xs text-slate-400 space-y-2">
        <span className="font-bold text-slate-800 font-display">RentNest - House Rentals Group App</span>
        <p className="max-w-md mx-auto leading-relaxed">
          Integrated with automated call simulators and customizable WhatsApp template routing. Always confirm the location landmarks and safety conditions physically.
        </p>
        <div className="text-[10px] text-slate-300 font-mono mt-4">
          All data is persisted in client’s local storage. Code certified for React + Tailwind.
        </div>
      </footer>

      {/* Dialog: Create Rental Post Modal Form */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateListingModal
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateListing}
          />
        )}
      </AnimatePresence>

      {/* Dialog: Listing Full Detail Drawer */}
      <AnimatePresence>
        {selectedListing && (
          <ListingDetailDrawer
            listing={selectedListing}
            onClose={() => setSelectedListing(null)}
            onLikeToggle={handleLikeToggle}
            onFavoriteToggle={handleFavoriteToggle}
            onAddComment={handleAddComment}
            onAddReview={handleAddReview}
            onUpdateStatus={handleUpdateStatus}
            onDeleteListing={selectedListing.id.startsWith('list-') ? handleDeleteListing : undefined}
            onStartChat={handleStartChat}
            currentUserEmail={currentUserEmail}
          />
        )}
      </AnimatePresence>

      {/* Drawer: Chat Inbox Workspace */}
      <AnimatePresence>
        {isInboxOpen && (
          <ChatInbox
            isOpen={isInboxOpen}
            onClose={() => setIsInboxOpen(false)}
            conversations={conversations}
            onSendMessage={handleSendMessage}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
