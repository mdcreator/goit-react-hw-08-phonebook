import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { contactsSelectors, contactsOperations } from '../../redux/contacts';

import {
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import useTable from '../useTable';
import ActionButton from '../ActionButon';
import ConfirmDialog from '../ConfirmDialog';

const headCells = [
  { id: 'name', label: 'Contact Name' },
  { id: 'number', label: 'Phone Number' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function ContactsList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(contacts, headCells);

  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(contactsOperations.deleteContact(id));
  };

  return (
    <>
      <Typography variant="h4" component="h4">
        {isLoading ? 'Updating...' : 'Contacts list:'}
      </Typography>
      <TblContainer component={Paper}>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>
                <ActionButton
                  color="primary"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete this record?',
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        onDelete(item.id);
                      },
                    });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
