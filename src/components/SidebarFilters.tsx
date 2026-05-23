import React from 'react';
import { Search, MapPin, Users, Home, X, SlidersHorizontal, Star, Bookmark } from 'lucide-react';
import { FilterState, RentalType } from '../types';
import { AVAILABLE_LOCATIONS } from '../mockData';

interface SidebarFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClearFilters: () => void;
  availableCounts: {
    all: number;
    bachelor: number;
    sublet: number;
    flat: number;
  };
}

export default function SidebarFilters({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  onClearFilters,
  availableCounts
}: SidebarFiltersProps) {
  
  const handleTypeChange = (type: 'all' | RentalType) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };

  const handleGenderChange = (gender: 'any' | 'male' | 'female') => {
    setFilters(prev => ({ ...prev, gender }));
  };

  const handleBedroomsChange = (bedrooms: 'any' | 1 | 2 | 3 | 4) => {
    setFilters(prev => ({ ...prev, bedrooms }));
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
          <h2 className="font-display font-semibold text-lg text-slate-800">Advanced Filters</h2>
        </div>
        <button
          onClick={onClearFilters}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search Listings</label>
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:border-indigo-500 focus:bg-white focus:outline-hidden transition-all duration-150"
            placeholder="Search address, post text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Rental Type</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'all', label: 'All Stays', count: availableCounts.all, dot: 'bg-indigo-600' },
            { id: 'bachelor', label: 'Bachelor Seat', count: availableCounts.bachelor, dot: 'bg-emerald-500' },
            { id: 'sublet', label: 'Sublet Room', count: availableCounts.sublet, dot: 'bg-purple-500' },
            { id: 'flat', label: 'Full Flat', count: availableCounts.flat, dot: 'bg-amber-500' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTypeChange(cat.id as any)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                filters.type === cat.id
                  ? 'border-indigo-600 bg-indigo-50/30 text-indigo-700 font-medium'
                  : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50/30'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <span className="text-xs font-semibold">{cat.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">{cat.count} listings</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Primary Zone</label>
        <div className="relative">
          <select
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:border-indigo-500 focus:bg-white focus:outline-hidden appearance-none cursor-pointer transition-all"
            value={filters.location}
            onChange={handleLocationChange}
          >
            {AVAILABLE_LOCATIONS.map((loc) => (
              <option key={loc} value={loc === 'All Locations' ? 'all' : loc}>
                {loc}
              </option>
            ))}
          </select>
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            ▼
          </div>
        </div>
      </div>

      {/* Budget / Price limits */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Budget Range (Monthly BDT)</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 text-xs font-bold font-mono">৳</span>
            <input
              type="number"
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:border-indigo-500 focus:bg-white focus:outline-hidden transition-all text-gray-700"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange('minPrice', Number(e.target.value))}
            />
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 text-xs font-bold font-mono">৳</span>
            <input
              type="number"
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:border-indigo-500 focus:bg-white focus:outline-hidden transition-all text-gray-700"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange('maxPrice', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Save Toggle and Ratings segment */}
      <div className="mb-6 space-y-4 pt-4 border-t border-slate-100">
        {/* Favorites only checkbox */}
        <button
          onClick={() => setFilters(prev => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))}
          className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
            filters.showFavoritesOnly
              ? 'border-indigo-600 bg-indigo-50/10 text-indigo-700'
              : 'border-slate-150 hover:bg-slate-50 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bookmark className={`w-4 h-4 ${filters.showFavoritesOnly ? 'fill-indigo-600 text-indigo-600' : 'text-slate-450'}`} />
            <span className="text-xs font-bold">Saved Stays Only</span>
          </div>
          <span className={`w-4 h-4 rounded-sm border flex items-center justify-center transition ${
            filters.showFavoritesOnly ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
          }`}>
            {filters.showFavoritesOnly && '✓'}
          </span>
        </button>

        {/* Minimum rating dropdown or list items */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Minimum Tenant Reviews Score</label>
          <div className="flex gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/40">
            {['all', 3, 4, 5].map((val) => {
              const active = filters.minRating === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, minRating: val as any }))}
                  className={`flex-1 py-1.5 text-center rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-0.5 ${
                    active 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  {val === 'all' ? (
                    'All'
                  ) : (
                    <>
                      <span>{val}</span>
                      <Star className={`w-3 h-3 ${active ? 'fill-white' : 'fill-slate-400 text-slate-400'}`} />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bachelor Gender Preference Filter */}
      {filters.type === 'bachelor' && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Gender Preference</label>
          <div className="flex gap-2 bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/40">
            {(['any', 'male', 'female'] as const).map((g) => (
              <button
                key={g}
                onClick={() => handleGenderChange(g)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                  filters.gender === g
                    ? 'bg-indigo-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bedrooms Count Filter */}
      {filters.type !== 'bachelor' && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bedrooms Required</label>
          <div className="flex gap-1.5 bg-slate-100/50 p-1 rounded-xl">
            {(['any', 1, 2, 3, 4] as const).map((num) => (
              <button
                key={num}
                onClick={() => handleBedroomsChange(num)}
                className={`flex-1 py-1.5 text-center rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  filters.bedrooms === num
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                {num === 'any' ? 'Any' : `${num} BHK`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Helper Guide */}
      <div className="mt-8 bg-indigo-50/40 border border-indigo-100/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold text-indigo-950 font-display">Facebook Group Advice</h4>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Bachelor, Sublet, and Flats listed here represent community entries. Always call or click the WhatsApp simulation to verify availability and physical safety conditions before booking.
        </p>
      </div>
    </div>
  );
}
