import React from 'react';
import * as Mantine from '@mantine/core';
import PropTypes from 'prop-types';

// Using props destructuring
export default function CustomDrawer({
  opened,
  setOpened,
  title,
  children,
  closeOnClickOutside = true,
}) {
  return (
    <Mantine.Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      padding="xl"
      size="xl"
      closeOnClickOutside={closeOnClickOutside}
    >
      {children}
    </Mantine.Drawer>
  );
}

CustomDrawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  closeOnClickOutside: PropTypes.bool,
};

// Using default props
CustomDrawer.defaultProps = {
  closeOnClickOutside: true,
};
