import * as Mantine from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Check } from 'tabler-icons-react';

function SuccessNotification({ title = 'Success', message }) {
  return (
    <Mantine.Notification icon={<Check size={18} />} color="teal" title={title}>
      {message}
    </Mantine.Notification>
  );
}

export default SuccessNotification;

// Proptypes validation for SuccessNotification
SuccessNotification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

// Default proptypes for SuccessNotification
SuccessNotification.defaultProps = {
  title: 'Success',
  message: 'The request was successful',
};
