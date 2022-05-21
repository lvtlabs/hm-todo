var env = process.env.NODE_ENV;
if (env == null || env == undefined) {
	env = "prod";
}


let result;
if (env == "dev") {
	result = require('dotenv').config({ path: './environments/env.dev' });
} else if (env == "prod") {
	result = require('dotenv').config({ path: './environments/env.prod' });
}



if (result.error) {
	console.log('Error while getting .env file')
	throw result.error;
}
const { parsed: envs } = result;
 //console.log(envs);

const postgresProperties = {
	"host": envs.POSTGRES_HOST,
	"port": envs.POSTGRES_PORT,
	"database": envs.POSTGRES_DATABASE,
	"user": envs.POSTGRES_USER,
	"password": envs.POSTGRES_PASSWORD,
	"PATH":envs.orgSettingUploadPath
}
module.exports = {
	postgresProperties,
    envs
}