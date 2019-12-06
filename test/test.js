const sip = require('../index');

let array = [2, 5, 36, 'awdawd', 3, 6, 'y', 9, 2, 35, 111];
let obj = { one: 'first', key: 'door', hi: 'hello' };
let map = new Map([
    [3, 'ok'],
    ['test', 'hahaha'],
    [45, 'works'],
    [222, 'ez'],
    ['gg', 'a']]
);

console.log(`
// **************************************
// *                                    *
// *         Beginning of test          *
// *                                    *
// **************************************
- Pages
${ new sip(array).pages} 
_____________________
______ Array ________
_____________________

${ JSON.stringify(array)}

- size test ${ JSON.stringify(new sip(array, 2).ArrayPages())}
_____ArrayPages______

${ JSON.stringify(new sip(array).ArrayPages())}
_____ObjectPages_____

${ JSON.stringify(new sip(array).ObjectPages())}
- keyTemplate ${ JSON.stringify(new sip(array).ObjectPages({ keyTemplate: '> {number}' }))}
- keySchema ${ JSON.stringify(new sip(array).ObjectPages({ keySchema: ['one', 'two'] }))}

____ MapPages ______
Map()
- keyTemplate Map()
- keySchema Map()
`);

console.log(new sip(array).MapPages());
console.log(new sip(array).MapPages({ keyTemplate: '#{number}' }));
console.log(new sip(array).MapPages({ keySchema: ['one', 'two'] }));

console.log(`\n\n\n
- Pages
${ new sip(obj).pages} 
_____________________
______ Object ________
_____________________

${ JSON.stringify(obj)}

- size test ${ JSON.stringify(new sip(obj, 2).ArrayPages())}
_____ArrayPages______

${ JSON.stringify(new sip(obj).ArrayPages())}
_____ObjectPages_____

${ JSON.stringify(new sip(obj).ObjectPages())}
- keyTemplate ${ JSON.stringify(new sip(obj).ObjectPages({ keyTemplate: '> {number}' }))}
- keySchema ${ JSON.stringify(new sip(obj, 2).ObjectPages({ keySchema: ['one', 'two'] }))}

____ MapPages ______
Map()
- keyTemplate Map()
- keySchema Map()
`);


console.log(new sip(obj).MapPages());
console.log(new sip(obj).MapPages({ keyTemplate: '#{number}' }));
console.log(new sip(obj, 2).MapPages({ keySchema: ['one', 'two'] }));


console.log(`\n\n\n
- Pages
${ new sip(map).pages} 
_____________________
_______ Map _________
_____________________

${ JSON.stringify(map)}

- size test ${ JSON.stringify(new sip(map, 2).ArrayPages())}
_____ArrayPages______

${ JSON.stringify(new sip(map).ArrayPages())}
_____ObjectPages_____

${ JSON.stringify(new sip(map).ObjectPages())}
- keyTemplate ${ JSON.stringify(new sip(map).ObjectPages({ keyTemplate: '> {number}' }))}
- keySchema ${ JSON.stringify(new sip(map, 3).ObjectPages({ keySchema: ['one', 'two'] }))}

____ MapPages ______
Map()
- keyTemplate Map()
- keySchema Map()
`);

console.log(new sip(map).MapPages());
console.log(new sip(map).MapPages({ keyTemplate: '#{number}' }));
console.log(new sip(map, 3).MapPages({ keySchema: ['one', 'two'] }));