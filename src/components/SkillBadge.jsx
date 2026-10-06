import React from 'react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const SkillBadge = ({
  name,
  variant = 'default', // 'default' | 'matched' | 'missing' | 'removable'
  onRemove,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs sm:text-sm',
    lg: 'px-3 py-1.5 text-sm',
  };

  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
    matched: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20',
    missing: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/20',
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg border transition-all ${
        variants[variant] || variants.default
      } ${sizeStyles[size] || sizeStyles.md}`}
    >
      {variant === 'matched' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
      {variant === 'missing' && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
      {name}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 text-slate-400 hover:text-rose-600 focus:outline-none transition-colors"
          title={`Remove ${name}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default SkillBadge;
