import React from "react";
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
// import gql from "graphql-tag";
import { loader } from 'graphql.macro';

// import GET_USERS from "./users.gql";

const queryUser = loader('queries/users.gql');

const Users = ({ userId }) => (
    <Query query={queryUser} variables={{ userId }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
  
        return (
          <>
            <img src={data && data.user.avatar} alt="avatar"/>
          </>
        );
      }}
    </Query>
  );

Users.defaultProps = {
    userId: 1,
}

Users.propTypes = {
    userId: PropTypes.number,
}

export default Users;
