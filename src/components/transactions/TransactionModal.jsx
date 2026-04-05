import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function TransactionModal({ isOpen, onClose, editing }) {
  const { addTransaction, editTransaction } = useApp();

  const blank = { date: new Date().toISOString().split('T')[0], description: '', category: 'Food', type: 'expense', amount: '' };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    setForm(editing ? { ...editing } : blank);
  }, [editing, isOpen]);

  if (!isOpen) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.description || !form.amount || !form.date) return;
    const tx = { ...form, amount: parseFloat(form.amount) };
    if (editing) editTransaction(editing.id, tx);
    else addTransaction(tx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-deep border border-violet/30 rounded-2xl shadow-2xl fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-violet/20">
          <h2 className="font-display font-semibold text-white text-lg">
            {editing ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button onClick={onClose} className="text-blush/50 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2">
            {['expense', 'income'].map(t => (
              <button
                key={t}
                onClick={() => set('type', t)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                  form.type === t
                    ? t === 'income'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-white/5 text-blush/50 border border-white/10 hover:bg-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Field label="Description">
            <input
              className="input-field"
              placeholder="What was this for?"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount (₹)">
              <input
                type="number"
                className="input-field font-mono"
                placeholder="0.00"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                className="input-field font-mono"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </Field>
          </div>

          <Field label="Category">
            <select
              className="input-field"
              value={form.category}
              onChange={e => set('category', e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-blush/70 text-sm hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet to-magenta text-white text-sm font-medium hover:opacity-90 transition-all"
          >
            {editing ? 'Update' : 'Add Transaction'}
          </button>
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(105,3,117,0.3);
          border-radius: 0.75rem;
          padding: 0.625rem 0.875rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #CB429F; }
        .input-field option { background: #2C0E37; }
        .input-field::placeholder { color: rgba(174,132,126,0.5); }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-blush/60 text-xs font-medium uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
