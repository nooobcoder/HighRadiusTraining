import React from 'react';
import * as Mantine from '@mantine/core';

function ExitFullScreen() {
  return (
    <Mantine.Center>
      <Mantine.Text>Exit Fullscreen</Mantine.Text>
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
      </svg>
    </Mantine.Center>
  );
}

export default ExitFullScreen;
