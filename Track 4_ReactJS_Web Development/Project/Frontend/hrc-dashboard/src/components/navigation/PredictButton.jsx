import * as Mantine from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, X } from 'tabler-icons-react';
import { setPredictions } from '../../app/redux/slices/apiSlice';
import doPrediction from '../../utils/api/doPrediction';

function PredictButton() {
  const [disabled, setDisabled] = useState(true);

  const selection = useSelector(({ api }) => api.table.selectedIndices);
  useEffect(() => setDisabled(!selection?.length > 0), [selection]);

  // Get matching doc_id from rows if rows.sl_no equals to the selectedIndices
  const { rows, selectedIndices } = useSelector(({ api }) => api.table);
  const docId = [];
  selectedIndices.forEach((s) => {
    const row = rows.find((r) => r.sl_no === s);
    docId.push(Number(row.doc_id));
  });
  const actionDispatch = useDispatch();

  const onButtonClick = async () => {
    try {
      showNotification({
        id: 'load-prediction', // id is necessary for updating notification
        title: 'Loading!',
        message: `The predictions are loading!`,
        color: 'teal',
        autoClose: 10000,
        disallowClose: false,
        loading: true,
        icon: <Check size={18} />,
      });
      const predictions = await doPrediction(docId);
      actionDispatch(setPredictions(predictions));

      if (predictions.length > 0) {
        updateNotification({
          id: 'load-prediction', // id is necessary for updating notification
          title: 'Alert!',
          message: `The predictions are ready!`,
          color: 'teal',
          autoClose: 10000,
          disallowClose: false,
          loading: false,
          icon: <Check size={18} />,
        });
      }
    } catch (e) {
      showNotification({
        title: 'Alert!',
        message: `The server returned error while predicting. ${e?.message}`,
        color: 'red',
        disallowClose: false,
        loading: false,
        icon: <X size={18} />,
      });
    }
  };

  return (
    <Mantine.Button
      className={`w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer transition ease-in-out duration-75 ${
        disabled && 'blur-sm'
      }`}
      disabled={disabled}
      onClick={onButtonClick}
    >
      Predict
    </Mantine.Button>
  );
}

export default PredictButton;
