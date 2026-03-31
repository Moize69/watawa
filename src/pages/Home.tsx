import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sun, Camera, Leaf, ChevronLeft, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

export default function Home() {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { content } = useCMS();
  const { hero, whyChooseUs, handcraftedJourneys, extraordinarilyUnique, tours } = content;

  const randomInclusions = useMemo(() => {
    const all = tours.flatMap(t => t.inclusions);
    const unique = Array.from(new Set(all));
    return unique.sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [tours]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = window.innerWidth < 768 ? 352 : 432;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash === '#why-choose-us') {
      document.getElementById('why-choose-us')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={hero.backgroundImage} alt="Hero Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-savannah-dark/90" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-savannah-sage font-bold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            <Leaf className="w-4 h-4" /> {hero.subtitle}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl text-savannah-light mb-6 leading-tight" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.8)' }}>
            {hero.titleLine1} <br /><span className="italic text-savannah-sun">{hero.titleLine2}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-savannah-light/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {hero.description}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations" className="px-8 py-4 bg-savannah-leaf text-white rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-savannah-dark transition-colors flex items-center justify-center gap-2 shadow-lg">
              {hero.buttonText} <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-24 bg-savannah-dark text-savannah-sand">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-savannah-sage/30 rounded-2xl transform -rotate-3" />
            <img src={whyChooseUs.image} alt="Safari Guide" className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-8 -right-8 bg-savannah-leaf p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-5xl font-serif font-bold text-white mb-2">{whyChooseUs.yearsOfExperience}</p>
              <p className="text-white/90 uppercase tracking-wider text-sm font-medium">Years of<br />Experience</p>
            </div>
          </div>
          <div>
            <p className="text-savannah-sage font-medium tracking-[0.2em] uppercase mb-4">{whyChooseUs.subtitle}</p>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">{whyChooseUs.title} <span className="italic text-savannah-sun">{whyChooseUs.titleHighlight}</span> memories in the wild.</h2>
            <p className="text-savannah-sand/70 text-lg mb-10 font-light leading-relaxed">{whyChooseUs.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-savannah-sage/20 flex items-center justify-center shrink-0 text-savannah-sun"><Sun className="w-6 h-6" /></div>
                <div><h4 className="text-xl mb-2 text-savannah-sand">{whyChooseUs.feature1Title}</h4><p className="text-savannah-sand/60 text-sm leading-relaxed">{whyChooseUs.feature1Desc}</p></div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-savannah-sage/20 flex items-center justify-center shrink-0 text-savannah-sun"><Camera className="w-6 h-6" /></div>
                <div><h4 className="text-xl mb-2 text-savannah-sand">{whyChooseUs.feature2Title}</h4><p className="text-savannah-sand/60 text-sm leading-relaxed">{whyChooseUs.feature2Desc}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Handcrafted Journeys */}
      <section className="py-24 bg-[#F5F2ED] text-savannah-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-savannah-leaf font-semibold tracking-[0.2em] uppercase text-sm flex items-center gap-2 mb-4"><span className="w-8 h-px bg-savannah-leaf" /> {handcraftedJourneys.subtitle}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-[#1A2421]">{handcraftedJourneys.title}</h2>
              <p className="text-savannah-earth text-lg leading-relaxed">{handcraftedJourneys.description}</p>
            </div>
            <div className="flex flex-col items-end gap-6 shrink-0">
              <Link to="/destinations" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-[#1A2421] hover:text-savannah-leaf transition-colors">
                {handcraftedJourneys.buttonText} <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-3">
                <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-savannah-earth/30 flex items-center justify-center hover:bg-[#1A2421] hover:text-white hover:border-[#1A2421] transition-all"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-savannah-earth/30 flex items-center justify-center hover:bg-[#1A2421] hover:text-white hover:border-[#1A2421] transition-all"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {tours.map(tour => (
              <Link to="/destinations" key={tour.id} className="w-[320px] md:w-[400px] shrink-0 snap-start group block">
                <div className="relative h-[320px] md:h-[420px] overflow-hidden rounded-2xl mb-6 shadow-sm">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#1A2421] shadow-sm">{tour.duration}</div>
                </div>
                <div className="pr-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1A2421] mb-3 group-hover:text-savannah-leaf transition-colors">{tour.title}</h3>
                  <p className="text-savannah-earth line-clamp-2 mb-6 text-sm md:text-base">{tour.description}</p>
                  <div className="flex justify-between items-center border-t border-savannah-earth/20 pt-4">
                    <div className="flex flex-col"><span className="text-xs text-savannah-earth uppercase tracking-wider font-medium mb-1">Starting from</span><span className="text-xl font-bold text-[#1A2421]">{tour.price}</span></div>
                    <span className="w-10 h-10 rounded-full bg-white border border-savannah-earth/20 flex items-center justify-center group-hover:bg-savannah-leaf group-hover:text-white group-hover:border-savannah-leaf transition-all shadow-sm"><ChevronRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
            </div>
            <div className="absolute top-0 right-0 bottom-8 w-16 md:w-32 bg-gradient-to-l from-[#F5F2ED] to-transparent pointer-events-none" />
          </div>
          <div className="mt-8 md:hidden flex justify-center">
            <Link to="/destinations" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-[#1A2421] hover:text-savannah-leaf transition-colors">{handcraftedJourneys.buttonText} <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Extraordinarily Unique */}
      <section className="py-24 bg-[#1A2421] text-[#F0EAD6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="w-full lg:w-1/2 text-left order-1">
              <div className="flex items-center gap-4 mb-6"><span className="w-12 h-px bg-[#D4A373]" /><span className="text-[#D4A373] tracking-[0.2em] uppercase text-sm font-semibold">{extraordinarilyUnique.subtitle}</span></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 text-white leading-tight">
                {extraordinarilyUnique.titleLine1} <br />
                <span className="text-[#D4A373] italic font-light">{extraordinarilyUnique.titleLine2}</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed text-[#F0EAD6]/90">{extraordinarilyUnique.description1}</p>
              <p className="text-lg leading-relaxed text-[#F0EAD6]/90 mb-10">{extraordinarilyUnique.description2}</p>
              <button className="px-8 py-4 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-[#1A2421] transition-colors rounded-full uppercase tracking-wider text-sm font-semibold">{extraordinarilyUnique.buttonText}</button>
            </div>
            <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] order-2 mt-12 lg:mt-0">
              <div className="absolute top-0 right-0 w-3/4 h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl z-10">
                <img src={extraordinarilyUnique.image1} alt="Collage 1" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-[300px] md:h-[360px] rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-[#1A2421]">
                <img src={extraordinarilyUnique.image2} alt="Collage 2" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto border-t border-white/10 pt-12">
            {randomInclusions.map((h, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-4">
                <MapPin className="w-5 h-5 text-[#D4A373] shrink-0" /><span className="text-lg font-medium">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
