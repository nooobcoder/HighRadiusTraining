import * as Mantine from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, X } from 'tabler-icons-react';
import { getTableRows } from '../../app/redux/actions/actions';
import deleteRows from '../../utils/api/handleDeleteRows';

function DeleteButton() {
  const [opened, setOpened] = useState(false);
  const selectedIndicesCount = useSelector(({ api }) => api.table?.selectedIndices)?.length;
  const { selectedIndices } = useSelector(({ api }) => api?.table);
  const [deleteConsent, setDeleteConsent] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('no');

  const actionDispatcher = useDispatch();

  const checkDeleteConsent = () => {
    // Check if inputValue is 'yes' ignoring the case
    if (inputValue?.toLowerCase() === 'yes') {
      setDeleteConsent(true);
    } else setDeleteConsent(false);
  };

  React.useEffect(() => {
    checkDeleteConsent();
  }, [inputValue]);

  const handleDelete = async () => {
    if (selectedIndices?.length > 0) {
      const respData = await deleteRows(selectedIndices);
      console.log(respData);
      if (respData[0].rowsAffected > 0) {
        showNotification({
          title: 'Alert!',
          message: `The selected rows have been deleted!`,
          color: 'teal',
          autoClose: 10000,
          disallowClose: false,
          icon: <Check size={18} />,
        });

        // Refresh the rows state after the submission, for the new data to be reflected
        actionDispatcher(getTableRows({ start: 0, limit: 30 }));
        // Close the drawer
        setOpened(false);
      } else {
        showNotification({
          title: 'Alert!',
          message: 'The form could not be submitted due to some error.',
          color: 'red',
          disallowClose: false,
          icon: <X size={18} />,
        });
      }
    }
  };

  return (
    <>
      <Mantine.Dialog
        className="bg-orange-200 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:drop-shadow-md"
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpened(false);
            handleDelete();
          }}
        >
          <Mantine.Group align="flex-end">
            <Mantine.TextInput
              placeholder="Yes / No"
              style={{ flex: 1 }}
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
            <Mantine.Button
              className={`bg-orange-400 `}
              disabled={!deleteConsent}
              onClick={() => {
                handleDelete();
                setOpened(false);
              }}
            >
              Delete
            </Mantine.Button>
          </Mantine.Group>
        </form>
      </Mantine.Dialog>
      <Mantine.Button
        className={`w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer transition ease-in-out duration-300 ${
          !selectedIndicesCount > 0 && 'blur-sm'
        }`}
        onClick={() => setOpened(true)}
        disabled={!selectedIndicesCount > 0}
      >
        Delete 🗑️
      </Mantine.Button>
    </>
  );
}

export default DeleteButton;
