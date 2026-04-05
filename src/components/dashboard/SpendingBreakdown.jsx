import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-deep border border-violet/30 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-blush/60 text-xs mb-1">{payload[0].name}</p>
      <p className="text-white font-bold font-mono">₹{payload[0].value.toLocaleString('en-IN')}</p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { currentTxs } = useApp();

  const byCategory = currentTxs
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!data.length) {
    return (
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 flex items-center justify-center h-64">
        <p className="text-blush/40 text-sm">No expense data</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 fade-up fade-up-5">
      <div className="mb-5">
        <h3 className="text-white font-semibold text-base">Spending Breakdown</h3>
        <p className="text-blush/50 text-xs mt-0.5">Current month by category</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#AE847E'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-blush/50 text-[10px] font-mono">TOTAL</p>
            <p className="text-white font-bold text-sm font-mono">₹{(total/1000).toFixed(0)}k</p>
          </div>
        </div>

        <div className="flex-1 space-y-2 w-full">
          {data.map(({ name, value }) => {
            const pct = ((value / total) * 100).toFixed(0);
            return (
              <div key={name} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: CATEGORY_COLORS[name] || '#AE847E' }}
                />
                <span className="text-blush/70 text-xs flex-1 truncate">{name}</span>
                <span className="text-blush/50 text-xs font-mono">{pct}%</span>
                <span className="text-white text-xs font-mono w-20 text-right">₹{value.toLocaleString('en-IN')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
