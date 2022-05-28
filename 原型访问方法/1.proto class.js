// 通过babel观察各种属性如何实现的
class Person {
  // 私有属性
  #canTalk = true;
  // 静态属性
  static isAnimal = true;

  constructor (name,age) {
    // 实例属性
    this.name = name;
    this.age = age;
  }
  // 原型属性
  sayName(){
    console.log(this.name)
  }
}