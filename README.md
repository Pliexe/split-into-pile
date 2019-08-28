# split-into-pile [![Build Status](https://travis-ci.org/Pliexe/split-into-pile.svg?branch=master)](https://travis-ci.org/Pliexe/split-into-pile)

This module splits a array or a object into a specified size of batches!

# Features!

  - Export array/object into array or object batches
  - Get page of the pile with one simple method


to-do:
  - Add sorting


### Installation

```sh
$ npm install split-into-pile
```

### Example
   - Here's a example of using this module
```js
const splitintopile = require('split-into-pile');

let array = [2,5,6,43,4];

let pages = new splitintopile(array, 2);

console.log(pages.ArrayPages()); // Returns [ [ 2, 5 ], [ 6, 43 ], [ 4 ] ]
console.log(pages.ObjectPages()); // Returns { '1': [ 2, 5 ], '2': [ 6, 43 ], '3': [ 4 ] }
```

# Use document
# Using object
```js
const splitintopile = require('split-into-pile');

let obj = {
    one: 'first',
    key: 'door',
    hi: 'hello'
};

let pages = new splitintopile(obj, 2);

console.log(pages.ArrayPages()); // Returns [ { one: 'first', key: 'door' }, { hi: 'hello' } ]

```
# Using array
```js
const splitintopile = require('split-into-pile');

let array = [2,5,6,43,4];

let pages = new splitintopile(array, 2);

console.log(pages.ArrayPages()); // Returns [ [ 2, 5 ], [ 6, 43 ], [ 4 ] ]
```
# Systax
  - Example of using the plugin methods
```js
const splitintopile = require('split-into-pile');

let pages = new splitintopile(obj/array, size);

pages.ArrayPages(); // Returns object/array formated into array page : [[2,4], [3,5]]
pages.ObjectPages({ options }); // Returns object/array formated into object page : {'1':[2,4], '2': [3,5]}
pages.GetPageContent(page); // Gets elements from specified page, (numeric input)
pages.PageExist(page); // Returns a bool if a specified page exists(true) or not(false)
pages.MaxPages; // Returns the amount of pages that are in the array/object
```
# Options for ObjectPages();
  - { keyTemplate: string } - template for generating page keys
```js
pages.ObjectPages({ keyTemplate: '#{number}' }); // Returns {'#1':[2,4], '#2': [3,5]}
```
  - { keySchema: array } - A schema of keys for result !Length of the schema array must be same as length of pages!
```js
pages.ObjectPages({ keySchema: ['hello', 'example'] }); // Returns {'hello':[2,4], 'example': [3,5]}
```
  - keyTemplate and keySchema may not be used together!
