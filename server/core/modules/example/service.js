import * as exampleRepo from '../../repositories/example';

const getSampleData = async () => {
  const examples = await exampleRepo.getExamples();
  return examples;
};

export default getSampleData;
