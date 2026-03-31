import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function ListField({ label, items, onChange, placeholder = 'Add item…' }: Props) {
  const [draft, setDraft] = useState('');

  const add = () => { if (draft.trim()) { onChange([...items, draft.trim()]); setDraft(''); } };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) => { const a = [...items]; a[i] = v; onChange(a); };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7A5E]">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={item} onChange={(e) => update(i, e.target.value)} className="flex-1 px-3 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 bg-white" />
            <button onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder={placeholder} className="flex-1 px-3 py-2 text-sm border border-dashed border-[#C8D4B0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50 focus:border-[#7C8960] bg-[#F5F2ED]" />
        <button onClick={add} className="p-2 bg-[#3A4F29] text-white rounded-lg hover:bg-[#1A2421] transition-colors"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
