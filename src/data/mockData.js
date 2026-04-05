export const CATEGORIES = ['Food', 'Housing', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Investment'];

export const CATEGORY_COLORS = {
  Food:          '#CB429F',
  Housing:       '#690375',
  Transport:     '#AE847E',
  Entertainment: '#DAA89B',
  Health:        '#9b59b6',
  Shopping:      '#e74c3c',
  Utilities:     '#2C0E37',
  Salary:        '#27ae60',
  Freelance:     '#2980b9',
  Investment:    '#f39c12',
};

function d(y, m, day) {
  return new Date(y, m - 1, day).toISOString().split('T')[0];
}

export const INITIAL_TRANSACTIONS = [
  // March (last month)
  { id: 1,  date: d(2024,3,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 2,  date: d(2024,3,2),  description: 'Rent Payment',          category: 'Housing',       type: 'expense', amount: 22000 },
  { id: 3,  date: d(2024,3,3),  description: 'Grocery Store',         category: 'Food',          type: 'expense', amount: 3200 },
  { id: 4,  date: d(2024,3,5),  description: 'Netflix',               category: 'Entertainment', type: 'expense', amount: 649 },
  { id: 5,  date: d(2024,3,6),  description: 'Uber Rides',            category: 'Transport',     type: 'expense', amount: 1800 },
  { id: 6,  date: d(2024,3,8),  description: 'Freelance Project',     category: 'Freelance',     type: 'income',  amount: 18000 },
  { id: 7,  date: d(2024,3,10), description: 'Restaurant Dinner',     category: 'Food',          type: 'expense', amount: 2100 },
  { id: 8,  date: d(2024,3,12), description: 'Electricity Bill',      category: 'Utilities',     type: 'expense', amount: 1450 },
  { id: 9,  date: d(2024,3,14), description: 'Gym Membership',        category: 'Health',        type: 'expense', amount: 999 },
  { id: 10, date: d(2024,3,15), description: 'Amazon Shopping',       category: 'Shopping',      type: 'expense', amount: 4300 },
  { id: 11, date: d(2024,3,18), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  { id: 12, date: d(2024,3,20), description: 'Petrol',                category: 'Transport',     type: 'expense', amount: 2500 },
  { id: 13, date: d(2024,3,22), description: 'Medical Checkup',       category: 'Health',        type: 'expense', amount: 800 },
  { id: 14, date: d(2024,3,25), description: 'Online Course',         category: 'Entertainment', type: 'expense', amount: 1999 },
  { id: 15, date: d(2024,3,28), description: 'Dividend Income',       category: 'Investment',    type: 'income',  amount: 3200 },
  // April (current month)
  { id: 16, date: d(2024,4,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 17, date: d(2024,4,2),  description: 'Rent Payment',          category: 'Housing',       type: 'expense', amount: 22000 },
  { id: 18, date: d(2024,4,3),  description: 'Zomato Orders',         category: 'Food',          type: 'expense', amount: 2800 },
  { id: 19, date: d(2024,4,4),  description: 'Spotify Premium',       category: 'Entertainment', type: 'expense', amount: 119 },
  { id: 20, date: d(2024,4,5),  description: 'Metro Card Recharge',   category: 'Transport',     type: 'expense', amount: 500 },
  { id: 21, date: d(2024,4,6),  description: 'Freelance Design Work', category: 'Freelance',     type: 'income',  amount: 25000 },
  { id: 22, date: d(2024,4,7),  description: 'Supermarket',           category: 'Food',          type: 'expense', amount: 4100 },
  { id: 23, date: d(2024,4,9),  description: 'Internet Bill',         category: 'Utilities',     type: 'expense', amount: 999 },
  { id: 24, date: d(2024,4,10), description: 'Pharmacy',              category: 'Health',        type: 'expense', amount: 650 },
  { id: 25, date: d(2024,4,11), description: 'Myntra Sale',           category: 'Shopping',      type: 'expense', amount: 5800 },
  { id: 26, date: d(2024,4,13), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  { id: 27, date: d(2024,4,14), description: 'Cab to Airport',        category: 'Transport',     type: 'expense', amount: 1200 },
  { id: 28, date: d(2024,4,16), description: 'Movie Tickets',         category: 'Entertainment', type: 'expense', amount: 900 },
  { id: 29, date: d(2024,4,18), description: 'Coffee Shop',           category: 'Food',          type: 'expense', amount: 480 },
  { id: 30, date: d(2024,4,20), description: 'Water & Gas Bill',      category: 'Utilities',     type: 'expense', amount: 680 },
];

export const BALANCE_TREND = [
  { month: 'Nov', balance: 48000 },
  { month: 'Dec', balance: 62000 },
  { month: 'Jan', balance: 55000 },
  { month: 'Feb', balance: 71000 },
  { month: 'Mar', balance: 85000 },
  { month: 'Apr', balance: 96000 },
];
