import React from 'react';
import Head from 'next/head';
import Entries from '../src/entries';
import 'whatwg-fetch';

export default () => (
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
    <Entries />
  </div>
);
