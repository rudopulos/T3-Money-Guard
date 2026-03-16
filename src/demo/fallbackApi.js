const DEMO_STORAGE_KEY = 'mg_demo_storage';

export const DEMO_EMAIL = 'demo@moneyguard.dev';
export const DEMO_PASSWORD = 'Demo12345!';

const baseCategories = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

const now = new Date();
const currentMonthIso = new Date(
  now.getFullYear(),
  now.getMonth(),
  Math.max(1, now.getDate() - 2)
).toISOString();
const previousMonthIso = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  Math.max(1, now.getDate() - 3)
).toISOString();

const defaultStorage = {
  users: [
    {
      id: 'demo-user-1',
      name: 'Demo User',
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    },
  ],
  activeUserId: null,
  activeToken: null,
  categories: baseCategories,
  transactions: [
    {
      _id: 'demo-tx-1',
      type: 'income',
      category: '',
      value: 2400,
      comment: 'Salary',
      date: currentMonthIso,
      createdAt: currentMonthIso,
    },
    {
      _id: 'demo-tx-2',
      type: 'expense',
      category: 'Products',
      value: 120.35,
      comment: 'Groceries',
      date: currentMonthIso,
      createdAt: currentMonthIso,
    },
    {
      _id: 'demo-tx-3',
      type: 'expense',
      category: 'Leisure',
      value: 55,
      comment: 'Cinema',
      date: previousMonthIso,
      createdAt: previousMonthIso,
    },
  ],
};

const toNumber = value => Number.parseFloat(value) || 0;

const createId = prefix =>
  `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

const createDemoError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const getDemoStorage = () => {
  const raw = localStorage.getItem(DEMO_STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(defaultStorage));
    return { ...defaultStorage };
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(defaultStorage));
    return { ...defaultStorage };
  }
};

const setDemoStorage = data => {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
};

export const shouldUseDemoFallback = error => {
  const status = error?.response?.status;
  return !status || status === 404 || status >= 500;
};

export const demoRegister = credentials => {
  const data = getDemoStorage();
  const email = credentials.email.trim().toLowerCase();

  const existingUser = data.users.find(user => user.email === email);
  if (existingUser) {
    throw createDemoError(409, 'Email is already in use');
  }

  const user = {
    id: createId('demo-user'),
    name: credentials.name?.trim() || 'User',
    email,
    password: credentials.password,
  };

  const token = createId('demo-token');

  data.users.push(user);
  data.activeUserId = user.id;
  data.activeToken = token;
  setDemoStorage(data);

  return {
    user: { name: user.name, email: user.email },
    token,
  };
};

export const demoLogin = credentials => {
  const data = getDemoStorage();
  const email = credentials.email.trim().toLowerCase();

  const user = data.users.find(
    item => item.email === email && item.password === credentials.password
  );

  if (!user) {
    throw createDemoError(401, 'Invalid credentials');
  }

  const token = createId('demo-token');
  data.activeUserId = user.id;
  data.activeToken = token;
  setDemoStorage(data);

  return {
    user: { name: user.name, email: user.email },
    token,
  };
};

export const demoRefreshUser = persistedToken => {
  const data = getDemoStorage();
  if (!persistedToken || data.activeToken !== persistedToken) {
    throw createDemoError(401, 'Unauthorized');
  }

  const user = data.users.find(item => item.id === data.activeUserId);
  if (!user) {
    throw createDemoError(401, 'Unauthorized');
  }

  return { name: user.name, email: user.email };
};

export const demoLogout = () => {
  const data = getDemoStorage();
  data.activeUserId = null;
  data.activeToken = null;
  setDemoStorage(data);
};

export const demoFetchTransactions = () => {
  const data = getDemoStorage();
  return data.transactions;
};

export const demoDeleteTransaction = id => {
  const data = getDemoStorage();
  data.transactions = data.transactions.filter(item => item._id !== id);
  setDemoStorage(data);
  return { _id: id };
};

export const demoAddTransaction = payload => {
  const data = getDemoStorage();
  const transactionDate = payload.date ? new Date(payload.date) : new Date();
  const isoDate = transactionDate.toISOString();

  const transaction = {
    _id: createId('demo-tx'),
    type: payload.type,
    category: payload.type === 'income' ? '' : payload.category,
    value: toNumber(payload.value),
    comment: payload.comment,
    date: isoDate,
    createdAt: isoDate,
  };

  data.transactions.push(transaction);
  setDemoStorage(data);

  return transaction;
};

export const demoEditTransaction = ({ id, values }) => {
  const data = getDemoStorage();
  const index = data.transactions.findIndex(item => item._id === id);

  if (index === -1) {
    throw createDemoError(404, 'Transaction not found');
  }

  const existing = data.transactions[index];
  const transactionDate = values.date ? new Date(values.date) : new Date();

  const updated = {
    ...existing,
    ...values,
    category: values.type === 'income' ? '' : values.category,
    value: toNumber(values.value),
    date: transactionDate.toISOString(),
  };

  data.transactions[index] = updated;
  setDemoStorage(data);

  return updated;
};

export const demoGetCategories = () => {
  const data = getDemoStorage();
  return data.categories;
};

export const demoGetStatistics = query => {
  const data = getDemoStorage();
  const params = new URLSearchParams(query);
  const year = Number(params.get('year'));
  const month = Number(params.get('month'));

  const monthTransactions = data.transactions.filter(item => {
    const date = new Date(item.date || item.createdAt);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });

  const totalIncome = monthTransactions
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + toNumber(item.value), 0);

  const totalExpenses = monthTransactions
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + toNumber(item.value), 0);

  const categories = Array.from(
    new Set([
      ...data.categories,
      ...monthTransactions
        .filter(item => item.type === 'expense' && item.category)
        .map(item => item.category),
    ])
  );

  const categoryExpenses = categories.map(name => {
    const total = monthTransactions
      .filter(item => item.type === 'expense' && item.category === name)
      .reduce((sum, item) => sum + toNumber(item.value), 0);

    return {
      name,
      total: total.toFixed(2),
    };
  });

  return {
    categoryExpenses,
    totalIncome,
    totalExpenses,
  };
};
