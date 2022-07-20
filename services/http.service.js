const http = require('supertest');

exports.postRequest = async (request)=>{
  const response = await http(request.endpoint)
  .post(request.api)
  .send(request.body);
  return response;
}