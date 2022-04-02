import * as Mantine from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function DeleteButton() {
  const [opened, setOpened] = useState(false);
  const selectedIndices = useSelector(({ api }) => api.table?.selectedIndices)?.length;
  const [deleteConsent, setDeleteConsent] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(undefined);

  const checkDeleteConsent = () => {
    // Check if inputValue is 'yes' ignoring the case
    if (inputValue?.toLowerCase() === 'yes') {
      setDeleteConsent(true);
    } else setDeleteConsent(false);
  };

  React.useEffect(() => {
    checkDeleteConsent();
  }, [inputValue]);

  return (
    <>
      <Mantine.Dialog
        className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:drop-shadow-md bg-orange-200"
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size="lg"
        radius="md"
        transition="slide-left"
        transitionDuration={500}
        transitionTimingFunction="ease"
      >
        <Mantine.Group>
          <Mantine.Text style={{ marginBottom: 10 }} weight={500} className="text-red-500">
            Are you sure to delete the selected rows?
          </Mantine.Text>
        </Mantine.Group>

        <Mantine.Group align="flex-end">
          <Mantine.TextInput
            placeholder="Yes / No"
            style={{ flex: 1 }}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <Mantine.Button className="bg-orange-400" disabled={!deleteConsent}>
            Delete
          </Mantine.Button>
        </Mantine.Group>
      </Mantine.Dialog>
      <Mantine.Button
        className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer w-auto"
        onClick={() => setOpened(true)}
        disabled={!selectedIndices > 0}
      >
        Delete 🗑️
      </Mantine.Button>
    </>
  );
}

export default DeleteButton;
