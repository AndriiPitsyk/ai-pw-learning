import { test, expect } from '../fixture';
import { userData } from '../api/data/userDataGenerator';

test.describe('Create User - positive tests', () => {
    test('Should create a user with userName of 5 characters', async ({ api }) => {
        const userPayload = userData()
            .setUserData({ userName: 'abcde' })
            .generate();

        const createdUser = await api.users.create(userPayload);

        expect(createdUser.userName).toBe(userPayload.userName);
        expect(createdUser.userName).toHaveLength(5);
        expect(createdUser.email).toBe(userPayload.email);
        expect(createdUser.role).toBe(userPayload.role);

        await api.users.delete(createdUser.email);
    });

    test('Should create a user with userName of 100 characters', async ({ api }) => {
        const userName = 'a'.repeat(100);
        const userPayload = userData()
            .setUserData({ userName })
            .generate();

        const createdUser = await api.users.create(userPayload);

        expect(createdUser.userName).toBe(userPayload.userName);
        expect(createdUser.userName).toHaveLength(100);
        expect(createdUser.email).toBe(userPayload.email);
        expect(createdUser.role).toBe(userPayload.role);

        await api.users.delete(createdUser.email);
    });
});

