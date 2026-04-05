import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'fintrack_transactions';

export function AppProvider({ children }) {
  const [role, setRole] = useState('admin'); // 'admin' | 'viewer'
  const [darkMode, setDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Transactions with localStorage persistence
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch { return INITIAL_TRANSACTIONS; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Dark mode class on html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Filters
  const [filters, setFilters] = useState({ type: 'all', category: 'all', search: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'date', dir: 'desc' });

  const addTransaction = useCallback((tx) => {
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev]);
  }, []);

  const editTransaction = useCallback((id, updated) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  // Derived data helpers
  const currentMonth = new Date().getMonth() + 1;
  const currentYear  = new Date().getFullYear();

  // For demo purposes, treat April 2024 as "current month"
  const DEMO_MONTH = 4;
  const DEMO_YEAR  = 2024;

  const currentTxs = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() + 1 === DEMO_MONTH && d.getFullYear() === DEMO_YEAR;
  });
  const prevTxs = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() + 1 === DEMO_MONTH - 1 && d.getFullYear() === DEMO_YEAR;
  });

  const sum = (arr, type) => arr.filter(t => t.type === type).reduce((s, t) => s + t.amount, 0);

  const stats = {
    currentIncome:   sum(currentTxs, 'income'),
    currentExpenses: sum(currentTxs, 'expense'),
    prevIncome:      sum(prevTxs, 'income'),
    prevExpenses:    sum(prevTxs, 'expense'),
    balance:         sum(transactions, 'income') - sum(transactions, 'expense'),
  };

  const pct = (curr, prev) => prev === 0 ? 100 : Math.round(((curr - prev) / prev) * 100);

  stats.incomeChange   = pct(stats.currentIncome,   stats.prevIncome);
  stats.expenseChange  = pct(stats.currentExpenses, stats.prevExpenses);

  const value = {
    role, setRole,
    darkMode, setDarkMode,
    activePage, setActivePage,
    sidebarOpen, setSidebarOpen,
    transactions, addTransaction, editTransaction, deleteTransaction,
    filters, setFilters,
    sortConfig, setSortConfig,
    stats,
    currentTxs, prevTxs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
