/* eslint-disable no-unused-vars */
import * as Mantine from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import doPrediction from '../../utils/api/doPrediction';
import { setPredictions } from '../../app/redux/slices/apiSlice';

function PredictButton() {
  const [disabled, setDisabled] = useState(true);

  const selection = useSelector(({ api }) => api.table.selectedIndices);
  useEffect(() => setDisabled(!selection?.length > 0), [selection]);

  // Get matching doc_id from rows if rows.sl_no equals to the selectedIndices
  const { rows, selectedIndices } = useSelector(({ api }) => api.table);
  const docId = [];
  selectedIndices.forEach((s, i) => {
    const row = rows.find((r) => r.sl_no === s);
    docId.push(Number(row.doc_id));
  });
  const actionDispatch = useDispatch();

  return (
    <Mantine.Button
      className={`w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer transition ease-in-out duration-75 ${
        disabled && 'blur-sm'
      }`}
      disabled={disabled}
      onClick={async () => {
        const predictions = await doPrediction(docId);
        actionDispatch(setPredictions(predictions));
      }}
    >
      Predict
    </Mantine.Button>
  );
}

export default PredictButton;
