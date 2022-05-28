/* __proto__ */
// 1、原型方法,指向构造函数的原型,null以外的对象都有该属性
// 2、Function,Class实例有prototype属性,同时他们也是对象,也有__proto__属性
// 3、普通函数顺着原型链查找,祖上三代必有null,函数原型 => 对象原型 => null

// 普通函数
function a() {}
console.log(a.__proto__)
console.log(a.__proto__.__proto__)
console.log(a.__proto__.__proto__.__proto__)

// 构造函数
function Person() {}
let person = new Person();
console.log(person.__proto__)
console.log(person.__proto__.__proto__)
console.log(person.__proto__.__proto__.__proto__)
