let obj1 = {
  name: 'allenye',
  age: 21,
  o:0  
};
let obj2 = {
  name: 'allen',
  age: 22
};
let obj3 = {
  name: 'allenallen',
  age: 21,
};

// 合并对象
let o = Object.assign(obj1, obj2, obj3);

console.log(o);
