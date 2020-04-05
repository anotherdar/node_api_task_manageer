const {isValidToUpdate} = require('../utils/IsValidToUpdate');

test('it should set true if the values it included on the array of options', () => {
    const data = {
        name: 'juan'
    }
    const update = Object.keys(data)
    const options = ['name', 'age', 'email']

    expect(!isValidToUpdate(update, options )).toBe(true)
})