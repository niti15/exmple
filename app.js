//require('appmetrics-prometheus').attach()
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var config = require("./config");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var jobRouter = require("./routes/job");

var app = express();
var expressValidator = require("express-validator");

////Prometheus metrics
const Prometheus = require('prom-client')
const metricsInterval = Prometheus.collectDefaultMetrics()
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'status'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})

//Prometheus metrics
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now()
  next()
})

// Express Validator
app.use(expressValidator({
  errorFormatter(param, msg, value){
    var namespace = param.split("."),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length) {
    //  formParam += "[" + namespace.shift() + "]";
    }
    return  {
      param : formParam,
      msg,
      value
    };
  }
}));


// Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;

mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/job",jobRouter);

//Prometheus metrics
app.get('/metrics', (req, res) => {
 console.log('i m in4');
 res.set('Content-Type', Prometheus.register.contentType)
 res.end(Prometheus.register.metrics())
})

app.use(function (req, res, next) {
   const responseTimeInMs = Date.now() - res.locals.startEpoch
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  //Prometheus metrics
   httpRequestDurationMicroseconds
    .labels(req.method,res.statusCode)
    .observe(responseTimeInMs)
});

module.exports = app;
