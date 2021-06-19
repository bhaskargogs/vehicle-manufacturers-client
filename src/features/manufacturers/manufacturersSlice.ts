import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../app/store';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { ManufacturersResults } from './manufacturerTypes';

export interface ManufacturersState {
  results: ManufacturersResults[];
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
  response: string | null;
}

const initialState: ManufacturersState = {
  results: [],
  error: null,
  status: 'idle',
  response: '',
};

export const manufacturersSlice = createSlice({
  name: 'manufacturers',
  initialState,
  reducers: {
    createManufacturers: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
  },
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

export const { createManufacturers } = manufacturersSlice.actions;

export const fetchManufacturers = (state: RootState) =>
  state.manufacturers.results;

export const loadManufacturers =
  (manufacturerDTOS: ManufacturersResults[]): AppThunk =>
  async (dispatch, getState) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}`,
      manufacturerDTOS
    );
    dispatch(createManufacturers(response.data));
  };

export default manufacturersSlice.reducer;
