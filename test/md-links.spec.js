const mdLinks = require('../index.js');
import { readMdFile, lookForUrl, urlValidate, urlStats } from '../md-links.js';

test('readMdFile debería ser una función', () => {
  expect(typeof readMdFile).toEqual('function');
});

test('lookForUrl debería ser una función', () => {
  expect(typeof lookForUrl).toEqual('function');
});

test('urlValidate debería ser una función', () => {
  expect(typeof urlValidate).toEqual('function');
});

test('urlStats debería ser una función', () => {
  expect(typeof urlStats).toEqual('function');
});

