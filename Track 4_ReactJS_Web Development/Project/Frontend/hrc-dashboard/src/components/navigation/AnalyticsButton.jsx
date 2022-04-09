import * as Mantine from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { Check, DeviceDesktopAnalytics, X } from 'tabler-icons-react';
import prepareBarChart from '../../utils/analytics/prepareBarChart';
import preparePieChart from '../../utils/analytics/preparePieChart';
import getAnalyticsData from '../../utils/api/getAnalyticsData';
import BarChart from '../analytics/BarChart';
import PieChart from '../analytics/PieChart';

function AnalyticsButton() {
  const [disabled, setDisabled] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [pieChartData, setPieChartData] = useState([{ id: '', label: 'null', value: 0 }]);
  const [barChartData, setBarChartData] = useState([{ id: '', label: 'null', value: 0 }]);
  const [chartToggle, setChartToggle] = useToggle('pie', ['pie', 'bar']);

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
            setBarChartData(prepareBarChart({ data: analyticsData }));
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
        title={<Mantine.Title order={2}>Analytics View</Mantine.Title>}
        size="70%"
      >
        <Mantine.Button
          onClick={() => setChartToggle()}
          color="blue"
          className=" justify-center items-center mb-8 w-1/2 text-center bg-orange-400 hover:bg-orange-300"
        >
          {chartToggle.toUpperCase()}
        </Mantine.Button>
        <Mantine.Paper className="h-96 bg-lime-200">
          {chartToggle === 'pie' && <PieChart data={pieChartData} />}
          {chartToggle === 'bar' && <BarChart data={barChartData} />}
        </Mantine.Paper>
      </Mantine.Modal>
    </>
  );
}

export default AnalyticsButton;
