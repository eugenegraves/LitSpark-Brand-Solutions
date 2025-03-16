/**
 * Mock bcrypt for Testing
 * 
 * This file provides mock implementations of bcrypt functionality
 * to allow tests to run without the actual bcrypt dependency.
 */

module.exports = {
  hash: jest.fn().mockImplementation((password) => {
    return Promise.resolve(`hashed_${password}`);
  }),
  
  compare: jest.fn().mockImplementation((password, hash) => {
    return Promise.resolve(hash === `hashed_${password}`);
  }),
  
  genSalt: jest.fn().mockResolvedValue('mock_salt'),
  
  hashSync: jest.fn().mockImplementation((password) => {
    return `hashed_${password}`;
  }),
  
  compareSync: jest.fn().mockImplementation((password, hash) => {
    return hash === `hashed_${password}`;
  })
};
