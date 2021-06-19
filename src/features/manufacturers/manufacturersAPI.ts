import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { ManufacturersResults } from './manufacturerTypes';

type FetchManufacturersError = {
  errorMessage: string;
};

function renameKeys(obj: any, newKeys: any) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export const fetchManufacturersFromAPI = createAsyncThunk<
  ManufacturersResults[],
  string,
  { rejectValue: FetchManufacturersError }
>('manufacturers/fetchManufacturersFromAPI', async (value, thunkApi) => {
  const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API}`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      errorMessage: 'Failed to fetch Manufacturers',
    });
  }

  return camelcaseKeys(response.data['Results'], { deep: true });
});
