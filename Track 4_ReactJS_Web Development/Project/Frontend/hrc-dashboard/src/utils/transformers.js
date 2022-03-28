import { useSelector } from 'react-redux';

/*
  Transform the businesses for select
  Default:
  {
        "business_name": "Unilever",
        "business_code": "CA02"
  },

  Converted:
  {
        "label": "Unilever",
        "value": "CA02"
  },
*/
const transformBusinessForSelect = () => {
  const businesses = useSelector(({ api }) => api.table.businesses);
  return businesses.map((business) => ({
    label: `${business.business_name} - ${business.business_code}`,
    value: `${business.business_code}`,
  }));
};

/*
  Transform the customers for select
  Default:
  {
        "cust_number": 100000048,
        "name_customer": "R&G  in"
  },

  Converted:
  {
        "label": "Unilever",
        "value": "CA02"
  },
*/
const transformCustomerForSelect = () => {
  const customers = useSelector(({ api }) => api.table.customers);
  return customers.map((customer) => ({
    label: `${customer.name_customer} - ${customer.cust_number}`,
    value: `${customer.cust_number}`,
  }));
};

export { transformBusinessForSelect, transformCustomerForSelect };
