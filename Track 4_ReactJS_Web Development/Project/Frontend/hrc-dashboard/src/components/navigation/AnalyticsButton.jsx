import * as Mantine from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { Check, X, DeviceDesktopAnalytics } from 'tabler-icons-react';
import getAnalyticsData from '../../utils/api/getAnalyticsData';
import preparePieChart from '../../utils/analytics/preparePieChart';

function AnalyticsButton() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Mantine.Button
      className={`w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer transition ease-in-out duration-75 ${
        disabled && 'blur-sm'
      }`}
      leftIcon={<DeviceDesktopAnalytics />}
      disabled={disabled}
      onClick={async () => {
        setDisabled(true);
        const analyticsData = await getAnalyticsData();
        setDisabled(false);
        if (analyticsData.length > 0) {
          showNotification({
            title: 'Alert!',
            message: `The predictions are ready!`,
            color: 'teal',
            autoClose: 10000,
            disallowClose: false,
            icon: <Check size={18} />,
          });

          preparePieChart({ data: analyticsData });
        } else {
          showNotification({
            title: 'Alert!',
            message: 'The server returned error while predicting.',
            color: 'red',
            disallowClose: false,
            icon: <X size={18} />,
          });
        }
      }}
    >
      Analytics
    </Mantine.Button>
  );
}

export default AnalyticsButton;
