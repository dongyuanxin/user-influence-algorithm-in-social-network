/**
 * 返回[start, end]内的随机整数
 * 
 * @param {start}
 * @param {end}
 * @return {number}
 */
module.exports.genRandom = function (start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start)
}