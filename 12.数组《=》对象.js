
// 数组转对象
// let list = {};
// let arr = ['allen', '85', 'boy'];
// for(let k in arr) {
//   list[k] = arr[k]
// };
// console.log(list);





// 对象转数组
let obj = {'A':5, 'B':8, 'C':4, 'D':6};

let arr = [];
for (let i in obj) {
    let o = {};
    o[i] = obj[i];
    arr.push(o)
};
console.log(arr);

