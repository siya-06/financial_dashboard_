import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Award, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-deep border border-violet/30 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-blush/60 text-xs mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-bold font-mono" style={{ color: p.color }}>
          ₹{p.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

function InsightCard({ icon: Icon, title, value, sub, accent, delay }) {
  return (
    <div className={`rounded-2xl bg-white/[0.04] border border-white/10 p-5 fade-up ${delay} hover:border-violet/30 transition-all`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accent + '22' }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div className="min-w-0">
          <p className="text-blush/50 text-xs uppercase tracking-wider mb-1">{title}</p>
          <p className="text-white font-semibold text-base leading-snug">{value}</p>
          {sub && <p className="text-blush/40 text-xs mt-1">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Insights() {
  const { currentTxs, prevTxs, stats } = useApp();

  // Category spending this month
  const catSpend = currentTxs
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});

  const topCat = Object.entries(catSpend).sort((a, b) => b[1] - a[1])[0];

  // Comparison data
  const compareData = [
    { month: 'Last Month', income: stats.prevIncome, expenses: stats.prevExpenses },
    { month: 'This Month', income: stats.currentIncome, expenses: stats.currentExpenses },
  ];

  // Category bar data
  const catData = Object.entries(catSpend)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({ name, value }));

  const savings     = stats.currentIncome - stats.currentExpenses;
  const savingsRate = stats.currentIncome > 0 ? ((savings / stats.currentIncome) * 100).toFixed(0) : 0;
  const expChange   = stats.expenseChange;

  return (
    <div className="space-y-6 fade-up">
      {/* Insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InsightCard
          icon={Award}
          title="Top Spending Category"
          value={topCat ? `${topCat[0]}: ₹${topCat[1].toLocaleString('en-IN')}` : 'No data'}
          sub="This month's highest expense area"
          accent="#CB429F"
          delay="fade-up-1"
        />
        <InsightCard
          icon={expChange > 0 ? TrendingUp : TrendingDown}
          title="Expense Trend"
          value={`${expChange > 0 ? '↑' : '↓'} ${Math.abs(expChange)}% vs last month`}
          sub={expChange > 0 ? 'Spending is increasing — review your budget' : 'Great job reducing expenses!'}
          accent={expChange > 0 ? '#e74c3c' : '#27ae60'}
          delay="fade-up-2"
        />
        <InsightCard
          icon={Zap}
          title="Savings Rate"
          value={`${savingsRate}% of income saved`}
          sub={`₹${savings.toLocaleString('en-IN')} net this month`}
          accent="#690375"
          delay="fade-up-3"
        />
      </div>

      {/* Monthly comparison chart */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 fade-up fade-up-4">
        <h3 className="text-white font-semibold mb-1">Monthly Comparison</h3>
        <p className="text-blush/50 text-xs mb-5">Income vs Expenses</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={compareData} barGap={8} margin={{ top: 4, right: 4, bottom: 0, left: -15 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#AE847E', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#AE847E', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income"   fill="#27ae60" radius={[6,6,0,0]} maxBarSize={48} name="Income"   />
            <Bar dataKey="expenses" fill="#CB429F" radius={[6,6,0,0]} maxBarSize={48} name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category spending breakdown */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 fade-up fade-up-5">
        <h3 className="text-white font-semibold mb-1">Category Breakdown</h3>
        <p className="text-blush/50 text-xs mb-5">Expenses by category this month</p>

        {catData.length === 0 ? (
          <div className="py-10 text-center text-blush/40 text-sm">No expense data available</div>
        ) : (
          <div className="space-y-3">
            {catData.map(({ name, value }) => {
              const max = catData[0].value;
              const pct = (value / max) * 100;
              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-blush/60 text-xs w-24 truncate">{name}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: CATEGORY_COLORS[name] || '#AE847E' }}
                    />
                  </div>
                  <span className="text-white font-mono text-xs w-24 text-right">₹{value.toLocaleString('en-IN')}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Narrative insight */}
      <div className="rounded-2xl border border-magenta/30 bg-magenta/5 p-5 fade-up">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-magenta flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-medium mb-1">Monthly Summary</p>
            <p className="text-blush/60 text-sm leading-relaxed">
              {topCat ? `You spent the most on ${topCat[0]} this month (₹${topCat[1].toLocaleString('en-IN')}). ` : ''}
              {expChange > 0
                ? `Your expenses increased by ${expChange}% compared to last month — consider reviewing discretionary spending.`
                : `Great news! Your expenses decreased by ${Math.abs(expChange)}% compared to last month.`}
              {' '}Your savings rate is {savingsRate}%{parseInt(savingsRate) >= 20 ? ' — excellent work! 🎉' : ' — try to target 20% or more.'  }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
