# js-laravel-validation2 [![npm version](https://badge.fury.io/js/js-laravel-validation2.svg)](https://badge.fury.io/js/js-laravel-validation2) [![Build Status](https://travis-ci.org/nik-m2/js-laravel-validation2.svg?branch=master)](https://travis-ci.org/nik-m2/js-laravel-validation2)

Useful for having consistent server side and client side validation with Laravel

All rules are base on documentation from https://laravel.com/docs/9.x/validation#available-validation-rules

## IMPORTANT NOTE

This package is NOT THE SAME as js-laravel-validation.

That package attempts to validate IN THE STYLE of Laravel.

This package validates with the goal of pushing TO Laravel.

js-laravel-validation returns false on the rule 'numeric' for the value '123' because it is a string.

Therefore, this packages attempts to convert parseable parameter strings into numbers before doing validation.

You MUST however pass a numeric value to compare against.

In this package the string '123' passes the rule 'numeric|gt:0'

## Setup

Install: `npm install js-laravel-validation2`

## Usage

```javascript
  import { validateForm } from "js-laravel-validation2";

  const formData = {
    username: {
      value: "test1",
      validation: "required|string"
    },
    password: {
      value: null,
      validation: "required|string"
    }
  };

  const result = validateForm({ formData });

  if (result.errors) {
    console.log(result.errors); // will be { password: ['required', 'string'] }
  }

```

## Docs

| Function Name  | Description |
| ------------- | ------------- |
| [validateForm(options)](https://github.com/nik-m2/js-laravel-validation2/blob/master/docs/validateForm.md)  | Takes a number of options to validate the form data  |
| [setMessageHandler(rule, createMessage)](https://github.com/nik-m2/js-laravel-validation2/blob/master/docs/setMessageHandler.md)  | Sets or replaces the current message handler for the specified rule |
| [setMessageHandlers(messages)](https://github.com/nik-m2/js-laravel-validation2/blob/master/docs/setMessageHandlers.md)  | Replaces multiple message handers  |

## Missing Rules
- `active_url` 
  - This cannot be supported because JS does not support hostname lookups (dns_get_record in PHP)
  - This could be implemented if there was a reliable way to host a small API to do the lookup
- `date_format`
  - This can be added with something like `return new Date(value).format(params[0]) === value;`
  - Unfortunately that isn't so easy in vanilla js atm
- `exists & unqiue`
   - These are both rules relating to the database

- `not_regex` (to come)
- `regex` (to come)
  - Regex requires extra parsing to remove forward slashes around regex
 
