import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

function Card({ title, amount, change, icon: Icon, gradient, delay }) {
  const isPositive = change >= 0;
  const isBalance  = change === undefined;

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className={`relative rounded-2xl p-5 overflow-hidden fade-up ${delay} glow-violet bg-white/[0.04] border border-white/10 hover:border-violet/40 transition-all duration-300 group`}>
      {/* Background gradient blob */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl ${gradient}`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <p className="text-blush/60 text-xs font-medium uppercase tracking-widest">{title}</p>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${gradient} bg-opacity-20`}>
            <Icon size={16} className="text-white" />
          </div>
        </div>

        <p className="font-display font-bold text-2xl text-white mb-2 tabular-nums">
          {fmt(amount)}
        </p>

        {!isBalance && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            <span>{Math.abs(change)}% vs last month</span>
          </div>
        )}
        {isBalance && (
          <p className="text-xs text-blush/40">All time balance</p>
        )}
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { stats } = useApp();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card
        title="Total Balance"
        amount={stats.balance}
        icon={Wallet}
        gradient="bg-gradient-to-br from-violet to-magenta"
        delay="fade-up-1"
      />
      <Card
        title="Monthly Income"
        amount={stats.currentIncome}
        change={stats.incomeChange}
        icon={TrendingUp}
        gradient="bg-gradient-to-br from-emerald-600 to-teal-500"
        delay="fade-up-2"
      />
      <Card
        title="Monthly Expenses"
        amount={stats.currentExpenses}
        change={stats.expenseChange}
        icon={TrendingDown}
        gradient="bg-gradient-to-br from-rose-600 to-magenta"
        delay="fade-up-3"
      />
    </div>
  );
}
