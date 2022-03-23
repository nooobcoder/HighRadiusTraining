import React from 'react';
import * as Mantine from '@mantine/core';
import PropTypes from 'prop-types';

// Using props destructuring
export default function CustomDrawer({ opened, setOpened, title, children }) {
  return (
    <Mantine.Drawer opened={opened} onClose={() => setOpened(false)} title={title} padding="xl" size="xl">
      {children}
    </Mantine.Drawer>
  );
}

CustomDrawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
