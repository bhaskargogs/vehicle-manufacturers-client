import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { ManufacturersResults } from './manufacturerTypes';

export interface ManufacturersState {
  results: ManufacturersResults[];
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ManufacturersState = {
  results: [],
  error: null,
  status: 'idle',
};

export const manufacturersSlice = createSlice({
  name: 'manufacturers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchManufacturersFromAPI.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(
      fetchManufacturersFromAPI.fulfilled,
      (state, { payload }) => {
        state.results.push(...payload);
        state.status = 'idle';
      }
    );
    builder.addCase(
      fetchManufacturersFromAPI.rejected,
      (state, { payload }) => {
        if (payload) state.error = payload.errorMessage;
        state.status = 'idle';
      }
    );
  },
});

export const fetchManufacturers = (state: RootState) =>
  state.manufacturers.results;

export default manufacturersSlice.reducer;
