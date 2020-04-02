require('../src/db/mongoose')
const { Task } = require('../src/models/task')

const _id = '5e84d38c12eb3017e01f9397'

// Task.findByIdAndDelete(_id).then(task => {
//     console.log(task)

//     return Task.countDocuments({completed: false})
// }).then(tasks => {
//     console.log(tasks)
// })
const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount(_id).then(count => {
    console.log(count + ' tasks to complete')
}).then(e => console.log('e: ' + e))