import * as Api from '../../services/phone-book-api';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const data = await Api.sungupUser(user);
      Api.token.set(data.token);
      return data;
    } catch (error) {
      alert('Register fail');
      return rejectWithValue(error);
    }
  },
);

const logIn = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const data = await Api.loginUser(user);
      Api.token.set(data.token);
      return data;
    } catch (error) {
      alert('Login fail');
      return rejectWithValue(error);
    }
  },
);

const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await Api.logoutUser();
      Api.token.unset();
    } catch (error) {
      alert('Logout fail');
      return rejectWithValue(error);
    }
  },
);

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return rejectWithValue();
    }

    Api.token.set(persistedToken);
    try {
      const data = await Api.getCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const clearError = createAction('auth/clearError');

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
  clearError,
};
export default operations;
