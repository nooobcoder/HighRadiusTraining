import * as Mantine from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function PredictButton() {
  const [disabled, setDisabled] = useState(true);

  const selection = useSelector(({ api }) => api.table.selectedIndices);

  useEffect(() => setDisabled(!selection?.length > 0), [selection]);
  return (
    <Mantine.Button
      className={`w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer transition ease-in-out duration-75 ${
        disabled && 'blur-sm'
      }`}
      disabled={disabled}
    >
      Predict
    </Mantine.Button>
  );
}

export default PredictButton;
