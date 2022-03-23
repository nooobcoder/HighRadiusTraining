/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import * as Mantine from '@mantine/core';
import { useForm } from '@mantine/hooks';

/* Example: https://mantine.dev/form/use-form/ */
export default function AddForm() {
  const yearRegex = /^(181[2-9]|18[2-9]\d|19\d\d|2\d{3}|30[0-3]\d|304[0-8])$/;
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      businessYear: (value) => (yearRegex.test(value) ? null : 'Invalid Year'),
    },
  });

  // eslint-disable-next-line no-unused-vars
  const formInputFields = [
    {
      htmlFor: 'businessCode',
      label: 'Business Code',
      placeholder: 'YOUR BUSINESS CODE',
      required: true,
    },
    {
      htmlFor: 'customerNumber',
      label: 'Customer Number',
      placeholder: 'CUSTOMER NUMBER',
      required: false,
    },
    {
      htmlFor: 'businessYear',
      label: 'Business Year',
      placeholder: 'BUSINESS YEAR',
      required: false,
    },
  ];

  // console.log(form.getInputProps());

  return (
    <Mantine.Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {formInputFields.map((field) => (
          <Mantine.TextInput
            key={field.htmlFor}
            {...field}
            {...form.getInputProps(field.htmlFor)}
          />
        ))}
        <Mantine.Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <Mantine.Group position="right" mt="md">
          <Mantine.Button type="submit" color="orange" className="bg-orange-400">
            Submit
          </Mantine.Button>
        </Mantine.Group>
      </form>
    </Mantine.Box>
  );
}
