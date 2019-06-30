import React from 'react'
import { Button, ButtonGroup, Container, Divider, Fab, Typography } from '@material-ui/core';
import { Field, Form } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Mutation } from "react-apollo";
import { loader } from 'graphql.macro';

import './App.scss'

import './constants.scss';

import HiddenCheckbox from 'components/hidden-checkbox';
import NavBar from 'components/nav-bar';
import Users from 'components/users';
import Slots from 'components/slots';

const mutationAppointment = loader('./queries/appointments.gql');

const App = () => (
  <div className="app">
    <NavBar />
    <Container maxWidth="sm">
    <Typography variant="h3">New appointment</Typography>
    <Divider />
    <Users />
      <Typography variant="h3">Appointments</Typography>
      <Mutation mutation={mutationAppointment}>
      {addAppointment => (
        <Form 
        initialValues={{
          userId: 1,
          consultantType: ['gp'],
          appointmentType: ['video']
        }}
          onSubmit={({ userId, dateTime, notes, consultantType}) => addAppointment({
          variables: {
            input: {
              userId,
              dateTime,
              notes,
              type: `${consultantType} appointment`,
            }
          }
          })}>
          {({ form: { change }, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Typography variant="h5">Consultant Type</Typography>
              {['GP', 'Therapist', 'Physio', 'Specialist'].map(consultantType => (
                <Field
                  name="consultantType"
                  type="checkbox"
                  value={consultantType.toLowerCase()}
                  key={consultantType}
                >
                  {({ input }) => {
                    const isInValues = values[input.name].includes(input.value);
                    return (
                    <>
                      <HiddenCheckbox {...input} />
                      <Fab
                        onClick={() => change(input.name, [input.value])}
                        variant="extended"
                        color={isInValues ? 'primary' : 'default'}
                      >
                        {consultantType}
                      </Fab>
                    </>
                  )}}
                </Field>  
              ))}
              <Typography variant="h5">Appointment Type</Typography>
              {['Video', 'Audio'].map(appointmentType => (
                <Field
                  name="appointmentType"
                  type="checkbox"
                  value={appointmentType.toLowerCase()}
                  key={appointmentType}
                >
                  {({ input }) => {
                    const isInValues = values[input.name].includes(input.value);

                    const rest = values[input.name].filter(elem => elem !== input.value);
                    return (
                    <>
                      <HiddenCheckbox {...input} />
                      <Fab
                        onClick={() => change(input.name, isInValues ? rest : [...values[input.name], input.value])}
                        variant="extended"
                        color={isInValues ? 'primary' : 'default'}
                      >
                        {appointmentType}
                      </Fab>
                    </>
                  )}}
                </Field>  
              ))}
              <Typography variant="h5">Date {'&'} Time</Typography>
              <Slots change={change} values={values}/>
              <Typography variant="h5">Notes</Typography>
              <Field
                name="notes"
                type="text"
                component={TextField}
                label="Notes"
                margin="normal"
                fullWidth
                variant="outlined"
                rows="4"
                multiline
            />
            <Divider />
            <ButtonGroup fullWidth color="primary" variant="contained" size="large" aria-label="submit button">
              <Button type="submit">Book</Button>
            </ButtonGroup>
              {process.env.NODE_ENV === 'development' && <pre>{JSON.stringify(values, null, 2)}</pre>}
            </form>
          )}
          </Form>
      )}
      </Mutation>
    </Container>
  </div>
);

export default App
