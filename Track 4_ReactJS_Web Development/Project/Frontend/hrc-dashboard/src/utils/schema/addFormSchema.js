const formInputFields = [
  {
    htmlFor: 'business_code',
    label: 'Business Code',
    placeholder: 'YOUR BUSINESS CODE',
    required: true,
  },
  {
    htmlFor: 'cust_number',
    label: 'Customer Number',
    placeholder: 'CUSTOMER NUMBER',
    required: true,
  },
  {
    htmlFor: 'buisness_year',
    type: 'number',
    label: 'Business Year',
    placeholder: 'BUSINESS YEAR',
    required: true,
  },
  {
    htmlFor: 'doc_id',
    label: 'Document ID',
    placeholder: 'DOCUMENT ID',
    required: true,
  },
  {
    htmlFor: 'invoice_currency',
    label: 'Invoice Currency',
    placeholder: 'INR',
    type: 'number',
    required: true,
  },
  {
    htmlFor: 'document_type',
    label: 'Document Type',
    placeholder: 'DOCUMENT TYPE',
    required: true,
  },
  {
    htmlFor: 'posting_id',
    label: 'Posting ID',
    placeholder: 'Posting ID',
    required: true,
  },
  {
    htmlFor: 'total_open_amount',
    label: 'Total Open Amount',
    placeholder: '0',
    type: 'number',
    required: true,
  },
  {
    htmlFor: 'cust_payment_terms',
    label: 'Customer Payment Terms',
    placeholder: '',
    required: true,
  },
  {
    htmlFor: 'invoice_id',
    label: 'Invoice ID',
    placeholder: 'N/A',
    required: true,
  },
];

const formDateFields = [
  {
    htmlFor: 'clear_date',
    label: 'Clear Date',
    required: true,
    placeholder: 'Pick a Clear Date',
    type: 'db_date',
  },
  {
    htmlFor: 'posting_date',
    label: 'Posting Date',
    required: true,
    placeholder: 'Pick a Clear Date',
    type: 'db_date',
  },
  {
    htmlFor: 'document_create_date',
    label: 'Document Create Date',
    required: true,
    placeholder: 'Pick a Document Create Date',
    type: 'db_date',
  },
  {
    htmlFor: 'due_in_date',
    label: 'Due Date',
    required: true,
    placeholder: 'Pick a Due Date',
    type: 'db_date',
  },
  {
    htmlFor: 'baseline_create_date',
    label: 'Baseline Create Date',
    required: true,
    placeholder: 'Pick a Baseline Create Date',
    type: 'db_date',
  },
];

const defaultTableSchema = {
  sl_no: null,
  business_code: 'U999',
  cust_number: 999999999,
  buisness_year: null,
  doc_id: null,
  invoice_currency: null,
  document_type: null,
  posting_id: null,
  total_open_amount: null,
  cust_payment_terms: null,
  invoice_id: null,
  clear_date: null,
  posting_date: null,
  document_create_date: null,
  due_in_date: null,
  baseline_create_date: null,
  document_create_date1: null,
  area_business: null,
  isOpen: null,
  aging_bucket: null,
  is_deleted: null,
};

// eslint-disable-next-line object-curly-newline
export { formInputFields, formDateFields, defaultTableSchema };
