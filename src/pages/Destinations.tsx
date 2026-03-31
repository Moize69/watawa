import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, X, Check } from 'lucide-react';
import { TABS } from '../data';
import { useCMS, Tour } from '../context/CMSContext';

export default function Destinations() {
  const { content } = useCMS();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const openTour = (tour: Tour) => { setSelectedTour(tour); setActiveTab(TABS[0]); };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full flex-1">
      <div className="text-center mb-16">
        <p className="text-savannah-sage font-medium tracking-[0.2em] uppercase mb-2">Our Packages</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-savannah-dark font-serif">Breathtaking <span className="italic text-savannah-leaf">Destinations</span></h1>
        <p className="mt-6 text-savannah-earth max-w-2xl mx-auto text-lg">Explore our carefully curated safari experiences across the most iconic landscapes in Africa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.tours.map((tour) => (
          <motion.div key={tour.id} whileHover={{ y: -10 }} onClick={() => openTour(tour)} className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-savannah-earth/10 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden shrink-0">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="font-bold text-savannah-leaf">{tour.price}</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-savannah-sage text-sm font-medium uppercase tracking-wider mb-3"><Calendar className="w-4 h-4" /><span>{tour.duration}</span></div>
              <h3 className="text-2xl mb-3 group-hover:text-savannah-leaf transition-colors font-serif">{tour.title}</h3>
              <p className="text-savannah-earth mb-6 line-clamp-2 flex-1">{tour.description}</p>
              <div className="flex items-center text-savannah-accent font-semibold uppercase tracking-wider text-sm mt-auto pt-4 border-t border-savannah-earth/10">
                View Details <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTour(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-savannah-sand w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col z-10">
              <button onClick={() => setSelectedTour(null)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"><X className="w-6 h-6" /></button>
              <div className="w-full h-64 md:h-80 relative shrink-0">
                <img src={selectedTour.image} alt={selectedTour.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                  <h3 className="text-3xl md:text-5xl font-serif mb-3" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{selectedTour.title}</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-xl font-semibold text-savannah-sun" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{selectedTour.price}</p>
                    <div className="flex items-center gap-1 text-sm font-medium uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/20"><Calendar className="w-4 h-4" /><span>{selectedTour.duration}</span></div>
                  </div>
                </div>
              </div>
              <div className="flex overflow-x-auto bg-[#5C3A21] text-white/70 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 text-sm font-bold tracking-wider uppercase whitespace-nowrap transition-colors border-b-4 ${activeTab === tab ? 'text-[#F0EAD6] border-[#D4A373] bg-black/10' : 'border-transparent hover:text-white hover:bg-black/5'}`}>{tab}</button>
                ))}
              </div>
              <div className="p-6 md:p-10 overflow-y-auto bg-savannah-sand flex-1">
                {activeTab === 'OVERVIEW' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <h4 className="font-serif text-2xl text-savannah-dark mb-4">About this journey</h4>
                    <p className="text-savannah-earth leading-relaxed mb-8 text-lg">{selectedTour.fullDescription}</p>
                    <h4 className="font-serif text-xl text-savannah-dark mb-4">Tour Highlights</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTour.highlights.map((h, i) => (<li key={i} className="flex items-start gap-3 text-savannah-earth bg-white/50 p-4 rounded-xl border border-savannah-earth/10"><Check className="w-5 h-5 text-savannah-leaf shrink-0 mt-0.5" /><span>{h}</span></li>))}
                    </ul>
                  </motion.div>
                )}
                {activeTab === 'GALLERY' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedTour.gallery.map((img, i) => (<div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm"><img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" /></div>))}
                  </motion.div>
                )}
                {activeTab === 'INCLUSIONS' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <h4 className="font-serif text-2xl text-savannah-dark mb-6">What's Included</h4>
                    <ul className="space-y-4">
                      {selectedTour.inclusions.map((inc, i) => (<li key={i} className="flex items-center gap-4 text-savannah-earth bg-white/50 p-4 rounded-xl border border-savannah-earth/10"><div className="w-8 h-8 rounded-full bg-savannah-sage/20 flex items-center justify-center text-savannah-leaf shrink-0"><Check className="w-4 h-4" /></div><span className="font-medium">{inc}</span></li>))}
                    </ul>
                  </motion.div>
                )}
                {activeTab === 'ITINERARY' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                    {selectedTour.itinerary.map((item, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-savannah-dark text-savannah-sun flex items-center justify-center font-serif font-bold shrink-0 text-sm">{item.day}</div>
                          {i !== selectedTour.itinerary.length - 1 && <div className="w-px h-full bg-savannah-earth/20 my-2" />}
                        </div>
                        <div className="pb-8"><h4 className="text-xl font-bold text-savannah-dark mb-2">{item.title}</h4><p className="text-savannah-earth">{item.desc}</p></div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              <div className="p-6 border-t border-savannah-earth/10 bg-white shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-savannah-earth uppercase tracking-wider font-medium">Total Price</p>
                  <p className="text-2xl font-bold text-savannah-dark">{selectedTour.price} <span className="text-sm font-normal text-savannah-earth">per person</span></p>
                </div>
                <button className="w-full sm:w-auto px-8 py-4 bg-savannah-accent text-white rounded-xl uppercase tracking-wider text-sm font-semibold hover:bg-savannah-dark transition-colors shadow-md">Book This Tour</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
