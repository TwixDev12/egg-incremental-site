import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { LightboxModal } from './LightboxModal';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<(typeof SITE_CONFIG.gallery)[0] | null>(null);

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'gameplay', label: 'In-Game Action' },
    { id: 'items', label: 'Eggs & Tools' },
    { id: 'events', label: 'Events & Rewards' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? SITE_CONFIG.gallery
      : SITE_CONFIG.gallery.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Game Visuals & Art
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Take an authentic look inside Egg Incremental Simulator. Explore real assets, models, and community captures directly from development.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="p-1.5 sm:p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md group hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-[#0f0b24] overflow-hidden border border-white/5 relative aspect-4/3 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <LightboxModal
          isOpen={!!activeItem}
          onClose={() => setActiveItem(null)}
          imageUrl={activeItem.imageUrl}
          title={activeItem.title}
          caption={activeItem.caption}
        />
      )}
    </section>
  );
};
