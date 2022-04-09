import * as Mantine from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { Check, X, DeviceDesktopAnalytics } from 'tabler-icons-react';
import getAnalyticsData from '../../utils/api/getAnalyticsData';
import preparePieChart from '../../utils/analytics/preparePieChart';
import PieChart from '../analytics/PieChart';

function AnalyticsButton() {
  const [disabled, setDisabled] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [pieChartData, setPieChartData] = useState([{ id: '', label: 'null', value: 0 }]);

  return (
    <>
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
            setPieChartData(preparePieChart({ data: analyticsData }));
            setModalOpened(true); // Open the modal toggling the state of it.
            console.log(pieChartData);
            showNotification({
              title: 'Alert!',
              message: `The analytics data are ready!`,
              color: 'teal',
              autoClose: 10000,
              disallowClose: false,
              icon: <Check size={18} />,
            });
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
      <Mantine.Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Analytics View!"
        size="70%"
      >
        <Mantine.Paper className="h-96 bg-lime-200">
          <PieChart data={pieChartData} />
        </Mantine.Paper>
      </Mantine.Modal>
    </>
  );
}

export default AnalyticsButton;
