import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { loadContent, saveContent } from '../services/cmsService';

export interface Tour {
  id: string;
  title: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  inclusions: string[];
  gallery: string[];
  itinerary: { day: string; title: string; desc: string }[];
}

export interface NavLink { label: string; path: string; }
export interface SocialLink { platform: string; url: string; icon: string; }

export interface SiteContent {
  siteSettings: { logoText: string; logoSubtext: string; tagline: string; logoImage: string; logoWidth: string; };
  nav: { links: NavLink[]; bookNowText: string; };
  hero: { backgroundImage: string; subtitle: string; titleLine1: string; titleLine2: string; description: string; buttonText: string; };
  whyChooseUs: { image: string; yearsOfExperience: string; subtitle: string; title: string; titleHighlight: string; description: string; feature1Title: string; feature1Desc: string; feature2Title: string; feature2Desc: string; };
  handcraftedJourneys: { subtitle: string; title: string; description: string; buttonText: string; };
  extraordinarilyUnique: { subtitle: string; titleLine1: string; titleLine2: string; description1: string; description2: string; buttonText: string; image1: string; image2: string; };
  contact: { address: string; phone1: string; phone2: string; email1: string; email2: string; hoursWeekday: string; hoursSaturday: string; hoursSunday: string; };
  footer: { tagline: string; copyrightText: string; socialLinks: SocialLink[]; };
  tours: Tour[];
}

export const defaultContent: SiteContent = {
  siteSettings: { logoText: 'Wattawa', logoSubtext: 'Tours & Travel', tagline: 'Crafting bespoke safari experiences', logoImage: '', logoWidth: '160' },
  nav: { links: [{ label: 'Home', path: '/' }, { label: 'Destinations', path: '/destinations' }, { label: 'Why Choose Us', path: '/#why-choose-us' }, { label: 'Contact Us', path: '/contact' }], bookNowText: 'Book Now' },
  hero: { backgroundImage: 'https://picsum.photos/seed/savannah-sunset/1920/1080', subtitle: 'Discover the wild', titleLine1: 'Journey Into The', titleLine2: 'Untamed', description: 'Experience the raw beauty of Africa with our guided luxury safaris. Connect with nature in its purest form.', buttonText: 'Explore Tours' },
  whyChooseUs: { image: 'https://picsum.photos/seed/safari-guide/800/1000', yearsOfExperience: '15+', subtitle: 'Why Choose Us', title: 'We create', titleHighlight: 'unforgettable', description: "Our expert guides have spent their lives studying the intricate ecosystems of the savannah. We don't just show you animals; we immerse you in their world, ensuring sustainable and respectful encounters.", feature1Title: 'Expert Guides', feature1Desc: 'Local professionals with deep knowledge of wildlife behavior.', feature2Title: 'Photography', feature2Desc: 'Specially designed vehicles for the perfect shot.' },
  handcraftedJourneys: { subtitle: 'Handcrafted Journeys', title: 'Beyond the Ordinary', description: 'Step away from the crowds and into the heart of the wild. Our bespoke itineraries are designed for those who seek authentic connections with nature, guided by local experts who know the land intimately.', buttonText: 'Explore All Itineraries' },
  extraordinarilyUnique: { subtitle: 'Extraordinarily Unique', titleLine1: 'The Heartbeats', titleLine2: 'of Africa', description1: 'Known as the heartbeats of Africa, Uganda and Rwanda pulse with vibrant cultural heritage and untouched, breathtaking landscapes.', description2: "Lose yourself in dense, emerald rainforests, majestic mountain peaks, and world-renowned national parks, or find peace across sweeping savannahs and expansive, shimmering lakes.", buttonText: 'Discover More', image1: 'https://picsum.photos/seed/gorilla/600/800', image2: 'https://picsum.photos/seed/local-culture/500/400' },
  contact: { address: '123 Safari Way\nNairobi, Kenya\nP.O. Box 12345', phone1: '+254 20 123 4567', phone2: '+1 (555) 123-4567', email1: 'info@wattawatours.com', email2: 'bookings@wattawatours.com', hoursWeekday: '8:00 AM - 6:00 PM (EAT)', hoursSaturday: '9:00 AM - 2:00 PM (EAT)', hoursSunday: 'Closed' },
  footer: { tagline: 'Crafting bespoke safari experiences that connect you with the raw beauty and majestic wildlife of the African continent.', copyrightText: '© 2026 Wattawa Tours & Travel. All rights reserved.', socialLinks: [{ platform: 'Facebook', url: '#', icon: 'f' }, { platform: 'LinkedIn', url: '#', icon: 'in' }, { platform: 'Instagram', url: '#', icon: 'ig' }] },
  tours: [
    { id: '1', title: 'Serengeti Great Migration', duration: '7 Days', price: '$2,499', image: 'https://picsum.photos/seed/migration/1200/600', description: "Witness one of nature's greatest spectacles as millions of wildebeest cross the plains.", fullDescription: 'Join us for an unforgettable 7-day journey through the Serengeti. You will follow the Great Migration, staying in luxury mobile camps that move with the herds. Experience thrilling game drives, hot air balloon safaris at dawn, and sundowners overlooking the vast plains.', highlights: ['Daily game drives in open 4x4 vehicles', 'Luxury mobile tented camp accommodation', 'Hot air balloon safari at dawn', 'Expert Maasai naturalist guides'], inclusions: ['All park fees and conservation levies', 'Luxury tented accommodation', '3 meals a day + select beverages', 'Round-trip airport transfers', 'Professional English-speaking guide', 'Flying doctors evacuation cover'], gallery: ['https://picsum.photos/seed/mig1/400/300', 'https://picsum.photos/seed/mig2/400/300', 'https://picsum.photos/seed/mig3/400/300', 'https://picsum.photos/seed/mig4/400/300'], itinerary: [{ day: '1', title: 'Arrival in Arusha', desc: 'Welcome to Tanzania! Transfer to your luxury lodge for an evening of relaxation before the adventure begins.' }, { day: '2-3', title: 'Central Serengeti', desc: 'Fly into the heart of the Serengeti. Enjoy afternoon game drives spotting big cats and vast herds.' }, { day: '4-6', title: 'Following the Herds', desc: 'Move with the migration. Depending on the season, witness thrilling river crossings or calving season.' }, { day: '7', title: 'Departure', desc: 'Final morning game drive, breakfast in the bush, and transfer to the airstrip for your flight home.' }] },
    { id: '2', title: 'Okavango Delta Safari', duration: '5 Days', price: '$1,899', image: 'https://picsum.photos/seed/delta/1200/600', description: 'Explore the lush waterways and diverse wildlife of this unique inland delta.', fullDescription: 'Glide through the tranquil waterways of the Okavango Delta in a traditional mokoro. This 5-day safari offers a unique perspective on wildlife viewing, combining water-based excursions with walking safaris on pristine islands.', highlights: ['Mokoro (dugout canoe) excursions', 'Guided walking safaris on delta islands', 'Exceptional bird watching opportunities', 'Exclusive eco-lodge stays'], inclusions: ['Light aircraft transfers from Maun', 'Eco-lodge accommodation', 'All meals and local drinks', 'Daily guided activities (water & land)', 'National park fees'], gallery: ['https://picsum.photos/seed/oka1/400/300', 'https://picsum.photos/seed/oka2/400/300', 'https://picsum.photos/seed/oka3/400/300', 'https://picsum.photos/seed/oka4/400/300'], itinerary: [{ day: '1', title: 'Maun to the Delta', desc: 'Light aircraft flight over the delta to your water-based camp.' }, { day: '2', title: 'Mokoro Excursions', desc: 'Peaceful gliding through the reeds, spotting tiny frogs and colorful birds.' }, { day: '3-4', title: "Chief's Island", desc: 'Transfer to a land-based camp for walking safaris and traditional 4x4 game drives.' }, { day: '5', title: 'Return Journey', desc: 'Morning activity followed by a scenic flight back to Maun.' }] },
    { id: '3', title: 'Kruger National Park', duration: '4 Days', price: '$1,299', image: 'https://picsum.photos/seed/kruger/1200/600', description: "Experience the ultimate Big Five safari in South Africa's premier reserve.", fullDescription: 'Discover the incredible biodiversity of Kruger National Park. Over 4 days, you will track the Big Five with our expert trackers, returning each evening to a luxurious lodge under the African stars.', highlights: ['High probability of Big Five sightings', 'Night game drives with spotlights', 'Bush dinners under the stars', 'Visit to local conservation projects'], inclusions: ['Private lodge accommodation', 'Breakfast and dinner daily', 'Morning and evening game drives', 'Conservation fees', 'Expert tracker and ranger team'], gallery: ['https://picsum.photos/seed/kru1/400/300', 'https://picsum.photos/seed/kru2/400/300', 'https://picsum.photos/seed/kru3/400/300', 'https://picsum.photos/seed/kru4/400/300'], itinerary: [{ day: '1', title: 'Arrival at Lodge', desc: 'Arrive at your private concession. Afternoon game drive followed by a boma dinner.' }, { day: '2-3', title: 'Tracking the Big Five', desc: 'Early morning and late afternoon game drives. Midday relaxation by the pool.' }, { day: '4', title: 'Final Safari', desc: 'One last sunrise game drive before breakfast and departure.' }] },
  ],
};

interface CMSContextType {
  content: SiteContent;
  isLoading: boolean;
  updateField: (section: keyof SiteContent, field: string, value: string) => void;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function deepMerge<T extends object>(base: T, saved: Partial<T>): T {
  const result = { ...base };
  for (const key in saved) {
    const s = saved[key]; const b = base[key];
    if (s !== null && typeof s === 'object' && !Array.isArray(s) && typeof b === 'object' && !Array.isArray(b)) {
      result[key] = deepMerge(b as object, s as object) as T[typeof key];
    } else if (s !== undefined) {
      result[key] = s as T[typeof key];
    }
  }
  return result;
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent(defaultContent).then((saved) => {
      setContent(deepMerge(defaultContent, saved as Partial<SiteContent>));
      setIsLoading(false);
    });
  }, []);

  const updateSection = useCallback(<K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent(prev => { const updated = { ...prev, [section]: data }; saveContent(updated); return updated; });
  }, []);

  const updateField = useCallback((section: keyof SiteContent, field: string, value: string) => {
    setContent(prev => {
      const updated = { ...prev, [section]: { ...(prev[section] as Record<string, unknown>), [field]: value } };
      saveContent(updated); return updated;
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-savannah-sand flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-savannah-sage border-t-transparent rounded-full animate-spin" />
          <p className="text-savannah-earth font-medium">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <CMSContext.Provider value={{ content, isLoading, updateSection, updateField }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within a CMSProvider');
  return ctx;
}
