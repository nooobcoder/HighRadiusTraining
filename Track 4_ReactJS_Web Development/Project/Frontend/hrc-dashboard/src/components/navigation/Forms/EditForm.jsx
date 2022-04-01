/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import * as Mantine from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Check, X } from 'tabler-icons-react';
import { getTableRows } from '../../../app/redux/actions/actions';
import handleSubmitToDatabase from '../../../utils/api/handleEditForm';
import { defaultTableSchema, formInputFields } from '../../../utils/schema/editFormSchema';

function EditForm({ setOpened, sl_no, invoice_currency, cust_payment_terms }) {
  const form = useForm({
    initialValues: {
      invoice_currency,
      cust_payment_terms,
    },
    validate: {},
  });

  const actionDispatcher = useDispatch();

  const handleFormSubmission = async (values) => {
    // Loop through formInputFields
    formInputFields.forEach((field) => {
      const fieldValue = form.getInputProps(field.htmlFor)?.value || '';
      // If fieldValue is null or undefined, store null
      defaultTableSchema[field.htmlFor] = fieldValue;
    });

    try {
      // Submit defaultTableSchema to the database
      /*
        Successful data submission example
        0: {rowsAffected: 1}
        1: {rows: 48583}
        2: {rows: 6}
        3: {rows: 1084}
      */
      const respData = await handleSubmitToDatabase(
        { serialNumber: sl_no, tableName: 'winter_internship' },
        defaultTableSchema,
      );

      if (respData[0].rowsAffected === 1) {
        showNotification({
          title: 'Alert!',
          message: `The form data with sl_no: ${sl_no} has been edited successfully!`,
          color: 'teal',
          autoClose: 10000,
          disallowClose: false,
          icon: <Check size={18} />,
        });

        // Refresh the rows state after the submission, for the new data to be reflected
        actionDispatcher(getTableRows({ start: 0, limit: 30 }));
        // Close the drawer
        setOpened(false);
      } else {
        showNotification({
          title: 'Alert!',
          message: 'The form could not be submitted due to some error.',
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
  const [shouldSubmitBeDisabled, setShouldSubmitBeDisabled] = React.useState(true);

  return (
    <Mantine.Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleFormSubmission(values))}>
        <Mantine.Divider my="sm" variant="dashed" label="Edit Fields" labelPosition="center" />

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
EditForm.propTypes = {
  setOpened: PropTypes.func.isRequired,
  sl_no: PropTypes.number.isRequired,
  invoice_currency: PropTypes.string.isRequired,
  cust_payment_terms: PropTypes.string.isRequired,
};

export default EditForm;
