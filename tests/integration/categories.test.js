const request = require('supertest');
const { Category } = require('../../models/category');
const {User} = require('../../models/user');
const mongoose = require('mongoose');
let server;

describe('/api/categories', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();
        await Category.remove({});
    });

    describe('GET /', () => {
        it('should return all categories', async () =>  {
            Category.collection.insertMany([
                {name: 'dasturlash'},
                {name: 'tarmoqlar'},
                {name: 'diyzayn'}
            ]);

            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(cat => cat.name == 'dasturlash')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a category if given id is valid', async () => {
            const category = new Category({name: 'Artificial intelligence'});
            await category.save();

            const response = await request(server).get('/api/categories/' + category._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'Artificial intelligence');
        });

        it('should should return 404 if given id is invalid ', async () => {
            const response = await request(server).get('/api/categories/1234');
            expect(response.status).toBe(404);
        });
        it('should should return 404 if no category with  the passed id exist', async () => {
            const categoryId = mongoose.Types.ObjectId();
            const response = await request(server).get('/api/categories/' + categoryId);
            expect(response.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        const execute = async () => {
            return await request(server)
                .post('/api/categories')
                .set('x-auth-token', token)
                .send({name});
        };
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'dasturlash';
        });

        it('should return 401 if user is not logged in', async() => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });
        it('should return 400 if category name is less than 3 characters', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });
        it('should return 400 if category name is more than 50 characters',async () => {
            name = new Array(52).join('c');
            const res = await execute();
            expect(res.status).toBe(400);
        });
        it('should save the category if it is valid',async () => {
            await execute();
            const category = await Category.find({name: 'dasturlash'});
            expect(category).not.toBeNull();
        });
        it('should return category if it is valid',async () => {
            const res = await execute();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'dasturlash');
        });
    })
});