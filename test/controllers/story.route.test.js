const assert = require('assert');
const request = require('supertest');
const { compare } = require('bcrypt');

const app = require('../../src/app');
const User = require('../../src/models/user.model');
const Story = require('../../src/models/story.model');

describe('Test POST /story', () => {
    let token;
    beforeEach('Create user for test', async() =>{
        await User.signUp('hung1@gmail.com', '123', 'hung1', '123456789');
        const user = await User.signIn('hung1@gmail.com', '123');
        token = user.token;
    });

    it('Can create new story by POST /story', async() => {
        const response = await request(app)
        .post('/story')
        .send({ content: 'abcd'})
        .set({ token });
        console.log(response.body);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        assert.equal(response.body.story.content,'abcd');
        const story = await Story.findOne().populate('author');
        assert.equal(story.author.name,'hung1');
        const user = await User.findOne().populate('stories');
        assert.equal(user.stories[0].content, 'abcd');
    });

    it('Cannot create new story without token', async() => {
        const response = await request(app)
        .post('/story')
        .send({ content: 'abcd'})
        console.log(response.body);
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
    });
});

describe.only('Test DELETE /story', () => {
    beforeEach('create story for test', async() => {

    });

    it('Can remove story by DELETE', async () => {

    });

    it('Cannot remove story with wrong storyID', async () => {

    });

    it('Cannot remove story with wrong TOKEN', async () => {

    });

    it('Cannot remove story with without TOKEN', async () => {

    });
});