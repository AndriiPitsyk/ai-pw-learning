import {faker} from "@faker-js/faker";

interface UserRequestBody {
    userName: string;
    email: string;
    password: string;
    role: string;
}

class UserDataGenerator {
    userData: UserRequestBody = {
        userName: null,
        email: null,
        password: null,
        role: null
    }

    setUserData(userData:{userName?: string, email?: string, password?: string, role?: string}): this {
        this.userData = {...this.userData, ...userData};
        return this;

    }

    generate(): UserRequestBody {
        return {
            userName: this.userData.userName || faker.internet.userName(),
            email: this.userData.email|| faker.internet.email(),
            password: this.userData.password || faker.internet.password(),
            role: "user"
        }
    }
}

export const userData = ()=> new UserDataGenerator();

