import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TextField } from "@material-ui/core";

export default () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const response = await fetch("http://localhost:3000/api/entries");
    const body = await response.json();
    setEntries(body);
  };
  const postEntry = async (data, resolve) => {
    const response = await fetch("http://localhost:3000/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    setEntries([...entries, body]);
    resolve();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            {
              title: "First name",
              field: "firstName",
              editComponent: props => (
                <TextField
                  error={!props.value}
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
              )
            },
            { title: "Last name", field: "lastName" },
            { title: "Phone number", field: "phoneNumber" }
          ]}
          data={entries}
          title={`Phonebook entries (${entries.length})`}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                const data = {
                  firstName: newData.firstName,
                  lastName: newData.lastName,
                  phoneNumber: newData.phoneNumber
                };
                postEntry(data, resolve);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                reject();
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                resolve();
              })
          }}
        />
      </div>
    </div>
  );
};
