import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { BALANCE_TREND } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-deep border border-violet/30 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-blush/60 text-xs mb-1 font-mono">{label}</p>
      <p className="text-white font-bold text-base font-mono">
        ₹{payload[0].value.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

export default function BalanceTrend() {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 fade-up fade-up-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base">Balance Trend</h3>
          <p className="text-blush/50 text-xs mt-0.5">Last 6 months</p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          +41.2%
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={BALANCE_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#CB429F" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#CB429F" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#AE847E', fontSize: 11, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#AE847E', fontSize: 10, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `₹${v/1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#CB429F"
            strokeWidth={2.5}
            fill="url(#balanceGrad)"
            dot={{ fill: '#CB429F', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#CB429F', stroke: '#2C0E37', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
