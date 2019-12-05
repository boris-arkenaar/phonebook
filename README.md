# Phonebook

## Entries

The application handles a set of entries, that contain a first name, last name, and a telephone number.

The entries should be validated, so that it's not possible to enter an empty first or last name; and the phone number should be of the form

> +39 02 1234567

That is a "+" followed by a nonempty group of digits, a space, a nonempty group of digits, a space, a group of digits with at least 6 digits.

The application consists of the following pages:

- Home page
  - Contains a text field that allows to search through all the entries by name or number. When I enter text in the field, the page will be reloaded with a table containing all the entries that match the text I entered.
  - The page contains a link to the "add new entry" page.
  - When an entry is displayed, it contains a link to the "edit this entry" page.
- Add new entry page
  - Contains a form for entering a new entry.
- Edit entry page
  - Contains a form for modifying an existing entry.

## General requirements

- You have to use **.Net** or **NodeJs** at backend side.
- You have to use **AngularJS** ot **ReactJS** at frontend side.
- You can use the persistance layer that you prefer (MongoDB, MySQL, PostgreSQL, etc.).
- You should commit your code on **GitHub** or any other SCM repository you prefer (e.g. bitbucket, gitlab, etc) and send us the link.
- You should release your work with an OSI-approved open-source **license** of your choice.
- You should deliver the sources of your application, with **a README** that explains how to compile and run it.

**IMPORTANT:** Implement the requirements focusing on **writing the best code** you can produce.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See deployment for notes on
how to deploy the project on a live system.

### Prerequisites

Minimal requirements to set up the project:

- [Node.js](https://nodejs.org/en) v10, installation instructions can be found
  on the official website, a recommended installation option is to use
  [Node Version Manager](https://github.com/creationix/nvm#readme). It can be
  installed in a
  [few commands](https://nodejs.org/en/download/package-manager/#nvm).
- A package manager like [Yarn](https://yarnpkg.com) or
  [NPM](https://www.npmjs.com). All instructions in the documentation will
  follow the Yarn syntax.
- Optionally a [Git](https://git-scm.com) client.
- It is already linked to a MongoDB in the cloud, so no need to set up.

### Installing

Start by cloning the repository:

```bash
git clone git@github.com:boris-arkenaar/phonebook.git
```

In case you don't have a git client, you can get the latest version directly by
using [this link](https://github.com/ridedott/portal/archive/master.zip) and
extracting the downloaded archive.

Go the the right directory and install dependencies:

```bash
cd phonebook
yarn
```

That's it! You can now go to the next step.

### Run

To run the web app in a development server:

```bash
npm run dev
```

You can now open the app in your browser at
[localhost:3000](http://localhost:3000).

### Linting

This project uses Eslint.
You can use one of the following scripts to validate and optionally fix all of
the files:

```bash
npm run lint
npm run lint -- --fix
```
