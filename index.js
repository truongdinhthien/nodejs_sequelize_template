require('./config');

const MyApp = require('./app');
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';

MyApp.configure(env);
if(require.main && module.children) MyApp.listen(port); else process.exit(1);