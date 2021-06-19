/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { fetchManufacturers, loadManufacturers } from './manufacturersSlice';

export const Manufacturers = () => {
  // const [manufacturers, setManufacturers] = useState([]);
  const manufacturers = useAppSelector(fetchManufacturers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = () => {
      dispatch(fetchManufacturersFromAPI(''));
    };
    loadData();
  }, []);
  return (
    <div>
      <div>Manufacturers</div>
      {manufacturers ? (
        <button onClick={() => dispatch(loadManufacturers(manufacturers))}>
          Load Data
        </button>
      ) : (
        <p>Hello </p>
      )}
      {/* {console.log(`${process.env.REACT_APP_SERVER_API}`)} */}
    </div>
  );
};
