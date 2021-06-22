import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { Row } from './Manufacturers';
import Navigation from './Navigation';

const SearchManufacturers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [manufacturers, setManufacturers] = useState([]);

  const onInputChange = async (value: any) => {
    setSearch(value);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/search`,
      {
        params: {
          searchParam: value,
        },
      }
    );
    setManufacturers(response.data);
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = '')
    );
    setSearch('');
  };

  return (
    <div className='container'>
      <div className='row mt-5'>
        <h3 className='justify-content-center d-flex manufacturers'>
          Vehicle Manufacturers App
        </h3>
        <Navigation />
      </div>
      <div className='row mt-5'>
        <div className='col-md-3'></div>
        <Accordion className='col-md-5'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Search Manufacturers</Typography>
          </AccordionSummary>
          <AccordionDetails className='mb-3 row'>
            <TextField
              id='standard-basic'
              label='Search'
              className='form-control col-md-8'
              style={{ width: '240px' }}
              placeholder='Search'
              value={search}
              onChange={e => onInputChange(e.target.value)}
            />
            <ButtonToolbar className='mt-3 col-md-3'>
              <Button variant='dark' onClick={handleReset}>
                Reset
              </Button>
            </ButtonToolbar>
          </AccordionDetails>
        </Accordion>
      </div>
      {console.log(manufacturers)}
      {manufacturers !== null ? (
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
              {manufacturers.map((manufacturer, index) => (
                <Row key={index} row={manufacturer} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};
export default SearchManufacturers;
