/* eslint-disable react/jsx-props-no-spreading */
import * as Mantine from '@mantine/core';
import { useForm } from '@mantine/hooks';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';
import {
  defaultTableSchema,
  formInputFields,
} from '../../../utils/schema/advancedSearchFormSchema';
import advancedSearch from '../../../utils/api/advancedSearch';
import { setTableRows } from '../../../app/redux/slices/apiSlice';

function AdvancedSearchForm({ setOpened }) {
  const form = useForm({
    initialValues: {
      ...defaultTableSchema,
    },
    validate: {},
  });

  const actionDispatcher = useDispatch();

  const handleFormSubmission = async () => {
    // Loop through formInputFields
    formInputFields.forEach((field) => {
      defaultTableSchema[field.htmlFor] = form.getInputProps(field.htmlFor)?.value || '';
    });

    try {
      /*
                          Successful data submission example
                          0: {rowsAffected: 1}
                          1: {rows: 48583}
                          2: {rows: 6}
                          3: {rows: 1084}
                        */

      formInputFields.forEach((field) => {
        defaultTableSchema[field.htmlFor] = form.getInputProps(field.htmlFor)?.value || '';
      });
      const respData = await advancedSearch(defaultTableSchema);

      if (respData[0].sl_no) {
        showNotification({
          title: 'Alert!',
          message: `The advanced search was successful!`,
          color: 'teal',
          autoClose: 10000,
          disallowClose: false,
          icon: <Check size={18} />,
        });

        // Refresh the rows state after the submission, for the new data to be reflected
        actionDispatcher(setTableRows([respData[0]]));
        // Close the drawer
        setOpened(false);
      } else {
        showNotification({
          title: 'Alert!',
          message: 'The query did not return any data.',
          color: 'red',
          disallowClose: true,
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
  const [shouldSubmitBeDisabled, setShouldSubmitBeDisabled] = React.useState(true);

  return (
    <Mantine.Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(() => handleFormSubmission())}>
        <Mantine.Divider
          my="sm"
          variant="dashed"
          label="Advanced Seach Query"
          labelPosition="center"
        />

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
  );
}

// Props Validation
AdvancedSearchForm.propTypes = {
  setOpened: PropTypes.func.isRequired,
};

export default AdvancedSearchForm;
