const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const createError = require('http-errors');

const response = require('./common/response');
const route = require('./routes');

const app = express();
const server = http.createServer(app);
const MyApp = {
  configure: (env) => {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    if (env === 'development') app.use(require('morgan')('dev'));

    app.use('/api', route);

    app.use('*', (req, res, next) =>
      next(
        createError.NotFound(`Cant not found ${req.originalUrl} in this server`)
      )
    );
    app.use((err, req, res, next) => response.error(res, err));
  },
  listen: (port) => {
    server.on('error', function (err) {
      console.error(err);
      process.exit(1);
    });

    app.listen(port, () => {
      console.log(`Server is listening in http://localhost:${port}`);
    });
  },
};

module.exports = MyApp;
