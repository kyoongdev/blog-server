const fs = require('fs');

const crypto = require('crypto-js');

const decrypt = (data, key) => {
  return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
};

(async () => {
  const baseEnv = fs.readFileSync('./.env', 'utf8');
  const env = fs.readFileSync('./env/.env.dev', 'utf8');

  const baseAESkey = baseEnv.split('\n').reduce((acc, cur) => {
    if (cur.includes('=')) {
      const [key, value] = cur.split('=');
      acc[key] = value;
    }
    return acc;
  }, {})['AES_KEY'];

  const envRecords = env.split('\n').reduce((acc, cur) => {
    if (cur.includes('=')) {
      const [key, value] = cur.split('=');
      acc[key] = value;
    }
    return acc;
  }, {});

  const decryptSQL = decrypt(envRecords['DB_INFO'], baseAESkey);

  const envFile =
    Object.entries(envRecords).reduce((acc, cur) => {
      const [key, value] = cur;
      if (key === 'DB_INFO') return acc;
      acc += `${key}=${value}\n`;
      return acc;
    }, '') + `DATABASE_URL=mysql://${decryptSQL}@blog-db.cbb6a8d1ki52.ap-northeast-2.rds.amazonaws.com:3306/blog`;

  fs.writeFileSync('./.env', envFile, 'utf8');
})();
