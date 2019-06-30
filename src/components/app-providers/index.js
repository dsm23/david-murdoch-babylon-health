import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
  uri: process.env.REACT_APP_API_ENDPOINT, // this is your API base url
  // credentials: "same-origin"
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const AppProviders = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node,
};

export default AppProviders;
