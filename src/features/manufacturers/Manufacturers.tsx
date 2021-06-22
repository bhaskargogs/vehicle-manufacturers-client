import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import CircularSpinner from './CircularSpinner';
import { AddManufacturerModal } from './CreateManufacturerModal';
import { EditManufacturerModal } from './EditManufacturerModal';
import './Manufacturers.css';
import { ManufacturersList, VehicleTypes } from './manufacturerTypes';
import Navigation from './Navigation';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  id: number,
  country: string,
  mfrCommonName: string,
  mfrId: number,
  mfrName: string,
  vehicleTypes: VehicleTypes[]
) {
  return {
    id,
    country,
    mfrCommonName,
    mfrId,
    mfrName,
    vehicleTypes,
  };
}

const deleteManufacturer = async (id: number) => {
  if (window.confirm('Are you sure?')) {
    await axios.delete(`${process.env.REACT_APP_SERVER_API}/${id}`);
  }
};

export const Row = (props: { row: ReturnType<typeof createData> }) => {
  const [editShowModal, setEditShowModal] = useState(false);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let editModalClose = () => setEditShowModal(false);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.country}
        </TableCell>
        <TableCell>{row.mfrCommonName}</TableCell>
        <TableCell align='right'>{row.mfrId}</TableCell>
        <TableCell>{row.mfrName}</TableCell>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              setEditShowModal(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              deleteManufacturer(row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <EditManufacturerModal
            show={editShowModal}
            onHide={editModalClose}
            id={row.id}
            country={row.country}
            mfrcommonname={row.mfrCommonName}
            mfrid={row.mfrId}
            mfrname={row.mfrName}
            vehicletypes={row.vehicleTypes}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Vehicle Types
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>primary</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.vehicleTypes.map((vehicleType, index) => (
                    <TableRow key={index}>
                      <TableCell>{vehicleType.isPrimary.toString()}</TableCell>
                      <TableCell>{vehicleType.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const Manufacturers = () => {
  const [loading, isLoading] = useState(true);
  const [manufacturers, setManufacturers] = useState<ManufacturersList[]>([]);
  const [createShowModal, setCreateShowModal] = useState(false);
  let createModalClose = () => setCreateShowModal(false);
  useEffect(() => {
    const getManufacturers = () => {
      axios.get(`${process.env.REACT_APP_SERVER_API}`).then(response => {
        setManufacturers([...response.data]);
        isLoading(false);
      });
    };
    getManufacturers();
  }, [manufacturers]);

  const manufacturersData = useMemo(() => {
    let computedManufacturers = manufacturers;
    return computedManufacturers;
  }, [manufacturers]);

  return (
    <div className='container'>
      <div className='row mt-5'>
        <h3 className='justify-content-center d-flex manufacturers'>
          Vehicle Manufacturers App
        </h3>
        <Navigation />
      </div>
      <div className='row mt-1 mb-3'>
        <div className='col-md-2'></div>
        <div className='col-md-6'></div>
        <div className='col-md-4'>
          <ButtonToolbar className='justify-content-end'>
            <Button variant='primary' onClick={() => setCreateShowModal(true)}>
              Create Manufacturer
            </Button>
            <AddManufacturerModal
              show={createShowModal}
              onHide={createModalClose}
            />
          </ButtonToolbar>
        </div>
      </div>
      {!loading ? (
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Country</TableCell>
                <TableCell>Common Name</TableCell>
                <TableCell align='right'>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {manufacturersData.map((manufacturer, index) => (
                <Row key={index} row={manufacturer} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularSpinner />
      )}
    </div>
  );
};
