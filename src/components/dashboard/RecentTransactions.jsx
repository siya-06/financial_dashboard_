import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function RecentTransactions() {
  const { transactions, setActivePage } = useApp();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 fade-up fade-up-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold text-base">Recent Transactions</h3>
          <p className="text-blush/50 text-xs mt-0.5">Latest activity</p>
        </div>
        <button
          onClick={() => setActivePage('transactions')}
          className="flex items-center gap-1 text-xs text-magenta hover:text-blush transition-colors"
        >
          View all <ArrowRight size={12} />
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="py-8 text-center text-blush/40 text-sm">No transactions yet</div>
      ) : (
        <div className="space-y-1">
          {recent.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/[0.03] transition-colors">
              <span
                className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold"
                style={{
                  background: (CATEGORY_COLORS[tx.category] || '#AE847E') + '22',
                  color: CATEGORY_COLORS[tx.category] || '#AE847E'
                }}
              >
                {tx.category[0]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{tx.description}</p>
                <p className="text-blush/40 text-xs font-mono">
                  {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </p>
              </div>
              <p className={`font-mono font-semibold text-sm flex-shrink-0 ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
