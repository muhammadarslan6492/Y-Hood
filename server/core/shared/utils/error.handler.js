// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
// eslint-disable-next-line
import constants from './constants';
/**
 * @name extractError
 * @desc extract error and return error message or array of error message
 * @param {object} claims
 * @return string | string[]
 */
export function extractError(error) {
  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors.map(({ message }) => message);
  }
  const message = constants.errorsMapping[error.message] || error.message;
  return message;
}

/**
 * @name errorHandler
 * @desc send error response
 * @param {object} err
 * @param {object} req
 * @param {object} res
 */
export default function errorHandler(err, req, res) {
  res.status(err.status || 500);
  res.send(`<h1>${err.status || 500} Error</h1>``<pre>${err.message}</pre>`);
}
