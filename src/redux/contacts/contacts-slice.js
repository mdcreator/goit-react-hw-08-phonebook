import { createSlice } from '@reduxjs/toolkit';
import contactsOperations from './contacts-operations';

const initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [contactsOperations.fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.fetchContacts.fulfilled](state, { payload }) {
      state.items = payload;
      state.isLoading = false;
    },
    [contactsOperations.fetchContacts.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [contactsOperations.postContact.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.postContact.fulfilled](state, { payload }) {
      state.items.push(payload);
      state.isLoading = false;
    },
    [contactsOperations.postContact.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [contactsOperations.deleteContact.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.deleteContact.fulfilled](state, { payload }) {
      state.items = state.items.filter(({ id }) => id !== payload);
      state.isLoading = false;
    },
    [contactsOperations.deleteContact.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [contactsOperations.changeFilter](state, { payload }) {
      state.filter = payload;
    },
    [contactsOperations.clearItems](state) {
      state.items = [];
    },
  },
});

export default contactsSlice.reducer;
