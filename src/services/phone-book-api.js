import axios from 'axios';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export async function sungupUser(user) {
  const { data } = await axios.post('/users/signup', user);
  return data;
}
export async function loginUser(user) {
  const { data } = await axios.post('/users/login', user);
  return data;
}
export async function logoutUser() {
  const { data } = await axios.post('/users/logout');
  return data;
}
export async function getCurrentUser() {
  const { data } = await axios.get('/users/current');
  return data;
}

export async function fetchContacts() {
  const { data } = await axios.get(`/contacts`);
  return data;
}
export async function addContact(contact) {
  const { data } = await axios.post('/contacts', contact);
  return data;
}
export async function deleteContact(id) {
  await axios.delete(`/contacts/${id}`);
}
