import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import MaterialTable from 'material-table';
import { TextField } from '@material-ui/core';

export default ({ data }) => {
  const [entries, setEntries] = useState(data);

  const postEntry = async (data, resolve) => {
    const response = await fetch('http://localhost:3000/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    setEntries([...entries, body]);
    resolve();
  };

  const putEntry = async (data, resolve) => {
    const response = await fetch(
      `http://localhost:3000/api/entries/${data._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    const body = await response.json();
    const newEntries = [...entries];
    const index = newEntries.findIndex((entry) => entry._id === body._id);
    newEntries.splice(index, 1, body);
    setEntries(newEntries);
    resolve();
  };

  const entryProperties = ['firstName', 'lastName', 'phoneNumber'];
  const rePhoneNumber = /^\+\d+ \d+ \d{6,}/;
  const validateOne = (key, value) => (key === 'firstName' && value)
    || (key === 'lastName' && value)
    || (key === 'phoneNumber' && rePhoneNumber.test(value));
  const validate = (values) => entryProperties.every((key) => validateOne(key, values[key]));

  return (
    <div>
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            {
              title: 'First name',
              field: 'firstName',
              editComponent: (editProps) => (
                <TextField
                  error={!editProps.value}
                  value={editProps.value}
                  onChange={(e) => editProps.onChange(e.target.value)}
                />
              )
            },
            {
              title: 'Last name',
              field: 'lastName',
              editComponent: (editProps) => (
                <TextField
                  error={!editProps.value}
                  value={editProps.value}
                  onChange={(e) => editProps.onChange(e.target.value)}
                />
              )
            },
            {
              title: 'Phone number',
              field: 'phoneNumber',
              editComponent: (editProps) => (
                <TextField
                  error={!rePhoneNumber.test(editProps.value)}
                  value={editProps.value}
                  onChange={(e) => editProps.onChange(e.target.value)}
                />
              )
            }
          ]}
          data={entries}
          title={`Phonebook entries (${entries.length})`}
          editable={{
            onRowAdd: (newData) => new Promise((resolve, reject) => {
              if (validate(newData)) {
                postEntry(newData, resolve);
              } else {
                reject();
              }
            }),
            onRowUpdate: (newData) => new Promise((resolve, reject) => {
              if (validate(newData)) {
                putEntry(newData, resolve);
              } else {
                reject();
              }
            }),
            onRowDelete: (oldData) => new Promise((resolve) => {
              resolve();
            })
          }}
        />
      </div>
    </div>
  );
};
