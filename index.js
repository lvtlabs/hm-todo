const express = require('express')
const bodyParser = require('body-parser')
//const logger=require('./logger');
const cors = require('cors');
const app = express();
const todoRoutes=require('./routes/routes_todo')
module.exports = app;
app.use(cors());

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// function logRequest(req, res, next) {
//     logger.info(`${req.url},  Response: ${res.statusCode},Request:${req.method}`);
//     next();
//   }
//   app.use(logRequest);
  
//   function logError(err, req, res, next) {
//     logger.error(`Error: ${err} , ${JSON.stringify(req.url)}, Request Body ${JSON.stringify(req.body)}, Response ${Json.stringify(res.json)}`);
//     next();
//   }
//   app.use(logError);
  if (process.env.NODE_ENV == 'prod') {
	const appPath = path.join(__dirname, '..', 'dist');
	app.use(express.static(appPath));
	app.get('*', function (req, resp) {
		resp.sendFile(path.resolve(appPath, 'index.html'));

	});
}

//todo routes path
app.use('/apk/v1/todo',todoRoutes);
const PORT = process.env.NODEJS_NODEJSPORT || 3004;
  app.listen(PORT, function () {
    console.log('App is running at PORT' + PORT);
    //logger.info("Server started and running on http://localhost:"+ PORT)
  });