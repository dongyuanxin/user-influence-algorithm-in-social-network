/**
 * 返回[start, end]内的随机整数
 * 
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
module.exports.genRandom = function (start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start)
}

/**
 * 将浮点数转化为2进制浮点数
 * 
 * @param {number} num
 * @return {number}
 */
module.exports.float2bit = function (num) {
    return  Math.floor(num * 100) / 100
}