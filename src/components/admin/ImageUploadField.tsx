import { useRef, useState } from 'react';
import { Upload, X, Link as LinkIcon } from 'lucide-react';
import { compressImage } from '../../services/cmsService';

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  aspectHint?: string;
}

export default function ImageUploadField({ label, value, onChange, aspectHint }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsCompressing(true);
    try { onChange(await compressImage(file)); } catch (e) { console.error(e); } finally { setIsCompressing(false); }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  };

  const applyUrl = () => { if (urlDraft.trim()) { onChange(urlDraft.trim()); setUrlDraft(''); setUrlMode(false); } };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7A5E]">{label}</label>
        {aspectHint && <span className="text-xs text-[#9CAA8A]">{aspectHint}</span>}
      </div>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#D5CEC0] group">
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button onClick={() => inputRef.current?.click()} className="px-3 py-1.5 bg-white text-[#1A2421] text-xs font-semibold rounded-lg">Replace</button>
            <button onClick={() => onChange('')} className="p-1.5 bg-red-500 text-white rounded-lg"><X className="w-4 h-4" /></button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !urlMode && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragging ? 'border-[#7C8960] bg-[#7C8960]/10' : 'border-[#C8D4B0] hover:border-[#7C8960] hover:bg-[#7C8960]/5'}`}
        >
          {isCompressing ? (
            <div className="flex flex-col items-center gap-2"><div className="w-6 h-6 border-2 border-[#7C8960] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-[#6B7A5E]">Compressing…</p></div>
          ) : (
            <div className="flex flex-col items-center gap-2"><Upload className="w-7 h-7 text-[#9CAA8A]" /><p className="text-sm font-medium text-[#4A5A3C]">Drop image or click to browse</p><p className="text-xs text-[#9CAA8A]">JPG, PNG, WebP — auto-compressed</p></div>
          )}
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />

      {urlMode ? (
        <div className="flex gap-2">
          <input autoFocus type="url" value={urlDraft} onChange={(e) => setUrlDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && applyUrl()} placeholder="https://…" className="flex-1 px-3 py-2 text-sm border border-[#D5CEC0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8960]/50" />
          <button onClick={applyUrl} className="px-3 py-2 bg-[#3A4F29] text-white text-sm font-semibold rounded-lg hover:bg-[#1A2421] transition-colors">Use</button>
          <button onClick={() => setUrlMode(false)} className="px-3 py-2 text-sm text-[#6B7A5E] rounded-lg hover:bg-[#F0EAD6]">Cancel</button>
        </div>
      ) : (
        <button onClick={() => setUrlMode(true)} className="flex items-center gap-1.5 text-xs text-[#7C8960] hover:text-[#3A4F29] transition-colors">
          <LinkIcon className="w-3.5 h-3.5" /> Use image URL instead
        </button>
      )}
    </div>
  );
}
