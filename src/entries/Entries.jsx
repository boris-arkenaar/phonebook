import React from "react";
import { useState, useEffect } from "react";

export default () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const response = await fetch("http://localhost:3000/api/entries");
    const body = await response.json();
    setEntries(body);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return <h1>Entries list ({entries.length})</h1>;
};
