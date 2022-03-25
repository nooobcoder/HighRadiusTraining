/* eslint-disable react/jsx-props-no-spreading */

import * as Mantine from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import convertDateToDBFormat from '../../../utils/datefns/convertDate';
import * as addFormSchema from '../../../utils/schema/addFormSchema';

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
  console.log(rows);
  // eslint-disable-next-line no-unused-vars
  // console.log(form.getInputProps());

  const handleFormSubmission = (values) => {
    console.log(values);
    // Loop through formDateFields
    addFormSchema.defaultTableSchema.sl_no = rows + 1;
    addFormSchema.formDateFields.forEach((field) => {
      if (field.type === 'db_date') {
        addFormSchema.defaultTableSchema[field.htmlFor] = convertDateToDBFormat(
          values[field.htmlFor.toString()],
        );
      }
    });

    console.log(addFormSchema.defaultTableSchema);
  };

  const [shouldSubmitBeDisabled, setShouldSubmitBeDisabled] = React.useState(true);

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
                    {...field}
                    {...form.getInputProps(field.htmlFor)}
                    radius="md"
                    required={false}
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
              {...field}
              {...form.getInputProps(field.htmlFor)}
              allowLevelChange
              required={false}
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
