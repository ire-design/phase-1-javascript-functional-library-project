// Function to handle both arrays and objects
function isArrayOrObject(collection) {
  return Array.isArray(collection) ? collection : Object.values(collection);
}

// Collection Functions (Arrays or Objects)
function myEach(collection, callback) {
  const items = isArrayOrObject(collection);
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
  return collection;
}

function myMap(collection, callback) {
  const items = isArrayOrObject(collection);
  const result = [];
  for (let i = 0; i < items.length; i++) {
    result.push(callback(items[i]));
  }
  return result;
}

function myReduce(collection, callback, acc) {
  const items = isArrayOrObject(collection);
  let accumulator = acc !== undefined ? acc : items[0];
  let startIndex = acc !== undefined ? 0 : 1;
  for (let i = startIndex; i < items.length; i++) {
    accumulator = callback(accumulator, items[i], collection);
  }
  return accumulator;
}

function myFind(collection, predicate) {
  const items = isArrayOrObject(collection);
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i])) {
      return items[i];
    }
  }
  return undefined;
}

function myFilter(collection, predicate) {
  const items = isArrayOrObject(collection);
  const result = [];
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i])) {
      result.push(items[i]);
    }
  }
  return result;
}

function mySize(collection) {
  return isArrayOrObject(collection).length;
}

// Array Functions
function myFirst(array, n) {
  return n === undefined ? array[0] : array.slice(0, n);
}

function myLast(array, n) {
  return n === undefined ? array[array.length - 1] : array.slice(-n);
}

// BONUS: mySortBy
function mySortBy(array, callback) {
  return array.slice().sort((a, b) => {
    const aValue = callback(a);
    const bValue = callback(b);
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });
}

// BONUS: myFlatten
function myFlatten(array, shallow, newArr = []) {
  if (shallow) {
    for (let i = 0; i < array.length; i++) {
      Array.isArray(array[i]) ? newArr.push(...array[i]) : newArr.push(array[i]);
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      Array.isArray(array[i]) ? myFlatten(array[i], false, newArr) : newArr.push(array[i]);
    }
  }
  return newArr;
}

// Object Functions
function myKeys(object) {
  return Object.keys(object);
}

function myValues(object) {
  return Object.values(object);
}

// Test the functions with the provided examples

// myEach
myEach([1, 2, 3], alert);
myEach({one: 1, two: 2, three: 3}, alert);

// myMap
console.log(myMap([1, 2, 3], function(num){ return num * 3; })); // => [3, 6, 9]
console.log(myMap({one: 1, two: 2, three: 3}, function(num){ return num * 3; })); // => [3, 6, 9]

// myReduce
console.log(myReduce([1, 2, 3], function(acc, val, collection) { return acc + val; }, 10)); // => 16
console.log(myReduce({one: 1, two: 2, three: 3}, function(acc, val, collection) { return acc + val; })); // => 6

// myFind
console.log(myFind([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })); // => 2
console.log(myFind({one: 1, three: 3, four: 4, six: 6}, function(num){ return num % 2 == 0; })); // => 4

// myFilter
console.log(myFilter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })); // => [2, 4, 6]
console.log(myFilter({one: 1, three: 3, five: 5}, function(num){ return num % 2 == 0; })); // => []

// mySize
console.log(mySize({one: 1, two: 2, three: 3})); // => 3
console.log(mySize([])); // => 0

// myFirst
console.log(myFirst([5, 4, 3, 2, 1])); // => 5
console.log(myFirst([5, 4, 3, 2, 1], 3)); // => [5, 4, 3]

// myLast
console.log(myLast([5, 4, 3, 2, 1])); // => 1
console.log(myLast([5, 4, 3, 2, 1], 3)); // => [3, 2, 1]

// BONUS: mySortBy
console.log(mySortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num) })); // => [5, 4, 6, 3, 1, 2]
const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(mySortBy(stooges, function(stooge){ return stooge.name })); // => [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]

// BONUS: myFlatten
console.log(myFlatten([1, [2], [3, [[4]]]])); // => [1, 2, 3, 4]
console.log(myFlatten([1, [2], [3, [[4]]]], true)); // => [1, 2, 3, [[4]]]

// Object Functions
console.log(myKeys({one: 1, two: 2, three: 3})); // => ["one", "two", "three"]
console.log(myValues({one: 1, two: 2, three: 3})); // => [1, 2, 3]
