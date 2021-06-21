import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CircularSpinner from './CircularSpinner';
import { fetchManufacturersFromAPI } from './manufacturersAPI';
import { fetchManufacturers } from './manufacturersSlice';

export const Loader = () => {
  const [snackBarOpen, isSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('');
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
    axios
      .post(`${process.env.REACT_APP_SERVER_API}`, manufacturers)
      .then(response => {
        if (response.data === 'Successfully Loaded Manufacturers') {
          isSnackBarOpen(true);
          setSnackBarMsg(response.data);
          setTimeout(() => history.push('/manufacturers'), 2000);
        }
      })
      .catch(error => {
        isSnackBarOpen(true);
        setSnackBarMsg('Failed to load Manufacturers');
      });
  };

  const snackBarClose = (event: any) => {
    isSnackBarOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={snackBarClose}
        message={<span id='message-id'>{snackBarMsg}</span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={snackBarClose}
          >
            x
          </IconButton>,
        ]}
      />
      <div className='container'>
        <div className='d-flex justify-content-center'>Manufacturers</div>
        <div className='d-flex justify-content-center'>
          {manufacturers ? (
            <button onClick={loadData}>Load Data</button>
          ) : (
            <CircularSpinner />
          )}
        </div>
      </div>
    </>
  );
};
