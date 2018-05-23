const assert = require('assert');
const User = require('../../src/models/user.model');
const { compare } = require('bcrypt');
describe('Test user model', () =>{

    it('Can sign up with full info', async () => {
        await User.signUp('hung1@gmail.com','123','hung','123456789');
        const userCount = await User.count({ });
        const users = await User.find({ });
        assert.equal(userCount, 1);
        const { email, password, name, phone} = users[0];
        assert.equal(email, 'hung1@gmail.com');
        const same = await compare('123', password);
        assert.equal(same , true);
    });

    it('Cannnot sign up without email', async() => {
        try {
            await User.signUp('','123','hung','12345678');
            throw new Error('Wrong at sign up without  email')
        } catch (err) {
            assert.equal(err.name, 'ValidationError');
        }
    });

   
    it ('Cannot sign up with existed email', async () => {
        await User.signUp('hung2@gmail.com','123','hung2','12345678');
        try {
            await User.signUp('hung2@gmail.com','123','hung1','123456781');
            throw new Error('Wrong at sign up with existed email');
        } catch (error) {
            assert.equal(error.name, 'MongoError');
            assert.equal(error.code, 11000);
        }
    });
});

describe('Test user model sign in', () =>{
    it('Can sign in with email and password', async () => {
        await User.signUp('hung3@gmail.com','123','hung1','1234567890');
        const user = await User.signIn('hung3@gmail.com','123');
        assert.equal(user.name, 'hung1');
    });

    it('Can sign in with wrong email ', async () => {
        await User.signUp('hung3@gmail.com','123','hung1','1234567890');
        try {
            await User.signIn('sai@gmail.com','123');
            throw new Error('Wrong at Sign in with wrong email');
        } catch (err) {
            assert.equal(err.message,'Cannot find user.');
        }
    });

    it('Can sign in with wrong password ', async () => {
        await User.signUp('hung1@gmail.com','123','hung','123456789');
        try {
            await User.signIn('hung1@gmail.com','');
            throw new Error('Wrong at Sign in with wrong email');
        } catch (err) {
            assert.equal(err.message,'Invalid password.');
        }
    });

    it('Can sign in without password ', async () => {
        await User.signUp('hung1@gmail.com','123','hung','123456789');
        try {
            await User.signIn('hung1@gmail.com',undefined);
            throw new Error('Wrong at Sign in with wrong email');
        } catch (err) {
            assert.equal(err.message,'Invalid password.');
        }
    });
});