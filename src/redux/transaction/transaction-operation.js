import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createNewTransaction,
  getAllTransactions,
  getTransactionCategories,
} from 'services/apiTransaction';

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const refreshTransactions = createAsyncThunk(
  'transaction/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch transactions');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      const res = await getAllTransactions();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const newTransaction = createAsyncThunk(
  'transaction/createNew',
  async (transferOptions, thunkAPI) => {
    try {
      const res = await createNewTransaction(transferOptions);
      // After successful login, add the token to the HTTP header
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

  export const getCategories = createAsyncThunk(
    'transaction/getCategories',
    async (_, thunkAPI) => {
      try {
        const res = await getTransactionCategories();
        // After successful login, add the token to the HTTP header
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
