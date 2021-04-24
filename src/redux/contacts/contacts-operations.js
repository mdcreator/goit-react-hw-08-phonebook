import * as Api from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
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

export const postContact = createAsyncThunk(
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

export const deleteContact = createAsyncThunk(
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
