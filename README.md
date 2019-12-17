

# split-into-pile [Documentation](https://pliexe.github.io/split-into-pile/split-into-pile.pages.html)
![Travis (.org)](https://img.shields.io/travis/Pliexe/split-into-pile?style=for-the-badge)  ![npm](https://img.shields.io/npm/v/split-into-pile?style=for-the-badge) ![NPM](https://img.shields.io/npm/l/split-into-pile?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/split-into-pile?style=for-the-badge)

This module splits a array, object or map into a specified size of batches!

# Features!

  - Export array/object/map into array, object or map batches
  - Get page of the pile with one simple method


to-do:
  - Suggest what to add next at github


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
## Using Object
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
## Using array
```js
const splitintopile = require('split-into-pile');

let array = [2,5,6,43,4];

let pages = new splitintopile(array, 2);

console.log(pages.ArrayPages()); // Returns [ [ 2, 5 ], [ 6, 43 ], [ 4 ] ]
```

## Using Map
```js
const splitintopile = require('split-into-pile');

let map = new Map([[1, 2],['three', 5],['test', 'example']]);

let pages = new splitintopile(map);

console.log(pages.ArrayPages()); // Returns [[ { 1 => 2, 'three'=> 5 }], [ 'test' => 'example' ]]
```

# Syntax
  - Example of using the plugin methods
```js
const splitintopile = require('split-into-pile');

let pages = new splitintopile(obj/array/map, size);

pages.ArrayPages(); // Returns object/array/map formated into array page : [[2,4], [3,5]]
pages.ObjectPages({ options }); // Returns object/array/map formated into object page : {'1':[2,4], '2': [3,5]}
pages.MapPages({ options }); // Returns object/array/map formated into map page : { 1 => [2, 4], 2 => [3, 5] }
pages.GetPageContent(page); // Gets elements from specified page, (numeric input)
pages.PageExist(page); // Returns a bool if a specified page exists(true) or not(false)
pages.MaxPages; // Returns the amount of pages that are in the array/object
```
# Options for ObjectPages() and MapPages();
  - { keyTemplate: string } - template for generating page keys
```js
pages.ObjectPages({ keyTemplate: '#{number}' }); // Returns {'#1':[2,4], '#2': [3,5]}
pages.MapPages({ keyTemplate: '#{number}' }); // Returns {'#1' => [2,4], '#2' => [3,5]}
```
  - { keySchema: array } - A schema of keys for result !Length of the schema array must be same as length of pages!
```js
pages.ObjectPages({ keySchema: ['hello', 'example'] }); // Returns {'hello':[2,4], 'example': [3,5]}
pages.MapPages({ keySchema: ['hello', 'example'] }); // Returns {'hello' => [2,4], 'example' => [3,5]}
```
  - keyTemplate and keySchema may not be used together!
