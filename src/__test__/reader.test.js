'use strict';

const fs = require('fs');
const fileReader = require('../lib/reader');

const mockText1 = `${__dirname}/./mock-assets/1.txt`;
const mockText2 = `${__dirname}/./mock-assets/2.txt`;
const mockText3 = `${__dirname}/./mock-assets/3.txt`;

let mockData = [];

describe('testing fileReader module that reads there files', () => {
  beforeAll(() => {
    // please don't use "sync" version of node modules in real code except for testing purposes
    mockData = [
      fs.readFile(mockText1, { encoding: 'utf-8' }),
      fs.readFile(mockText2, { encoding: 'utf-8' }),
      fs.readFile(mockText3, { encoding: 'utf-8' }),
    ];
  });

  test('should show that the data we read from readThreeFiles equals the data in our mockData array', () => {
    fileReader.readThreeFiles(mockText1, mockText2, mockText3, (err, data) => {
      expect(data).toEqual(mockData[0]);
      expect(err).toBeNull();
      // put more expect statements
    });
  });

  test('should return an error for a bad file path on the first item', () => {
    fileReader.readThreeFiles('bad path', mockText2, mockText3, (err, data1, data2, data3) => {
      expect(err).toHaveProperty('errno');
      expect(err.code).toEqual('ENOENT');
    });
  });
});
