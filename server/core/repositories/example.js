const { models } = require('../db/models');

export const getExamples = () => models.example.findAllRecords();
export const createExample = payload => models.example.create(payload);
