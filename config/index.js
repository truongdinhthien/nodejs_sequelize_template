const result = require('dotenv').config()
if (result.error) {
    throw new Error('.env file not found');
}