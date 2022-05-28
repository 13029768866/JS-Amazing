function myInstanceOf(instance, constructorFunc) {
  let proto = instance.__proto__;
  let prototype = constructorFunc.prototype;

  while(proto){
    if(proto === prototype) return true;
    proto = proto.__proto__;
  }

  return false;
}

class Parent {};
class Child extends Parent {};
class Grandeson extends Child {};
class LaoWang {};
let grandson = new Grandeson();

console.log(myInstanceOf(grandson, Parent));
console.log(myInstanceOf(grandson, Child));
console.log(myInstanceOf(grandson, Grandeson));
console.log(myInstanceOf(grandson, Object));
console.log(myInstanceOf(grandson, Date));
console.log(myInstanceOf(grandson, LaoWang));
