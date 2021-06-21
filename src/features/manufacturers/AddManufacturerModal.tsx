import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { VehicleTypes } from './manufacturerTypes';

interface ModalProps {
  onHide: any;
  show: any;
}

export const AddManufacturerModal: React.FC<ModalProps> = props => {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypes[]>([]);
  const [country, setCountry] = useState('');
  const [mfrCommonName, setMfrCommonName] = useState('');
  const [mfrName, setMfrName] = useState('');
  const [mfrId, setMfrId] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createRequest = {
      country: country,
      mfrCommonName: mfrCommonName,
      mfrName: mfrName,
      mfrId: mfrId,
      vehicleTypes: vehicleTypes,
    };
    const response = await axios.post(`${process.env.REACT_APP_SERVER_API}`, [
      createRequest,
    ]);
    console.log(response.data);
  };

  const addVehicleTypes = () => {
    setVehicleTypes([...vehicleTypes, { isPrimary: false, name: '' }]);
  };

  const removeVehicleType = (index: number) => {
    vehicleTypes.splice(index, 1);
    setVehicleTypes([...vehicleTypes]);
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Modal.Title id='contained-modal-title-vcenter'>
          Add Manufacturers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='country'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type='text'
                    name='country'
                    value={country}
                    required
                    onChange={e => setCountry(e.target.value)}
                    placeholder='Country'
                  />
                </Form.Group>
                <Form.Group controlId='mfrCommonName'>
                  <Form.Label>Manufacturer Common Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='mfrCommonName'
                    value={mfrCommonName}
                    required
                    onChange={e => setMfrCommonName(e.target.value)}
                    placeholder='Manufacturer Common Name'
                  />
                </Form.Group>
                <Form.Group controlId='mfrId'>
                  <Form.Label>Manufacturer ID</Form.Label>
                  <Form.Control
                    type='number'
                    name='mfrId'
                    value={mfrId}
                    required
                    onChange={e => setMfrId(Number(e.target.value))}
                    placeholder='Manufacturer ID'
                  />
                </Form.Group>
                <Form.Group controlId='mfrName'>
                  <Form.Label>Manufacturer Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='mfrName'
                    value={mfrName}
                    required
                    onChange={e => setMfrName(e.target.value)}
                    placeholder='Manufacturer Name'
                  />
                </Form.Group>
                <Form.Group className='d-flex justify-content-end'>
                  <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={addVehicleTypes}
                  >
                    <AddIcon color='primary' />
                    Add Vehicle Types
                  </IconButton>
                </Form.Group>
                {vehicleTypes.map((vehicleType, index) => (
                  <Form.Group
                    controlId='vehicleType'
                    className='mt-3'
                    key={index}
                  >
                    <Form.Group className='d-flex justify-content-end'>
                      <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => removeVehicleType(index)}
                      >
                        <RemoveIcon color='secondary' />
                      </IconButton>
                    </Form.Group>
                    <Form.Check
                      type='checkbox'
                      label='isPrimary?'
                      name='primary'
                      checked={vehicleType.isPrimary}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let vehicleType = [...vehicleTypes];
                        vehicleType[index]['isPrimary'] = e.target.checked;
                        setVehicleTypes(vehicleType);
                      }}
                    />
                    <Form.Label>Vehicle Type Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='name'
                      name='vehicleTypeName'
                      value={vehicleType.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let vehicleType = [...vehicleTypes];
                        vehicleType[index]['name'] = e.target.value;
                        setVehicleTypes(vehicleType);
                      }}
                    />
                  </Form.Group>
                ))}
                <Form.Group className='mt-3'>
                  <Button variant='primary' type='submit'>
                    Create Manufacturers
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='danger'
          onClick={() => {
            setVehicleTypes([]);
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
