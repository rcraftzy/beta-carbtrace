import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(13)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: "Moisés Alarcón",
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Shared', 'banned']),
  role: sample([
    '73 g co2/u',
    '645 g co2/u',
    '125 g co2 / u',
    '123 g co2 / u',
    '73 g co2/u',
    '645 g co2/u',
    '125 g co2 / u',
    '123 g co2 / u',
    '200 g co2 / u',
    '85 g co2 / u',
  ]),
}));

export default users;

/* const users = [...Array(13)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: "ole mi niño",
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Shared', 'banned']),
  role: sample([
    '73 g co2/u',
    '645 g co2/u',
    '125 g co2 / u',
    '123 g co2 / u',
    '73 g co2/u',
    '645 g co2/u',
    '125 g co2 / u',
    '123 g co2 / u',
    '200 g co2 / u',
    '85 g co2 / u',
  ]),
})); */