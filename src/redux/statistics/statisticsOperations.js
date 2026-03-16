import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'api/client';
import {
  demoGetCategories,
  demoGetStatistics,
  shouldUseDemoFallback,
} from 'demo/fallbackApi';
import 'url-search-params-polyfill';

export const getStatistics = createAsyncThunk(
  'statistics/getStatistics',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/transactions/statistics?${query}`);
      return response.data;
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        return demoGetStatistics(query);
      }

      return rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  'statistics/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('transactions/categories');
      return response.data;
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        return demoGetCategories();
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
