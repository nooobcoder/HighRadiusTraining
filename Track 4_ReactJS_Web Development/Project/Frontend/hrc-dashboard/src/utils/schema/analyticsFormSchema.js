const formInputFields = [
  {
    htmlFor: 'invoice_currency',
    label: 'Invoice Currency',
    placeholder: 'Invoice Currency (₹)',
    type: 'text',
    required: true,
  },
];

const formDateFields = [
  {
    htmlFor: 'clear_date_start',
    label: 'Clear Date',
    required: true,
    placeholder: 'Pick a Clear Date',
    type: 'db_date',
  },
  {
    htmlFor: 'clear_date_end',
    label: 'Clear Date (END)',
    required: true,
    placeholder: 'Pick a Clear Date',
    type: 'db_date',
  },
  {
    htmlFor: 'due_in_date_start',
    label: 'Due Date',
    required: true,
    placeholder: 'Pick a Due Date',
    type: 'db_date',
  },
  {
    htmlFor: 'due_in_date_end',
    label: 'Due Date (END)',
    required: true,
    placeholder: 'Pick a Due Date',
    type: 'db_date',
  },
  {
    htmlFor: 'baseline_create_date_start',
    label: 'Baseline Create Date',
    required: true,
    placeholder: 'Pick a Baseline Create Date',
    type: 'db_date',
  },
  {
    htmlFor: 'baseline_create_date_end',
    label: 'Baseline Create Date (END)',
    required: true,
    placeholder: 'Pick a Baseline Create Date',
    type: 'db_date',
  },
];

// Convert '2018-01-01' to Date object
const convertDateToObject = (date) => {
  const dateArray = date.split('-');
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];
  return new Date(year, month - 1, day);
};

const defaultTableSchema = {
  invoice_currency: 'INR',
  clear_date_start: convertDateToObject('2020-06-01'),
  clear_date_end: convertDateToObject('2020-12-31'),
  due_in_date_start: convertDateToObject('2020-06-01'),
  due_in_date_end: convertDateToObject('2020-12-31'),
  baseline_create_date_start: convertDateToObject('2020-06-01'),
  baseline_create_date_end: convertDateToObject('2020-12-31'),
};

export { formInputFields, defaultTableSchema, formDateFields };
