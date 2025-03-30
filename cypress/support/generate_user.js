import { faker } from '@faker-js/faker';

export function generateUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birth_day: faker.number.int({ min: 1, max: 30 }),
        birth_month: faker.date.month(),
        birth_year: faker.number.int({ min: 1950, max: 2005 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile_number: faker.phone.number()
    };
}