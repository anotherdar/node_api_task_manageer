const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')

const {User} = require('../src/models/user')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Dio',
    email: 'jhotharo@mail.com',
    password: 'Red!123%$',
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
   await User.deleteMany({})
   await new User(userOne).save()
})

test('should sign up new user', async () => {
    await request(app).post('/auth/signin').send({
        name: 'Dio',
        email: 'diobrando@mail.com',
        password: 'Red!123%$'
    }).expect(201)
})

test('should not sign up new user whit the same email', async () => {
    await request(app).post('/auth/signin').send(userOne).expect(400)
})

test('should login to the api', async () => {
    await request(app).post('/auth/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
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
    await request(app)
        .delete('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/user/me')
        .send()
        .expect(401)
})
