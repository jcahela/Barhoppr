const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csrf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = (environment === 'production');
const routes = require('./routes')
const { ValidationError } = require('sequelize')

const app = express();

app.use(morgan('dev'));
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(
  csrf({
    cookie: {
      secure: isProduction, // secure is set to true if isProduction is a truthy value, meaning it's only set to true in production
      sameSite: isProduction && "Lax", // sameSite is set to 'Lax' if isProduction is truthy, if not, it's set to false
      httpOnly: true
    }
  })
)

app.use(routes);




// Error handling

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});


app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});


app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
