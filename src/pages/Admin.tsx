import React, { useState } from 'react';
import { Compass, Lock, Settings, Navigation, Home, Users, Map, Phone, Anchor, Image as ImageIcon, ExternalLink, LogOut, ChevronRight } from 'lucide-react';
import { useCMS, SiteContent } from '../context/CMSContext';
import ImageUploadField from '../components/admin/ImageUploadField';
import ListField from '../components/admin/ListField';
import ToursManager from '../components/admin/ToursManager';

const ADMIN_PASSWORD = 'wattawa2026';

// ── Shared field primitives ──────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7A5E] block mb-1.5">{children}</label>
);
const TextInput = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2.5 text-sm border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
);
const TextArea = ({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) => (
  <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 resize-none bg-white" />
);
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
);
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-[#F0EAD6]"><h3 className="font-serif text-[#1A2421] text-lg">{title}</h3></div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
);

// ── Login Gate ────────────────────────────────────────────────────────────────
function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const attempt = () => { if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('cms_auth', '1'); onLogin(); } else { setError(true); setTimeout(() => setError(false), 1800); } };
  return (
    <div className="min-h-screen bg-[#1A2421] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Compass className="w-9 h-9 text-[#7C8960]" />
          <span className="font-serif text-3xl text-white">Wattawa <span className="text-[#7C8960]">CMS</span></span>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-5">
          <div className="flex items-center gap-3 text-white/70">
            <Lock className="w-5 h-5" /><p className="text-sm">Admin access only</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/50 uppercase tracking-wider font-semibold">Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && attempt()} autoFocus placeholder="Enter password" className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${error ? 'border-red-400 bg-red-400/10' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 transition-all`} />
            {error && <p className="text-xs text-red-400 font-medium">Incorrect password. Try again.</p>}
          </div>
          <button onClick={attempt} className="w-full py-3 bg-[#3A4F29] text-white font-semibold rounded-xl hover:bg-[#4A6239] transition-colors shadow-lg">Sign In</button>
        </div>
        <p className="text-center mt-6 text-white/20 text-xs">Default password: wattawa2026</p>
      </div>
    </div>
  );
}

// ── Section Editors ───────────────────────────────────────────────────────────
function SiteSettingsEditor() {
  const { content, updateField, updateSection } = useCMS();
  const s = content.siteSettings;
  const f = (field: string) => (v: string) => updateField('siteSettings', field, v);
  return (
    <div className="space-y-5">
      <Card title="Logo & Branding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Logo Text"><TextInput value={s.logoText} onChange={f('logoText')} /></Field>
          <Field label="Logo Sub-text"><TextInput value={s.logoSubtext} onChange={f('logoSubtext')} /></Field>
        </div>
        <Field label="Site Tagline"><TextInput value={s.tagline} onChange={f('tagline')} /></Field>
        <ImageUploadField label="Logo Image (replaces compass icon)" value={s.logoImage} onChange={f('logoImage')} aspectHint="Transparent PNG recommended" />
        <Field label="Logo Width (px)"><TextInput value={s.logoWidth || '160'} onChange={f('logoWidth')} /></Field>
      </Card>
    </div>
  );
}

function NavEditor() {
  const { content, updateSection } = useCMS();
  const nav = content.nav;
  const updateLinks = (links: typeof nav.links) => updateSection('nav', { ...nav, links });
  return (
    <div className="space-y-5">
      <Card title="Navigation Links">
        <div className="space-y-3">
          {nav.links.map((link, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <input value={link.label} onChange={e => { const a = [...nav.links]; a[i] = { ...a[i], label: e.target.value }; updateLinks(a); }} placeholder="Label" className="px-3 py-2 text-sm border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <input value={link.path} onChange={e => { const a = [...nav.links]; a[i] = { ...a[i], path: e.target.value }; updateLinks(a); }} placeholder="/path" className="px-3 py-2 text-sm border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <button onClick={() => updateLinks(nav.links.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">✕</button>
            </div>
          ))}
          <button onClick={() => updateLinks([...nav.links, { label: '', path: '/' }])} className="text-sm text-[#7C8960] hover:text-[#3A4F29] font-medium flex items-center gap-1.5 transition-colors">+ Add Link</button>
        </div>
      </Card>
      <Card title="Button">
        <Field label="Book Now Button Text"><TextInput value={nav.bookNowText} onChange={v => updateSection('nav', { ...nav, bookNowText: v })} /></Field>
      </Card>
    </div>
  );
}

function HeroEditor() {
  const { content, updateField } = useCMS();
  const h = content.hero;
  const f = (field: string) => (v: string) => updateField('hero', field, v);
  return (
    <div className="space-y-5">
      <Card title="Hero Section">
        <ImageUploadField label="Background Image" value={h.backgroundImage} onChange={f('backgroundImage')} aspectHint="Recommended: 1920×1080" />
        <Field label="Eyebrow Subtitle"><TextInput value={h.subtitle} onChange={f('subtitle')} /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title Line 1"><TextInput value={h.titleLine1} onChange={f('titleLine1')} /></Field>
          <Field label="Title Line 2 (italic)"><TextInput value={h.titleLine2} onChange={f('titleLine2')} /></Field>
        </div>
        <Field label="Description"><TextArea value={h.description} onChange={f('description')} /></Field>
        <Field label="CTA Button Text"><TextInput value={h.buttonText} onChange={f('buttonText')} /></Field>
      </Card>
    </div>
  );
}

function WhyChooseUsEditor() {
  const { content, updateField } = useCMS();
  const w = content.whyChooseUs;
  const f = (field: string) => (v: string) => updateField('whyChooseUs', field, v);
  return (
    <div className="space-y-5">
      <Card title="Section Header">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Eyebrow"><TextInput value={w.subtitle} onChange={f('subtitle')} /></Field>
          <Field label="Title"><TextInput value={w.title} onChange={f('title')} /></Field>
          <Field label="Highlighted Word"><TextInput value={w.titleHighlight} onChange={f('titleHighlight')} /></Field>
        </div>
        <Field label="Description"><TextArea value={w.description} onChange={f('description')} rows={4} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Years Badge"><TextInput value={w.yearsOfExperience} onChange={f('yearsOfExperience')} /></Field>
        </div>
      </Card>
      <Card title="Section Image">
        <ImageUploadField label="Main Photo" value={w.image} onChange={f('image')} aspectHint="Portrait 4:5" />
      </Card>
      <Card title="Feature Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3"><Field label="Feature 1 Title"><TextInput value={w.feature1Title} onChange={f('feature1Title')} /></Field><Field label="Feature 1 Description"><TextArea value={w.feature1Desc} onChange={f('feature1Desc')} rows={2} /></Field></div>
          <div className="space-y-3"><Field label="Feature 2 Title"><TextInput value={w.feature2Title} onChange={f('feature2Title')} /></Field><Field label="Feature 2 Description"><TextArea value={w.feature2Desc} onChange={f('feature2Desc')} rows={2} /></Field></div>
        </div>
      </Card>
    </div>
  );
}

function HandcraftedEditor() {
  const { content, updateField } = useCMS();
  const h = content.handcraftedJourneys;
  const f = (field: string) => (v: string) => updateField('handcraftedJourneys', field, v);
  return (
    <Card title="Handcrafted Journeys Section">
      <Field label="Eyebrow"><TextInput value={h.subtitle} onChange={f('subtitle')} /></Field>
      <Field label="Title"><TextInput value={h.title} onChange={f('title')} /></Field>
      <Field label="Description"><TextArea value={h.description} onChange={f('description')} rows={4} /></Field>
      <Field label="Button Text"><TextInput value={h.buttonText} onChange={f('buttonText')} /></Field>
    </Card>
  );
}

function UniqueEditor() {
  const { content, updateField } = useCMS();
  const u = content.extraordinarilyUnique;
  const f = (field: string) => (v: string) => updateField('extraordinarilyUnique', field, v);
  return (
    <div className="space-y-5">
      <Card title="Text Content">
        <Field label="Eyebrow"><TextInput value={u.subtitle} onChange={f('subtitle')} /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title Line 1"><TextInput value={u.titleLine1} onChange={f('titleLine1')} /></Field>
          <Field label="Title Line 2 (italic)"><TextInput value={u.titleLine2} onChange={f('titleLine2')} /></Field>
        </div>
        <Field label="Paragraph 1"><TextArea value={u.description1} onChange={f('description1')} rows={3} /></Field>
        <Field label="Paragraph 2"><TextArea value={u.description2} onChange={f('description2')} rows={4} /></Field>
        <Field label="Button Text"><TextInput value={u.buttonText} onChange={f('buttonText')} /></Field>
      </Card>
      <Card title="Collage Images">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ImageUploadField label="Image 1 (top right)" value={u.image1} onChange={f('image1')} aspectHint="Portrait 3:4" />
          <ImageUploadField label="Image 2 (bottom left)" value={u.image2} onChange={f('image2')} aspectHint="Landscape 4:3" />
        </div>
      </Card>
    </div>
  );
}

function ContactEditor() {
  const { content, updateField } = useCMS();
  const c = content.contact;
  const f = (field: string) => (v: string) => updateField('contact', field, v);
  return (
    <div className="space-y-5">
      <Card title="Contact Details">
        <Field label="Office Address (multiline)"><TextArea value={c.address} onChange={f('address')} rows={3} /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Phone 1"><TextInput value={c.phone1} onChange={f('phone1')} /></Field>
          <Field label="Phone 2"><TextInput value={c.phone2} onChange={f('phone2')} /></Field>
          <Field label="Email 1"><TextInput value={c.email1} onChange={f('email1')} /></Field>
          <Field label="Email 2"><TextInput value={c.email2} onChange={f('email2')} /></Field>
        </div>
      </Card>
      <Card title="Business Hours">
        <div className="space-y-3">
          <Field label="Monday – Friday"><TextInput value={c.hoursWeekday} onChange={f('hoursWeekday')} /></Field>
          <Field label="Saturday"><TextInput value={c.hoursSaturday} onChange={f('hoursSaturday')} /></Field>
          <Field label="Sunday"><TextInput value={c.hoursSunday} onChange={f('hoursSunday')} /></Field>
        </div>
      </Card>
    </div>
  );
}

function FooterEditor() {
  const { content, updateSection } = useCMS();
  const ft = content.footer;
  const updateSocials = (socialLinks: typeof ft.socialLinks) => updateSection('footer', { ...ft, socialLinks });
  return (
    <div className="space-y-5">
      <Card title="Footer Content">
        <Field label="Tagline"><TextArea value={ft.tagline} onChange={v => updateSection('footer', { ...ft, tagline: v })} /></Field>
        <Field label="Copyright Text"><TextInput value={ft.copyrightText} onChange={v => updateSection('footer', { ...ft, copyrightText: v })} /></Field>
      </Card>
      <Card title="Social Links">
        <div className="space-y-3">
          {ft.socialLinks.map((s, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr_1fr_auto] gap-2 items-center">
              <input value={s.icon} onChange={e => { const a = [...ft.socialLinks]; a[i] = { ...a[i], icon: e.target.value }; updateSocials(a); }} placeholder="f / in / ig" className="px-2 py-2 text-sm text-center border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <input value={s.platform} onChange={e => { const a = [...ft.socialLinks]; a[i] = { ...a[i], platform: e.target.value }; updateSocials(a); }} placeholder="Platform" className="px-3 py-2 text-sm border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <input value={s.url} onChange={e => { const a = [...ft.socialLinks]; a[i] = { ...a[i], url: e.target.value }; updateSocials(a); }} placeholder="https://…" className="px-3 py-2 text-sm border border-[#D5CEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <button onClick={() => updateSocials(ft.socialLinks.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">✕</button>
            </div>
          ))}
          <button onClick={() => updateSocials([...ft.socialLinks, { platform: '', icon: '', url: '#' }])} className="text-sm text-[#7C8960] hover:text-[#3A4F29] font-medium flex items-center gap-1.5 transition-colors">+ Add Social Link</button>
        </div>
      </Card>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
type Section = 'siteSettings' | 'nav' | 'hero' | 'whyChooseUs' | 'handcraftedJourneys' | 'extraordinarilyUnique' | 'tours' | 'contact' | 'footer';
const SIDEBAR_GROUPS = [
  { heading: 'General', items: [{ id: 'siteSettings' as Section, label: 'Site Settings', Icon: Settings }, { id: 'nav' as Section, label: 'Navigation', Icon: Navigation }] },
  { heading: 'Home Page', items: [{ id: 'hero' as Section, label: 'Hero', Icon: Home }, { id: 'whyChooseUs' as Section, label: 'Why Choose Us', Icon: Users }, { id: 'handcraftedJourneys' as Section, label: 'Handcrafted Journeys', Icon: Map }, { id: 'extraordinarilyUnique' as Section, label: 'Extraordinarily Unique', Icon: ImageIcon }] },
  { heading: 'Content', items: [{ id: 'tours' as Section, label: 'Tours Manager', Icon: Compass }, { id: 'contact' as Section, label: 'Contact Info', Icon: Phone }, { id: 'footer' as Section, label: 'Footer', Icon: Anchor }] },
];

const SECTION_TITLES: Record<Section, string> = {
  siteSettings: 'Site Settings', nav: 'Navigation', hero: 'Hero Section',
  whyChooseUs: 'Why Choose Us', handcraftedJourneys: 'Handcrafted Journeys',
  extraordinarilyUnique: 'Extraordinarily Unique', tours: 'Tours Manager',
  contact: 'Contact Info', footer: 'Footer',
};

// ── Main Admin ────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('cms_auth') === '1');
  const [section, setSection] = useState<Section>('hero');
  const { content, updateSection } = useCMS();

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;

  const logout = () => { sessionStorage.removeItem('cms_auth'); setAuthed(false); };

  const renderEditor = () => {
    switch (section) {
      case 'siteSettings': return <SiteSettingsEditor />;
      case 'nav': return <NavEditor />;
      case 'hero': return <HeroEditor />;
      case 'whyChooseUs': return <WhyChooseUsEditor />;
      case 'handcraftedJourneys': return <HandcraftedEditor />;
      case 'extraordinarilyUnique': return <UniqueEditor />;
      case 'tours': return <ToursManager tours={content.tours} onChange={tours => updateSection('tours', tours)} />;
      case 'contact': return <ContactEditor />;
      case 'footer': return <FooterEditor />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F2ED] pt-0">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#0F1410] flex flex-col min-h-screen sticky top-0">
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-[#7C8960]" />
            <span className="text-white font-serif text-lg">Wattawa <span className="text-[#7C8960]">CMS</span></span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {SIDEBAR_GROUPS.map(group => (
            <div key={group.heading}>
              <p className="text-[#4A5A3C] text-[10px] font-bold uppercase tracking-widest px-3 mb-1.5">{group.heading}</p>
              {group.items.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => setSection(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${section === id ? 'bg-[#7C8960]/15 text-[#C8D4B8]' : 'text-[#6B7A5E] hover:text-[#9CAA8A] hover:bg-white/5'}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  {section === id && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/5 space-y-1.5">
          <a href="/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7A5E] hover:text-[#9CAA8A] hover:bg-white/5 transition-all">
            <ExternalLink className="w-4 h-4" /> Preview Site
          </a>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7A5E] hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#F5F2ED]/95 backdrop-blur-sm border-b border-[#E8E2D5] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-[#1A2421] text-2xl">{SECTION_TITLES[section]}</h1>
            <p className="text-xs text-[#9CAA8A] mt-0.5">Changes save automatically to your browser</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#3A4F29]/10 text-[#3A4F29] px-3 py-1.5 rounded-full font-medium">
            <div className="w-1.5 h-1.5 bg-[#3A4F29] rounded-full animate-pulse" /> Auto-saved
          </div>
        </header>

        <main className="flex-1 px-8 py-8 max-w-4xl w-full">
          {renderEditor()}
        </main>
      </div>
    </div>
  );
}
