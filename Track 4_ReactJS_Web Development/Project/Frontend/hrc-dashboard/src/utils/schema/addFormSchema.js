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
    type: 'number',
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
    type: 'number',
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
    type: 'number',
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

export { formInputFields, formDateFields };
