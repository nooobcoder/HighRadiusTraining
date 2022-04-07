const formInputFields = [
  {
    htmlFor: 'cust_number',
    label: 'Customer Number',
    type: 'select',
    searchable: true,
    data: [{ value: 'null', label: 'null' }],
    placeholder: 'Customer Number',
    required: true,
  },
  {
    htmlFor: 'business_year',
    type: 'number',
    label: 'Business Year',
    placeholder: 'Business Year (YYYY)',
    required: true,
  },
  {
    htmlFor: 'doc_id',
    label: 'Document ID',
    placeholder: 'Document ID',
    required: true,
  },
  {
    htmlFor: 'invoice_id',
    label: 'Invoice ID',
    placeholder: 'N/A',
    required: true,
  },
];

const defaultTableSchema = {
  cust_number: 200792734,
  business_year: 2019,
  doc_id: 1929873765,
  invoice_id: 1929873765,
};

export { formInputFields, defaultTableSchema };
