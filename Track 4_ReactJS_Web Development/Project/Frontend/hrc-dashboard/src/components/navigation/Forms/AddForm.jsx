/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import * as Mantine from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';

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
      required: true,
    },
    {
      htmlFor: 'businessYear',
      label: 'Business Year',
      placeholder: 'BUSINESS YEAR',
      required: true,
    },
    {
      htmlFor: 'documentId',
      label: 'Document ID',
      placeholder: 'DOCUMENT ID',
      required: true,
    },
    {
      htmlFor: 'invoiceCurrency',
      label: 'Invoice Currency',
      placeholder: 'INR',
      required: true,
    },
    {
      htmlFor: 'documentType',
      label: 'Document Type',
      placeholder: 'DOCUMENT TYPE',
      required: true,
    },
    {
      htmlFor: 'postingId',
      label: 'Posting ID',
      placeholder: 'Posting ID',
      required: true,
    },
    {
      htmlFor: 'totalOpenAmount',
      label: 'Total Open Amount',
      placeholder: '0',
      required: true,
    },
    {
      htmlFor: 'customerPaymentTerms',
      label: 'Customer Payment Terms',
      placeholder: '',
      required: true,
    },
    {
      htmlFor: 'invoiceId',
      label: 'Invoice ID',
      placeholder: 'N/A',
      required: true,
    },
  ];

  const formDateFields = [
    { htmlFor: 'clearDate', label: 'Clear Date', required: true, placeholder: 'Pick a Clear Date' },
    {
      htmlFor: 'postingDate',
      label: 'Posting Date',
      required: true,
      placeholder: 'Pick a Clear Date',
    },
    {
      htmlFor: 'documentCreateDate',
      label: 'Document Create Date',
      required: true,
      placeholder: 'Pick a Document Create Date',
    },
    { htmlFor: 'dueDate', label: 'Due Date', required: true, placeholder: 'Pick a Due Date' },
    {
      htmlFor: 'baselineCreateDate',
      label: 'Baseline Create Date',
      required: true,
      placeholder: 'Pick a Baseline Create Date',
    },
  ];

  // console.log(form.getInputProps());

  const [shouldSubmitBeDisabled, setShouldSubmitBeDisabled] = React.useState(true);

  return (
    <Mantine.Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Mantine.ScrollArea style={{ height: 550 }} className="px-5">
          {formInputFields.map((field) => (
            <Mantine.TextInput
              key={field.htmlFor}
              {...field}
              {...form.getInputProps(field.htmlFor)}
              radius="md"
            />
          ))}
          {formDateFields.map((field) => (
            <DatePicker
              key={field.htmlFor}
              placeholder="Pick date"
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
