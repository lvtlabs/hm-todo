const { createLogger, format, transports } = require('winston');
var env = process.env.NODE_ENV;
console.log('in index env is', env);
var result;
if (env == null || env == undefined || env == "dev") {
	env = "dev";
	result = require('dotenv').config({ path: './environments/.env.dev' });
    console.log('in if env is >>>>>',result.parsed.LOG_LEVEL, env);
} else if (env == "prod") {
	console.log('in if else env is', result.parsed.LOG_LEVEL, env);
	result = require('dotenv').config({ path: './environments/.env.prod' });
}
module.exports = createLogger({
transports: new transports.File({
    filename: 'logs/server.log',
    level: result.parsed.LOG_LEVEL,
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
});
