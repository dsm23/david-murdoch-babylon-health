import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Query } from "react-apollo";
import { Field } from "react-final-form";
import { Fab } from "@material-ui/core";
// import gql from "graphql-tag";
import { loader } from 'graphql.macro';

import HiddenCheckbox from 'components/hidden-checkbox';

import { intersection } from 'utils';
// import GET_USERS from "./users.gql";

const querySlots = loader('queries/availableSlots.gql');

const Slots = ({ change, values }) => (
  <Query query={querySlots}>
    {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return data && data.slots.filter(obj => intersection(obj.consultantType, values.consultantType).length > 0 
          && intersection(obj.appointmentType, values.appointmentType).length > 0)
            .map(({ time }) => (
                <Field
                name="dateTime"
                type="checkbox"
                value={time}
                key={time}
              >
                {({ input }) => {
                  const isInValues = values && values.dateTime === input.value;
                  return (
                  <>
                    <HiddenCheckbox {...input} />
                    <Fab
                      onClick={() => change(input.name, input.value)}
                      variant="extended"
                      color={isInValues ? 'primary' : 'default'}
                    >
                      {moment(time).format('HH:mm')}
                    </Fab>
                  </>
                )}}
              </Field>
            ))
    }}
  </Query>
);

Slots.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
}

export default Slots;
