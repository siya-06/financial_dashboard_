import { useState, useMemo } from 'react';
import { Search, Plus, ArrowUpDown, ArrowUp, ArrowDown, Edit2, Trash2, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../../data/mockData';
import TransactionModal from './TransactionModal';

const TYPE_BADGE = {
  income:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  expense: 'bg-red-500/15 text-red-400 border-red-500/25',
};

function SortIcon({ col, config }) {
  if (config.key !== col) return <ArrowUpDown size={12} className="text-blush/30" />;
  return config.dir === 'asc' ? <ArrowUp size={12} className="text-magenta" /> : <ArrowDown size={12} className="text-magenta" />;
}

export default function Transactions() {
  const { transactions, role, deleteTransaction, filters, setFilters, sortConfig, setSortConfig } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);

  const toggleSort = (key) => {
    setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
  };

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filters.type !== 'all') list = list.filter(t => t.type === filters.type);
    if (filters.category !== 'all') list = list.filter(t => t.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortConfig.key === 'date')   cmp = new Date(a.date) - new Date(b.date);
      if (sortConfig.key === 'amount') cmp = a.amount - b.amount;
      return sortConfig.dir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [transactions, filters, sortConfig]);

  const openEdit = (tx) => { setEditing(tx); setModalOpen(true); };
  const openAdd  = ()   => { setEditing(null); setModalOpen(true); };

  return (
    <div className="space-y-5 fade-up">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush/40" />
          <input
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-blush/30 focus:outline-none focus:border-violet/50 transition-colors"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          />
        </div>

        {/* Type filter */}
        <select
          className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-blush/70 focus:outline-none focus:border-violet/50 transition-colors"
          value={filters.type}
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category filter */}
        <select
          className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-blush/70 focus:outline-none focus:border-violet/50 transition-colors"
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Add button — admin only */}
        {role === 'admin' && (
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet to-magenta text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={15} />
            <span>Add</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 px-5 py-3 border-b border-white/8 text-blush/50 text-xs font-medium uppercase tracking-wider">
          <button className="text-left flex items-center gap-1 hover:text-blush transition-colors" onClick={() => toggleSort('description')}>
            Description
          </button>
          <button className="text-right hidden sm:flex items-center justify-end gap-1 hover:text-blush transition-colors" onClick={() => toggleSort('date')}>
            Date <SortIcon col="date" config={sortConfig} />
          </button>
          <span className="text-center hidden sm:block">Category</span>
          <button className="text-right flex items-center justify-end gap-1 hover:text-blush transition-colors" onClick={() => toggleSort('amount')}>
            Amount <SortIcon col="amount" config={sortConfig} />
          </button>
          <span />
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-blush/40 text-sm mb-1">No transactions found</p>
            <p className="text-blush/25 text-xs">Try adjusting your filters or add your first transaction</p>
          </div>
        ) : (
          filtered.map((tx, i) => (
            <div
              key={tx.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-center px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.025] transition-colors group"
            >
              {/* Desc + type badge */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: (CATEGORY_COLORS[tx.category] || '#AE847E') + '22', color: CATEGORY_COLORS[tx.category] || '#AE847E' }}
                >
                  {tx.category[0]}
                </span>
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">{tx.description}</p>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize sm:hidden ${TYPE_BADGE[tx.type]}`}>
                    {tx.type}
                  </span>
                </div>
              </div>

              <p className="text-blush/50 text-xs font-mono text-right hidden sm:block">
                {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </p>

              <div className="hidden sm:flex justify-center">
                <span
                  className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
                  style={{
                    background: (CATEGORY_COLORS[tx.category] || '#AE847E') + '18',
                    color: CATEGORY_COLORS[tx.category] || '#AE847E',
                    borderColor: (CATEGORY_COLORS[tx.category] || '#AE847E') + '35',
                  }}
                >
                  {tx.category}
                </span>
              </div>

              <p className={`font-mono font-semibold text-sm text-right ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </p>

              {/* Admin actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {role === 'admin' && (
                  <>
                    <button
                      onClick={() => openEdit(tx)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-blush/50 hover:text-violet hover:bg-violet/10 transition-all"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-blush/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-blush/30 text-xs text-right font-mono">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</p>

      <TransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editing={editing} />
    </div>
  );
}
