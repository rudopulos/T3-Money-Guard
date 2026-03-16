import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'api/client';
import {
  demoLogin,
  demoLogout,
  demoRefreshUser,
  demoRegister,
  shouldUseDemoFallback,
} from 'demo/fallbackApi';
import { toast } from 'react-toastify';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/register', credentials);
      setAuthHeader(response.data.token);
      if (response.data && response.status === 201) {
        const name = credentials.name;
        toast.success(`Welcome to Money Guard, ${name}!`, {
          autoClose: 1200,
        });
      }
      return response.data;
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        try {
          const response = demoRegister(credentials);
          setAuthHeader(response.token);
          toast.success(`Welcome to Money Guard, ${response.user.name}!`, {
            autoClose: 1200,
          });
          return response;
        } catch (demoError) {
          if (demoError.status === 409) {
            toast.error('Email is already in use!', {
              position: 'top-right',
              autoClose: 1200,
            });
          }
          return rejectWithValue(demoError.message);
        }
      }

      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Email is already in use!', {
            position: 'top-right',
            autoClose: 1200,
          });
          return rejectWithValue(error.message);
        }
      }

      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        try {
          const response = demoLogin(credentials);
          setAuthHeader(response.token);
          return response;
        } catch (demoError) {
          return rejectWithValue(demoError.message);
        }
      }

      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        demoLogout();
        clearAuthHeader();
        return;
      }

      return rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      if (shouldUseDemoFallback(error)) {
        try {
          return demoRefreshUser(persistedToken);
        } catch (demoError) {
          return rejectWithValue(demoError.message);
        }
      }

      return rejectWithValue(error.message);
    }
  }
);
