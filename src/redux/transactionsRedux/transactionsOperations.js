import axios from 'api/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  demoAddTransaction,
  demoDeleteTransaction,
  demoEditTransaction,
  demoFetchTransactions,
  shouldUseDemoFallback,
} from 'demo/fallbackApi';
import { toast } from 'react-toastify';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/transactions');
      const data = response.data;

      localStorage.setItem('transactions', JSON.stringify(data));

      return data;
    } catch (e) {
      if (shouldUseDemoFallback(e)) {
        return demoFetchTransactions();
      }

      return rejectWithValue(e.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'transactions/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/transactions/${id}`);
      return response.data;
    } catch (e) {
      if (shouldUseDemoFallback(e)) {
        return demoDeleteTransaction(id);
      }

      return rejectWithValue(e.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (data, { rejectWithValue }) => {
    try {
      if (data.type === 'income') {
        const incomeData = { ...data };
        delete incomeData.category;
        const response = await axios.post('/transactions', incomeData);
        return response.data;
      } else {
        const response = await axios.post('/transactions', data);
        return response.data;
      }
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        return demoAddTransaction(data);
      }

      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const editItem = createAsyncThunk(
  'transactions/editItem',
  async ({ id, values }, thunkAPI) => {
    try {
      if (values.type === 'income') {
        const changedData = { ...values };
        delete changedData.category;
        const response = await axios.put(`/transactions/${id}`, changedData);
        return response.data;
      } else {
        const response = await axios.put(`/transactions/${id}`, values);
        return response.data;
      }
    } catch (e) {
      if (shouldUseDemoFallback(e)) {
        return demoEditTransaction({ id, values });
      }

      toast.error(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
