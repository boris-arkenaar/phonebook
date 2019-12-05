import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import MaterialTable from 'material-table';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const Entries = ({ data }) => {
  const [entries, setEntries] = useState(data);

  const postEntry = async (entry, resolve) => {
    const response = await fetch('http://localhost:3000/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });
    const body = await response.json();
    setEntries([...entries, body]);
    resolve();
  };

  const putEntry = async (entry, resolve) => {
    const response = await fetch(
      `http://localhost:3000/api/entries/${entry._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      }
    );
    const body = await response.json();
    const newEntries = [...entries];
    const index = newEntries.findIndex((item) => item._id === body._id);
    newEntries.splice(index, 1, body);
    setEntries(newEntries);
    resolve();
  };

  const deleteEntry = async (entry, resolve) => {
    await fetch(`http://localhost:3000/api/entries/${entry._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const newEntries = [...entries];
    const index = newEntries.findIndex((item) => item._id === entry._id);
    newEntries.splice(index, 1);
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
              deleteEntry(oldData, resolve);
            })
          }}
        />
      </div>
    </div>
  );
};

Entries.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phoneNumber: PropTypes.string
    })
  ).isRequired
};

export default Entries;
