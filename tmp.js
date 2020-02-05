// function TreeNode(x) {
//     this.val = x;
//     this.left = null;
//     this.right = null;
// } 
// function FindPath(root, expectNumber)
// {
//     if (!root) {
//         return []
//     }
//     const pathes = []
//     __FindPath(root, expectNumber, pathes, [])
//     return pathes
    
// }

// function __FindPath(root, expectNumber, pathes, path) {
//     if (!root || root.val > expectNumber) {
//         return
//     }

//     path = [...path, root.val]

//     if (!root.left && !root.right && root.val === expectNumber) {
//         pathes.push(path)
//         return
//     }
    
//     __FindPath(root.left, expectNumber - root.val, pathes, path)
//     __FindPath(root.right, expectNumber - root.val, pathes, path)
// }


//////////////////////////////////////

// function FindPath(root, expectNumber)
// {
//     if (!root) {
//         return []
//     }
    
//     const statck = [[root, expectNumber, [root.val]]]
//     const result = []

//     while (statck.length) {
//         const [node, num, path] = statck.pop()

//         if (!node.left && !node.right && node.val === num) {
//             // result.push([...path, node.val])
//             result.push(path)
//         }

//         if (node.left) {
//             statck.push([node.left, num - node.val, [...path, node.left.val]])
//         } 
//         if (node.right) {
//             statck.push([node.right, num - node.val, [...path, node.right.val]])
//         }
//     }

//     return result
// }

// const root = new TreeNode(8)

// root.left = new TreeNode(10)
// root.left.left = new TreeNode(20)
// root.left.right = new TreeNode(3)

// root.right = new TreeNode(20)
// root.right.right = new TreeNode(-7)

// console.log(FindPath(root, 21))

//////////////////////////////////////

// function RandomListNode(x){
//     this.label = x;
//     this.next = null;
//     this.random = null;
// }


// function Clone(pHead)
// {
//     if (!pHead || !pHead.next) {
//         return pHead
//     }
//     const map = new Map()
//     let node = pHead
//     const newHead = new RandomListNode(node.label)
//     let newNode = newHead
//     map.set(node, newNode)

//     while (node.next) {
//         newNode.next = new RandomListNode(node.next.label)
//         node = node.next
//         newNode = newNode.next
//         map.set(node, newNode)
//     }
    
//     newNode = newHead
//     node = pHead
//     while(newNode) {
//         newNode.random = map.get(node.random)
//         newNode = newNode.next 
//         node = node.next
//     }

//     return newHead
// }

// const a = new RandomListNode('a')
// const b = new RandomListNode('b')
// const c = new RandomListNode('c')

// a.next = b
// a.random = c

// b.next = c
// b.random = a

// c.random = a

// const newA = Clone(a)
// console.log(newA)

//////////////////////////////////////

const set = new Set()
set.add(1)
set.add(2)
for (const item of set) {
    console.log(item)
}