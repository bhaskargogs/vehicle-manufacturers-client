import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../app/store';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { Manufacturers, ManufacturersResults } from './manufacturerTypes';

export interface ManufacturersState {
  results: ManufacturersResults[];
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
  response: string | null;
  data: Manufacturers[];
}

const initialState: ManufacturersState = {
  results: [],
  error: null,
  status: 'idle',
  response: '',
  data: [],
};

const url = `${process.env.REACT_APP_SERVER_API}`;

export const manufacturersSlice = createSlice({
  name: 'manufacturers',
  initialState,
  reducers: {
    findManufacturers: (state, action: PayloadAction<Manufacturers[]>) => {
      state.data.push(...action.payload);
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

export const { findManufacturers } = manufacturersSlice.actions;

export const fetchManufacturers = (state: RootState) =>
  state.manufacturers.results;

export const findAllManufacturers =
  (): AppThunk => async (dispatch, getState) => {
    const response = await axios.get(url);
    dispatch(findManufacturers(response.data));
  };

export default manufacturersSlice.reducer;
