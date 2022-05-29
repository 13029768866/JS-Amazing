/* getPrototypeOf */
// 获取原型的方法
/*
  Object.getPrototypeOf()
  Reflect.getPrototypeOf()
*/
// null 和 undefined报异常
/*
  Reflect.getPrototypeOf(undefined)
  Reflect.getPrototypeOf(null)
*/

/* setPrototypeOf */
// 设置原型方法
/*
  Object.setPrototypeOf()
  Reflect.setPrototypeOf()
*/
/* isPrototypeOf */
// 查询,一个对象是否在另一个对象的原型链上面
// 左操作数应该是原型

/*
  Object.isPrototypeOf();
  Reflect.isPrototypeOf();
  Function.isPrototypeOf();
  Object.prototype.isPrototypeOf();
*/

console.log(Object.isPrototypeOf({}))
console.log(Reflect.isPrototypeOf({}))
console.log(Function.isPrototypeOf({}))
console.log(Object.prototype.isPrototypeOf({}))