import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  height: '600px',
};

function BarChart({ data }) {
  /* const data = [
    { business: 'Business 1', 'No. of Customers': 10, 'Total Open Amount': 15 },
    { business: 'Business 2', 'No. of Customers': 20, 'Total Open Amount': 22 },
    { business: 'Business 3', 'No. of Customers': 30, 'Total Open Amount': 50 },
    { business: 'Business 4', 'No. of Customers': 40, 'Total Open Amount': 90 },
    { business: 'Business 5', 'No. of Customers': 50, 'Total Open Amount': 42 },
    { business: 'Business 6', 'No. of Customers': 60, 'Total Open Amount': 36 },
  ]; */

  return (
    <div style={styles}>
      <ResponsiveBar
        height={300}
        margin={{ top: 60, right: 60, bottom: 60, left: 80 }}
        data={data}
        enableGridX
        enableGridY
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -35,
          legend: 'Businesses',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Businesses',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        isFocusable
        motionConfig="wobbly"
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Amount',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate
        colors={{ scheme: 'accent' }}
        indexBy="business"
        keys={['No. of Customers', 'Total Open Amount']}
        labelTextColor="inherit:darker(1.4)"
        groupMode="grouped"
      />
    </div>
  );
}

export default BarChart;

// Props validation
BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      business: PropTypes.string.isRequired,
      'No. of Customers': PropTypes.number.isRequired,
      'Total Open Amount': PropTypes.number.isRequired,
    }),
  ).isRequired,
};
