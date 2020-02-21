const mdLinks = require('../index.js');
const readMdFile = require('../md-links.js');
const lookForUrl = require('../md-links.js');
const urlValidate = require('../md-links.js');
const urlStats = require('../md-links.js');

test('readMdFile should be a promise', () => {
  expect(typeof mdLinks).toEqual('promise');
});

test('readMdFile should be a function', () => {
  expect(typeof readMdFile).toEqual('function');
});

test('lookForUrl should be a function', () => {
  expect(typeof lookForUrl).toEqual('function');
});

test('urlValidate should be a function', () => {
  expect(typeof urlValidate).toEqual('function');
});

test('urlStats should be a function', () => {
  expect(typeof urlStats).toEqual('function');
});

