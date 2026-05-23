import React, { useState } from 'react';
import { X, Sparkles, MapPin, Image, ShieldAlert, Plus, Layers, ClipboardList, CheckSquare } from 'lucide-react';
import { Listing, RentalType } from '../types';
import { PHOTO_PRESETS, AVAILABLE_LOCATIONS, DEFAULT_POST_AVATAR } from '../mockData';
import { motion } from 'motion/react';

interface CreateListingModalProps {
  onClose: () => void;
  onSubmit: (listingData: Omit<Listing, 'id' | 'likes' | 'comments' | 'postedTime' | 'postedBy' | 'postedByAvatar' | 'status'>) => void;
}

const DESCRIPTION_TEMPLATES: Record<RentalType, string> = {
  bachelor: "Looking for a friendly and clean roommate to share our apartment. Rent is low and includes high speed Internet. Ideally suited for students or starting job executives in the local area. Clean tiled washrooms and separate study desk space.",
  sublet: "Fully furnished single master bedroom available for sublet in our spacious high-rise family flat. Peaceful south-facing layout, attached washroom, and dynamic access to kitchen facilities and washing machines.",
  flat: "Newly painted 3 BHK family flat offering pristine security and absolute independence available for rent. High-speed elevators, uninterrupted water & electricity pipeline supplies, and cozy balcony space with full sunlight."
};

export default function CreateListingModal({ onClose, onSubmit }: CreateListingModalProps) {
  const [activeTab, setActiveTab] = useState<RentalType>('bachelor');
  const [title, setTitle] = useState('');
  const [rent, setRent] = useState<number>(8000);
  const [location, setLocation] = useState('Mirpur-2, Dhaka');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState(DESCRIPTION_TEMPLATES.bachelor);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [size, setSize] = useState<number>(120);
  const [genderPreference, setGenderPreference] = useState<'male' | 'female' | 'any'>('any');
  const [availableFrom, setAvailableFrom] = useState('June 2026');
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [amenities, setAmenities] = useState<string[]>(['Wi-Fi', 'Generator Back-up']);

  const PRESET_AMENITIES = [
    'Wi-Fi', 'Generator Back-up', 'Filtered Water', 'Attached Balcony',
    '24/7 Security', 'Elevator', 'Fridge Access', 'Gas (LPG)', 'Gas Pipeline',
    'Daily Cleaning', 'Parking Space', 'Chef Available', 'Prepaid Meter'
  ];

  const handleTabChange = (type: RentalType) => {
    setActiveTab(type);
    setDescription(DESCRIPTION_TEMPLATES[type]);
    if (type === 'flat') {
      setBedrooms(3);
      setBathrooms(3);
      setSize(1200);
    } else if (type === 'sublet') {
      setBedrooms(1);
      setBathrooms(1);
      setSize(220);
    } else {
      setBedrooms(1);
      setBathrooms(1);
      setSize(130);
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(prev => prev.filter(a => a !== amenity));
    } else {
      setAmenities(prev => [...prev, amenity]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim() || !contact.trim()) {
      alert('Please fill out Title, Address, and Contact Number!');
      return;
    }

    const finalPhoto = customPhotoUrl.trim() ? customPhotoUrl.trim() : selectedPhoto;

    onSubmit({
      title: title.trim(),
      type: activeTab,
      rent: Number(rent),
      location,
      address: address.trim(),
      photo: finalPhoto,
      contact: contact.trim(),
      description: description.trim(),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities,
      genderPreference: activeTab === 'bachelor' ? genderPreference : 'any',
      availableFrom,
      size: Number(size)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Content Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900 tracking-tight">Create Rental Post</h2>
              <p className="text-xs text-slate-400">Share detailed bachelor stay, sublet, or flat listings.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full transition cursor-pointer text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* Category Tabs Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">1. Select Accommodation Type</label>
            <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-100 p-1.5 rounded-2xl">
              {[
                { id: 'bachelor', label: 'Bachelor Stay' },
                { id: 'sublet', label: 'Sublet Room' },
                { id: 'flat', label: 'Full Independent Flat' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id as RentalType)}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold tracking-wide capitalize cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column Left: Core Fields */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">2. Basic Details</label>

              {/* Title */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-600">Post Header / Listing Title</span>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cozy Bachelor Room near Mirpur Stadium"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:border-indigo-600 focus:outline-hidden transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600">Rent Expense (৳ BDT)</span>
                  <input
                    type="number"
                    required
                    min={1}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:border-indigo-600 focus:outline-hidden transition"
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600">General Zone</span>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:border-indigo-600 focus:outline-hidden transition cursor-pointer"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {AVAILABLE_LOCATIONS.filter(l => l !== 'All Locations').map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Physical Address */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Exact Street Address
                </span>
                <input
                  type="text"
                  required
                  placeholder="House 34, Road 4/A, Dhanmondi..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:border-indigo-600 focus:outline-hidden transition"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Physical properties sizing */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Bedrooms</span>
                  <select
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs cursor-pointer"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Bathrooms</span>
                  <select
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs cursor-pointer"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Bath</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Size (Sq.ft)</span>
                  <input
                    type="number"
                    min={10}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Contact and Availability */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600">Contact Number</span>
                  <input
                    type="text"
                    required
                    placeholder="01712xxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:outline-hidden focus:border-indigo-600 transition"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600">Available From</span>
                  <input
                    type="text"
                    placeholder="e.g. June 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:outline-hidden focus:border-indigo-600 transition"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                  />
                </div>
              </div>

              {/* Bachelor gender limits */}
              {activeTab === 'bachelor' && (
                <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">Gender preference target</span>
                  <div className="flex gap-2">
                    {(['male', 'female', 'any'] as const).map((genderOption) => (
                      <button
                        key={genderOption}
                        type="button"
                        onClick={() => setGenderPreference(genderOption)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs capitalize font-medium cursor-pointer transition ${
                          genderPreference === genderOption
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white hover:bg-emerald-100/30 text-emerald-700 border border-emerald-200/50'
                        }`}
                      >
                        {genderOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Column Right: Visuals, description, and amenities */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">3. Media & Services description</label>

              {/* Photo presets selector */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-slate-600 flex items-center gap-1">
                  <Image className="w-3.5 h-3.5 text-indigo-500" />
                  Select Listing Cover Photo Preset
                </span>
                
                <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto border border-slate-100 bg-slate-50 p-2 rounded-xl">
                  {PHOTO_PRESETS.map((p, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedPhoto(p.url);
                        setCustomPhotoUrl('');
                      }}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                        selectedPhoto === p.url && !customPhotoUrl
                          ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                          : 'border-transparent'
                      }`}
                    >
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/25 flex items-end p-0.5">
                        <span className="text-[7px] text-white font-semibold truncate block w-full bg-slate-900/40 px-1 py-0.5 leading-tight">{p.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-slate-400">Or paste custom image URL:</span>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 mt-1 rounded-lg border border-slate-200 text-[10px] focus:outline-hidden focus:border-indigo-600"
                    value={customPhotoUrl}
                    onChange={(e) => {
                      setCustomPhotoUrl(e.target.value);
                      setSelectedPhoto('');
                    }}
                  />
                </div>
              </div>

              {/* Amenities list */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-slate-600 flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                  Included Amenities
                </span>

                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {PRESET_AMENITIES.map((amen) => {
                    const active = amenities.includes(amen);
                    return (
                      <button
                        key={amen}
                        type="button"
                        onClick={() => toggleAmenity(amen)}
                        className={`text-[10px] font-medium px-2 py-1 rounded-md border transition cursor-pointer ${
                          active
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-150/40'
                        }`}
                      >
                        {amen}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description template write */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-600">Post Description Details</span>
                  <button
                    type="button"
                    onClick={() => setDescription(DESCRIPTION_TEMPLATES[activeTab])}
                    className="text-[9px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    Reset to template
                  </button>
                </div>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:outline-hidden focus:border-indigo-600 transition resize-none leading-relaxed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Guidelines info notice */}
          <div className="bg-indigo-950/95 text-white/90 p-4 rounded-2xl flex items-start gap-3.5 text-xs">
            <ShieldAlert className="w-8 h-8 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white tracking-wide">Community Integrity Notice</span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Make sure the location boundaries, exact address, and phone numbers are verified. Postings with invalid or deceptive contact numbers can get flagged by active moderators.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 border border-slate-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 shadow-sm transition cursor-pointer"
            >
              Publish Rental Post
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
