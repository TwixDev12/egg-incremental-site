import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full p-2.5 rounded-[2.5rem] bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/20 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors border border-white/20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Inner Core */}
        <div className="rounded-[2rem] bg-[#0c091d] overflow-hidden border border-white/10">
          <div className="relative aspect-video max-h-[70vh] flex items-center justify-center bg-black/50 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain p-2"
            />
          </div>

          <div className="p-6 sm:p-8 bg-[#120d29]">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Full Resolution Visual</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
