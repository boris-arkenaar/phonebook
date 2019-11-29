import React from "react";
import Head from "next/head";
import Entries from "../src/entries";
import fetch from "isomorphic-unfetch";

const Index = ({ entries }) => (
  <div>
    <Head>
      <title>Phonebook</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <h1>Hello World!</h1>
    <Entries data={entries} />
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/entries");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    entries: data
  };
};

export default Index;
