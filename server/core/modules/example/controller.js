import logger, { init, responded } from '../../../config/logger';
import getSampleData from './service';

const exampleMethod = async (req, res) => {
  const { info, error } = logger('example/exampleMethod', 'unique_id');

  try {
    info(init);

    const examples = await getSampleData();
    const response = {
      success: true,
      examples,
    };

    info(JSON.stringify(response));

    res.send(response);
    info(responded);
  } catch (e) {
    error(e);
    res.status(500).send({ success: false, msg: 'An error occurred' });
  }
};

export default exampleMethod;
