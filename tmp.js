const mathjs = require('mathjs')
const arr = [1, 1000, 10, 23]

const mean = mathjs.mean(arr)
const va = mathjs.variance(arr)
const std = mathjs.sqrt(va)

console.log(
    (10 - mean) / std
)

console.log(
    (10 - 1) / (10000 - 1)
)