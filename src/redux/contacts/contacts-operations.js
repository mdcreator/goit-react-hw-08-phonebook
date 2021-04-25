import * as Api from '../../services/phone-book-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

const changeFilter = createAction('contacts/changeFilter');
const clearItems = createAction('contacts/clearItems');

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await Api.fetchContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const postContact = createAsyncThunk(
  'contacts/postContact',
  async (data, { rejectWithValue }) => {
    try {
      const postedContact = await Api.addContact(data);
      return postedContact;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const deleteContact = createAsyncThunk(
  'contacts/addContact',
  async (id, { rejectWithValue }) => {
    try {
      await Api.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const operations = {
  fetchContacts,
  postContact,
  deleteContact,
  changeFilter,
  clearItems,
};
export default operations;
