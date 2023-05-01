const CryptoJS = require('crypto-js');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

export const encrypt = async data => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), config.encryptionKey).toString();
  return encrypted;
};

export const decrypt = async data => {
  const bytes = CryptoJS.AES.decrypt(data, config.encryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return Buffer.from(decryptedData);
};
