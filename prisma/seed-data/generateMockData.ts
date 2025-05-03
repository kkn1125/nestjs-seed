import { fakerKO as faker } from '@faker-js/faker';

export function generateMockData() {
  createUserMockData();
}

function createUserMockData() {
  const username = faker.person.fullName();
  const age = faker.internet.email({ provider: 'example.com' });
}
