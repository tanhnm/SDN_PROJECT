import React, { useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';


const initialRows = [
  { id: "1", email: 'john@example.com', fullName: 'John Doe', role: 'Admin', disabled: false },
  { id: "2", email: 'jane@example.com', fullName: 'Jane Doe', role: 'User', disabled: false },
];

const AccountList = () => {
  const [rows, setRows] = useState(initialRows);
  const [disableRow, setDisableRow] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDisable = (row) => {
    setDisableRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisableRow(null);
  };

  const handleConfirmDisable = () => {
    setRows(rows.map((row) => (row.id === disableRow.id ? { ...row, disabled: true } : row)));
    handleClose();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'disabled',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (params.value ? 'Disabled' : 'Active')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<BlockIcon />}
          label="Disable"
          onClick={() => handleDisable(params.row)}
          disabled={params.row.disabled}
        />,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Account Management</h1>
        <div className=" p-4 rounded-md shadow-md">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{ backgroundColor: 'inherit' }}
            />
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Disable Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to disable this account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDisable} color="primary">Disable</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountList;
