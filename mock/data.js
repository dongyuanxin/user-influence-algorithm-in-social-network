const { getNode } = require('../init/node')
 
const node1 = getNode(1, [0, 0, 0.3, 1, 1])
const node2 = getNode(2, [1, 1, 0, 1, 0.5])
const node3 = getNode(3, [1, 0, 0.3, 0, 1])
const node4 = getNode(4, [1, 1, 0.5, 0, 0])

node1.neighbors = [
    {
        ref: node2,
        tie: 0.6
    },
    {
        ref: node3,
        tie: 1
    },
    {
        ref: node4,
        tie: 0.8
    }
]

node2.neighbors = [
    {
        ref: node1,
        tie: 0.6
    },
    {
        ref: node4,
        tie: 1
    }
]

node3.neighbors = [
    {
        ref: node1,
        tie: 1
    },
    {
        ref: node4,
        tie: 0.5
    }
]

node4.neighbors = [
    {
        ref: node1,
        tie: 0.8
    },
    {
        ref: node2,
        tie: 1
    },
    {
        ref: node3,
        tie: 0.5
    }
]



module.exports = [
    node1,
    node2,
    node3,
    node4
]