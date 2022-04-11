/* eslint-disable react/jsx-props-no-spreading */
import * as Mantine from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, useToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Check, Calendar, X } from 'tabler-icons-react';

import convertDateToDBFormat from '../../../utils/datefns/convertDate';
import BarChart from '../../analytics/BarChart';
import PieChart from '../../analytics/PieChart';
import {
  defaultTableSchema,
  formInputFields,
  formDateFields,
} from '../../../utils/schema/analyticsFormSchema';
import prepareBarChart from '../../../utils/analytics/prepareBarChart';
import preparePieChart from '../../../utils/analytics/preparePieChart';
import getAnalyticsData from '../../../utils/api/getAnalyticsData';

function AnalyticsForm({ setOpened, setAnalyticsButtonDisabled }) {
  // Copy defaultTableSchema to a variable
  const tableSchema = { ...defaultTableSchema };

  const form = useForm({
    initialValues: { ...defaultTableSchema },
    validate: {},
  });

  const [modalOpened, setModalOpened] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [pieChartData, setPieChartData] = useState([{ id: '', label: 'null', value: 0 }]);
  const [barChartData, setBarChartData] = useState([{ id: '', label: 'null', value: 0 }]);
  const [chartToggle, setChartToggle] = useToggle('pie', ['pie', 'bar']);

  const [shouldSubmitBeDisabled, setShouldSubmitBeDisabled] = React.useState(true);

  const handleFormSubmission = async (values) => {
    // Loop through formInputFields
    formInputFields.forEach((field) => {
      const fieldValue = form.getInputProps(field.htmlFor)?.value || '';
      // If fieldValue is null or undefined, store null
      tableSchema[field.htmlFor] = fieldValue;
    });

    // Loop through formDateFields
    formDateFields.forEach((field) => {
      if (field.type === 'db_date') {
        tableSchema[field.htmlFor] = convertDateToDBFormat(values[field.htmlFor.toString()]);
      }
    });

    try {
      // Submit tableSchema to the database
      /*
                    Successful data submission example
                    0: {rowsAffected: 1}
                    1: {rows: 48583}
                    2: {rows: 6}
                    3: {rows: 1084}
                  */

      const payload = {
        clear_date: [tableSchema.clear_date_start, tableSchema.clear_date_end],
        due_in_date: [tableSchema.due_in_date_start, tableSchema.due_in_date_end],
        baseline_create_date: [
          tableSchema.baseline_create_date_start,
          tableSchema.baseline_create_date_end,
        ],
        invoice_currency: tableSchema.invoice_currency,
      };

      // Enable the submit button
      setShouldSubmitBeDisabled(true);
      setShouldLoad(true);
      const analyticsData = await getAnalyticsData(payload);
      // Disable the submit button
      setShouldSubmitBeDisabled(false);
      setShouldLoad(false);

      if (analyticsData.length > 0) {
        setPieChartData(preparePieChart({ data: analyticsData }));
        setBarChartData(prepareBarChart({ data: analyticsData }));
        setModalOpened(true); // Open the modal toggling the state of it.

        setAnalyticsButtonDisabled(false);
        showNotification({
          title: 'Alert!',
          message: `The analytics data are ready!`,
          color: 'teal',
          autoClose: 10000,
          disallowClose: false,
          icon: <Check size={18} />,
        });
      } else {
        setAnalyticsButtonDisabled(false);
        showNotification({
          title: 'Alert!',
          message: 'The server returned error.',
          color: 'red',
          disallowClose: false,
          icon: <X size={18} />,
        });
      }
    } catch (e) {
      console.error(e);
      showNotification({
        title: 'Alert!',
        message: e.message,
        color: 'red',
        disallowClose: false,
        icon: <X size={18} />,
      });
    }
  };

  return (
    <>
      <Mantine.Box sx={{ maxWidth: 300 }} mx="auto">
        <Mantine.LoadingOverlay visible={shouldLoad} />
        <form onSubmit={form.onSubmit((values) => handleFormSubmission(values))}>
          <Mantine.Divider my="sm" variant="dashed" label="Get Insights" labelPosition="center" />

          <Mantine.ScrollArea style={{ height: 550 }} className="px-5">
            {formInputFields.map((field) => {
              switch (field.type) {
                case 'number':
                  return (
                    <Mantine.NumberInput
                      key={field.htmlFor}
                      required={false}
                      {...field}
                      {...form.getInputProps(field.htmlFor)}
                      radius="md"
                    />
                  );
                default:
                  return (
                    <Mantine.TextInput
                      key={field.htmlFor}
                      required={false}
                      {...field}
                      {...form.getInputProps(field.htmlFor)}
                      radius="md"
                    />
                  );
              }
            })}

            {/* Date Fields */}
            {formDateFields.map((field) => (
              <DatePicker
                key={field.htmlFor}
                placeholder="Pick date"
                required={false}
                icon={<Calendar size={16} />}
                {...field}
                {...form.getInputProps(field.htmlFor)}
                allowLevelChange
                firstDayOfWeek="sunday"
                allowFreeInput
                dateParser={(dateString) => new Date(Date.parse(dateString))}
              />
            ))}

            <Mantine.Checkbox
              mt="md"
              label="I agree to the truthness of the above data."
              color="orange"
              key="checkConsent"
              htmlFor="checkConsent"
              onClick={() => setShouldSubmitBeDisabled(!shouldSubmitBeDisabled)}
              {...form.getInputProps('checkConsent', { type: 'checkbox' })}
            />
            <Mantine.Group position="right" mt="md">
              <Mantine.Button
                type="submit"
                color="orange"
                className="bg-orange-400"
                disabled={shouldSubmitBeDisabled}
              >
                Submit
              </Mantine.Button>
            </Mantine.Group>
          </Mantine.ScrollArea>
        </form>
      </Mantine.Box>
      <Mantine.Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setOpened(false); // Close the drawer
        }}
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

// Props Validation
AnalyticsForm.propTypes = {
  setOpened: PropTypes.func.isRequired,
  setAnalyticsButtonDisabled: PropTypes.func.isRequired,
};

export default AnalyticsForm;
