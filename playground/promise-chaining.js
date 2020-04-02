require('../src/db/mongoose')
const { User } = require('../src/models/user')

const _id = '5e83dda2110b2931ac8f3994'

// User.findByIdAndUpdate(_id, {age: 24}).then((user) => {
//     console.log(user)

//     return User.countDocuments({age: 24})
// }).then(count => {
//     console.log(count)
// }).catch(e => {
//     console.log(e)
// })

const upDateAgeAnCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

// upDateAgeAnCount(_id, 35).then(count => {
//     console.log(count)
// }).then(e => console.log(e))


