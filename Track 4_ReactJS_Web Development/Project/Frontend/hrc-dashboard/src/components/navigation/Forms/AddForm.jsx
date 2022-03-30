/* eslint-disable react/jsx-props-no-spreading */

import * as Mantine from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import convertDateToDBFormat from '../../../utils/datefns/convertDate';
import * as addFormSchema from '../../../utils/schema/addFormSchema';
import handleSubmitToDatabase from '../../../utils/api/handleAddForm';

import {
  transformBusinessForSelect,
  transformCustomerForSelect,
} from '../../../utils/transformers';

/* Example: https://mantine.dev/form/use-form/ */
export default function AddForm() {
  const yearRegex = /^(181[2-9]|18[2-9]\d|19\d\d|2\d{3}|30[0-3]\d|304[0-8])$/;
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
      checkConsent: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      businessYear: (value) => (yearRegex.test(value) ? null : 'Invalid Year'),
    },
  });

  const { rows } = useSelector(({ api }) => api.table.meta[0]);
  // eslint-disable-next-line no-unused-vars
  // console.log(form.getInputProps());

  const handleFormSubmission = async (values) => {
    // Loop through formDateFields
    addFormSchema.defaultTableSchema.sl_no = rows + 1;
    addFormSchema.formDateFields.forEach((field) => {
      if (field.type === 'db_date') {
        addFormSchema.defaultTableSchema[field.htmlFor] = convertDateToDBFormat(
          values[field.htmlFor.toString()],
        );
      }
    });
    // Loop through formInputFields
    addFormSchema.formInputFields.forEach((field) => {
      const fieldValue = form.getInputProps(field.htmlFor)?.value || '';
      // If fieldValue is null or undefined, store null
      addFormSchema.defaultTableSchema[field.htmlFor] = fieldValue;
    });
    try {
      // Submit addFormSchema.defaultTableSchema to the database
      /*
        Successful data submission example
        0: {rowsAffected: 1}
        1: {rows: 48583}
        2: {rows: 6}
        3: {rows: 1084}
      */
      const respData = await handleSubmitToDatabase(addFormSchema.defaultTableSchema);
      // TODO: Implement better logic for handling the submission of the form
      console.log(respData);
      if (respData[0].rowsAffected === 1) {
        // Pass
      } else {
        // Pass
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [shouldSubmitBeDisabled, setShouldSubmitBeDisabled] = React.useState(true);

  const businesses = transformBusinessForSelect();
  const customers = transformCustomerForSelect();

  return (
    <Mantine.Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleFormSubmission(values))}>
        <Mantine.ScrollArea style={{ height: 550 }} className="px-5">
          {addFormSchema.formInputFields.map((field) => {
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
              case 'select':
                return (
                  <Mantine.Select
                    key={field.htmlFor}
                    searchable={false}
                    clearable
                    {...field}
                    {...form.getInputProps(field.htmlFor)}
                    maxDropdownHeight={230}
                    data={field.htmlFor === 'cust_number' ? customers : businesses}
                  />
                );
              default:
                return (
                  <Mantine.TextInput
                    key={field.htmlFor}
                    {...field}
                    {...form.getInputProps(field.htmlFor)}
                    radius="md"
                    required={false}
                  />
                );
            }
          })}
          <Mantine.Divider my="sm" variant="dashed" label="Dates" labelPosition="center" />

          {/* Date Fields */}
          {addFormSchema.formDateFields.map((field) => (
            <DatePicker
              key={field.htmlFor}
              placeholder="Pick date"
              required={false}
              {...field}
              {...form.getInputProps(field.htmlFor)}
              allowLevelChange
              firstDayOfWeek="sunday"
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
  );
}
