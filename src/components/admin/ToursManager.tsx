import { useState } from 'react';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { Tour } from '../../context/CMSContext';
import ImageUploadField from './ImageUploadField';
import ListField from './ListField';

interface Props {
  tours: Tour[];
  onChange: (tours: Tour[]) => void;
}

const blankTour = (): Tour => ({
  id: Date.now().toString(),
  title: '', duration: '', price: '', image: '',
  description: '', fullDescription: '',
  highlights: [], inclusions: [], gallery: [], itinerary: [],
});

function TourForm({ tour, onSave, onCancel }: { tour: Tour; onSave: (t: Tour) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState<Tour>(tour);
  const set = (field: keyof Tour, value: unknown) => setDraft(prev => ({ ...prev, [field]: value }));

  const addItinerary = () => set('itinerary', [...draft.itinerary, { day: '', title: '', desc: '' }]);
  const updateItinerary = (i: number, field: 'day' | 'title' | 'desc', val: string) => {
    const updated = draft.itinerary.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    set('itinerary', updated);
  };
  const removeItinerary = (i: number) => set('itinerary', draft.itinerary.filter((_, idx) => idx !== i));

  const input = (label: string, field: keyof Tour, type: 'text' | 'textarea' = 'text') => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7A5E]">{label}</label>
      {type === 'textarea'
        ? <textarea rows={3} value={draft[field] as string} onChange={e => set(field, e.target.value)} className="w-full px-3 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 resize-none bg-white" />
        : <input type="text" value={draft[field] as string} onChange={e => set(field, e.target.value)} className="w-full px-3 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
      }
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-[#D5CEC0] shadow-lg overflow-hidden">
      <div className="bg-[#1A2421] px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-serif text-lg">{draft.title || 'New Tour'}</h3>
        <button onClick={onCancel} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
      </div>

      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {input('Title', 'title')}
          {input('Duration', 'duration')}
          {input('Price', 'price')}
        </div>
        {input('Short Description', 'description', 'textarea')}
        {input('Full Description', 'fullDescription', 'textarea')}

        {/* Cover Image */}
        <ImageUploadField label="Cover Image" value={draft.image} onChange={v => set('image', v)} aspectHint="Recommended: 1200×600" />

        {/* Gallery */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7A5E]">Gallery Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {draft.gallery.map((img, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-[#D5CEC0]">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button onClick={() => set('gallery', draft.gallery.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
              </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-[#C8D4B0] hover:border-[#7C8960] flex items-center justify-center cursor-pointer transition-colors">
              <Plus className="w-6 h-6 text-[#9CAA8A]" />
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const { compressImage } = await import('../../services/cmsService');
                const b64 = await compressImage(f, 800, 0.8);
                set('gallery', [...draft.gallery, b64]);
                e.target.value = '';
              }} />
            </label>
          </div>
        </div>

        {/* Lists */}
        <ListField label="Highlights" items={draft.highlights} onChange={v => set('highlights', v)} placeholder="Add highlight…" />
        <ListField label="Inclusions" items={draft.inclusions} onChange={v => set('inclusions', v)} placeholder="Add inclusion…" />

        {/* Itinerary */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7A5E]">Itinerary</label>
          {draft.itinerary.map((item, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr_1fr_auto] gap-2 items-start">
              <input placeholder="Day" value={item.day} onChange={e => updateItinerary(i, 'day', e.target.value)} className="px-2 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <input placeholder="Title" value={item.title} onChange={e => updateItinerary(i, 'title', e.target.value)} className="px-2 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <input placeholder="Description" value={item.desc} onChange={e => updateItinerary(i, 'desc', e.target.value)} className="px-2 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
              <button onClick={() => removeItinerary(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button onClick={addItinerary} className="flex items-center gap-2 text-sm text-[#7C8960] hover:text-[#3A4F29] transition-colors font-medium"><Plus className="w-4 h-4" /> Add Day</button>
        </div>
      </div>

      <div className="px-6 py-4 bg-[#F5F2ED] border-t border-[#D5CEC0] flex justify-end gap-3">
        <button onClick={onCancel} className="px-5 py-2.5 text-sm font-semibold text-[#6B7A5E] hover:text-[#1A2421] transition-colors">Cancel</button>
        <button onClick={() => onSave(draft)} className="px-6 py-2.5 bg-[#3A4F29] text-white text-sm font-semibold rounded-xl hover:bg-[#1A2421] transition-colors shadow-sm">Save Tour</button>
      </div>
    </div>
  );
}

export default function ToursManager({ tours, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const handleSave = (tour: Tour) => {
    if (creating) { onChange([...tours, tour]); setCreating(false); }
    else { onChange(tours.map(t => t.id === tour.id ? tour : t)); setEditingId(null); }
  };

  const handleDelete = (id: string) => { onChange(tours.filter(t => t.id !== id)); setDeletingId(null); };

  if (creating) return <TourForm tour={blankTour()} onSave={handleSave} onCancel={() => setCreating(false)} />;
  if (editingId) { const t = tours.find(t => t.id === editingId); return t ? <TourForm tour={t} onSave={handleSave} onCancel={() => setEditingId(null)} /> : null; }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6B7A5E]">{tours.length} tour{tours.length !== 1 ? 's' : ''} published</p>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#3A4F29] text-white text-sm font-semibold rounded-xl hover:bg-[#1A2421] transition-colors shadow-sm"><Plus className="w-4 h-4" /> Add Tour</button>
      </div>

      {tours.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#D5CEC0]">
          <p className="text-[#9CAA8A] text-lg font-medium mb-2">No tours yet</p>
          <p className="text-[#C8D4B0] text-sm">Click "Add Tour" to create your first tour package.</p>
        </div>
      )}

      {tours.map(tour => (
        <div key={tour.id} className="bg-white rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 p-4">
            <GripVertical className="w-5 h-5 text-[#C8D4B0] shrink-0" />
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#F0EAD6]">
              {tour.image ? <img src={tour.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#C8D4B0] text-xs">No img</div>}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[#1A2421] text-lg truncate">{tour.title || <span className="text-[#C8D4B0] italic">Untitled Tour</span>}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs bg-[#F0EAD6] text-[#6B5B4F] px-2 py-0.5 rounded-full font-medium">{tour.duration || '—'}</span>
                <span className="text-sm font-bold text-[#3A4F29]">{tour.price || '—'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setEditingId(tour.id)} className="p-2.5 text-[#6B7A5E] hover:text-[#1A2421] hover:bg-[#F0EAD6] rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => setDeletingId(tour.id)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>

          {deletingId === tour.id && (
            <div className="bg-red-50 border-t border-red-100 px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-red-700 font-medium">Delete "<strong>{tour.title}</strong>"? This cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setDeletingId(null)} className="px-3 py-1.5 text-sm text-[#6B7A5E] hover:text-[#1A2421] font-medium transition-colors">Cancel</button>
                <button onClick={() => handleDelete(tour.id)} className="px-4 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
