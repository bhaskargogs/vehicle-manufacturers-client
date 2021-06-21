import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { fetchManufacturers } from './manufacturersSlice';

export const Loader = () => {
  let history = useHistory();
  const manufacturers = useAppSelector(fetchManufacturers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInitialData = () => {
      dispatch(fetchManufacturersFromAPI(''));
    };
    fetchInitialData();
  }, [dispatch]);

  const loadData = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}`,
      manufacturers
    );
    if (response.data === 'Successfully Loaded Manufacturers') {
      history.push('/manufacturers');
    }
  };

  return (
    <div>
      <div>Manufacturers</div>
      {manufacturers ? (
        <button onClick={loadData}>Load Data</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
