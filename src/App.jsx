import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import SummaryCards from './components/dashboard/SummaryCards';
import BalanceTrend from './components/dashboard/BalanceTrend';
import SpendingBreakdown from './components/dashboard/SpendingBreakdown';
import RecentTransactions from './components/dashboard/RecentTransactions';
import Transactions from './components/transactions/Transactions';
import Insights from './components/insights/Insights';

function Pages() {
  const { activePage } = useApp();
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {activePage === 'dashboard' && (<><SummaryCards /><div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><BalanceTrend /><SpendingBreakdown /></div><RecentTransactions /></>)}
        {activePage === 'transactions' && <Transactions />}
        {activePage === 'insights' && <Insights />}
      </div>
    </main>
  );
}

function Inner() {
  const { darkMode } = useApp();
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-[#1a0a22] text-white overflow-hidden font-body">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar />
          <Pages />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <AppProvider><Inner /></AppProvider>;
}