import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    display: none;
`;

const HiddenCheckbox = props => (
    <StyledInput type="checkbox" {...props} />
);

export default HiddenCheckbox;
