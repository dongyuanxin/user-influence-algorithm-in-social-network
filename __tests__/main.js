const data = require('../mock/data')
const { estimateImportance } = require('../init/importance')
const { estimateDirectAffinity, estimateIndirectAffinity, estimateAffinity } = require('../init/affinity')
const { initWeight } = require('../init/weight')



function main() {
    // console.log(data)

    // console.log(estimateImportance(data[0])) // 0.45999999999999996
    // estimateImportance.clear()

    // console.log(estimateDirectAffinity(data[0], data[3])) // 0.03 * 0.8 = 0.024
    // estimateDirectAffinity.clear()

    // console.log(estimateIndirectAffinity(data[0], data[3])) // 0.35280306121120886
    // console.log(estimateIndirectAffinity(data[0], data[1])) // 0.09797958971132713
    // estimateIndirectAffinity.clear()

    console.log(estimateAffinity(data[0], data[3])) // 0.18840153060560444
    console.log(estimateAffinity(data[0], data[2]))
    console.log(initWeight(data[0]))
    console.log(data.map(initWeight))
}

main()