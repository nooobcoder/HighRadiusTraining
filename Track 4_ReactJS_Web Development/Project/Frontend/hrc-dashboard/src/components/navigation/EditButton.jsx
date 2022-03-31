/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import * as Mantine from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomDrawer from './CustomDrawer';
import EditForm from './Forms/EditForm';

function EditButton() {
  const [opened, setOpened] = useState(false);

  let sl_no = -1;
  let invoice_currency = '';
  let cust_payment_terms = '';

  const selectedIndices = useSelector(({ api }) => api.table?.selectedIndices)?.length;
  sl_no = useSelector(({ api }) => api.table?.selectedIndices[0]) || -1;
  const row = useSelector(({ api }) => api.table?.rows.filter((r) => r.sl_no === sl_no)[0]);
  invoice_currency = row?.invoice_currency || '';
  cust_payment_terms = row?.cust_payment_terms || '';

  console.log(row);
  console.log(selectedIndices);
  return (
    <>
      <CustomDrawer opened={opened} setOpened={setOpened} title="✏️ Edit Record - Drawer">
        <EditForm
          setOpened={setOpened}
          sl_no={sl_no || -1}
          invoice_currency={invoice_currency || ''}
          cust_payment_terms={cust_payment_terms || ''}
        />
      </CustomDrawer>
      <Mantine.Button
        className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer w-auto"
        onClick={() => setOpened(true)}
        disabled={selectedIndices !== 1}
      >
        Edit ✏️
      </Mantine.Button>
    </>
  );
}

export default EditButton;
