import * as Mantine from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { DeviceDesktopAnalytics } from 'tabler-icons-react';
import CustomDrawer from './CustomDrawer';
import AnalyticsForm from './Forms/AnalyticsForm';

function AnalyticsButton() {
  const [disabled, setDisabled] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => (!opened ? setDisabled(false) : setDisabled(true)), [opened]);

  return (
    <>
      <CustomDrawer opened={opened} setOpened={setOpened} title="Analytics - Drawer">
        <AnalyticsForm setOpened={setOpened} setAnalyticsButtonDisabled={setDisabled} />
      </CustomDrawer>
      <Mantine.Button
        className={`w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer transition ease-in-out duration-75 ${
          disabled && 'blur-sm'
        }`}
        leftIcon={<DeviceDesktopAnalytics />}
        disabled={disabled}
        onClick={async () => {
          setOpened(true);
        }}
      >
        Analytics
      </Mantine.Button>
    </>
  );
}

export default AnalyticsButton;
