import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { fetchManufacturers } from './manufacturersSlice';

export const Manufacturers = () => {
  const manufacturers = useAppSelector(fetchManufacturers);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const loadData = () => {
  //     dispatch(fetchManufacturersFromAPI(''));
  //   };
  //   loadData();
  // }, [dispatch]);
  return (
    <div>
      <div>Manufacturers</div>
      {/* {console.log(manufacturers)} */}
    </div>
  );
};
