import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isFetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.pending](state) {
      state.isLoading = true;
    },
    [authOperations.register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    [authOperations.register.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [authOperations.logIn.pending](state) {
      state.isLoading = true;
    },
    [authOperations.logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    [authOperations.logIn.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [authOperations.logOut.pending](state) {
      state.isLoading = true;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      state.isLoading = false;
    },
    [authOperations.logOut.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
      state.error = null;
    },
    [authOperations.fetchCurrentUser.rejected](state, { payload }) {
      state.error = payload;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.clearError](state) {
      state.error = null;
    },
  },
});

export default authSlice.reducer;
