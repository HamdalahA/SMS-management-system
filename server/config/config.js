require('dotenv').config();

const { DATABASE_URL, PORT, TEST_URL} = process.env;

const config = {
  dtb: DATABASE_URL,
  test: TEST_URL,
  port: PORT
};

export default config;
