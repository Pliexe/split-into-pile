const sip = require('../index');

let array = [2,5,36,'awdawd',3,6,'y'];
let obj = { one: 'first', key: 'door', hi: 'hello' };

console.log(array);
console.log(new sip(array, 3).ArrayPages());
console.log(new sip(array, 3).ObjectPages({ keyTemplate: '*{number}' }));

console.log(obj);
console.log(new sip(obj, 2).ArrayPages());
console.log(new sip(obj, 2).ObjectPages({ keySchema: [1, 2] }));
console.log(new sip(obj, 2).ObjectPages({ keyTemplate: '#{number}' }));

console.log(new sip(array, 3).GetPageContent(2));
console.log(new sip(array, 3).PageExist(56));
console.log(new sip(array, 3).MaxPages);