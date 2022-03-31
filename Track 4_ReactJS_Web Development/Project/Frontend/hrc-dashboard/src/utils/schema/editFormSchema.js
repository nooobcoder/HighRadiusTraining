const formInputFields = [
  {
    htmlFor: 'invoice_currency',
    label: 'Invoice Currency',
    placeholder: 'Invoice Currency (₹)',
    type: 'text',
    required: true,
  },
  {
    htmlFor: 'cust_payment_terms',
    label: 'Customer Payment Terms',
    placeholder: '',
    required: true,
  },
];

const defaultTableSchema = {
  invoice_currency: null,
  cust_payment_terms: null,
};

export { formInputFields, defaultTableSchema };
