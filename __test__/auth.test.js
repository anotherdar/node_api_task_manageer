const request = require('supertest')
const app = require('../src/app')

const {User} = require('../src/models/user')

const {setUpDatabase,userOne,userOneID} = require('./fixtures/db')

beforeEach(setUpDatabase)

test('should sign up new user', async () => {
    const response = await request(app).post('/auth/signin').send({
        name: 'Dio',
        email: 'diobrando@mail.com',
        password: 'Red!123%$'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Dio'
        },
        token: user.tokens[0].token
    })
})

test('should not sign up new user whit the same email', async () => {
    await request(app).post('/auth/signin').send(userOne).expect(400)
})

test('should login to the api', async () => {
    const response = await request(app).post('/auth/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
   expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login if the credential are invalid', async() => {
    await request(app).post('/auth/login').send({
        email: 'diobrando@mail.com',
        password: userOne.password
    }).expect(400)
})
test('Should get profile for user', async () => {
    await request(app)
        .get('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/user/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/user/me')
        .send()
        .expect(401)
})

test('should upload avatar image', async () => {
    await request(app).post('/user/me/avatar')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', '__test__/fixtures/profile-pic.jpg' )
            .expect(200)

    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid users fields', async () => {
    await request(app)
        .put('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'John'
        })
        .expect(200)
    
    const user = await User.findById(userOneID)
    expect(user.name).toEqual('John')
})

test ('should not update invalid users fields', async () => {
    await request(app).put('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Boston'
        })
        .expect(400)
})