const todoData=require('../models/todo')
const http = require("../services/http.service");
const formatDate = (d)=>{
  let date = new Date(d);
  let fTime = date.toLocaleString().split(",")[1];
  let fDate = date.toDateString()
  return fDate + fTime; 
}
exports.saveTodoTask = async function (req, res) {
  if(!req.body){
		return res.status(400).send({ errors: [{ title: 'Invalid  request', detail: 'Status details are un-Available' }] });
	  }
    console.log('saveTodo task is called',req.body);
    const todoDB = new todoData()
    if ((req && req.body)) {
      let saveLocation = await Promise.resolve(todoDB.todoTaskDetails(req.body)).catch(e => {
        console.log('Error while getting todo task ', e)
        return res.status(400).send({
          errors: [{ title: 'Invalid  request', detail: e }]
        });
      });
      if(saveLocation){
        let auditObj = {
          method:'CREATED',
          user_id:req.body.client_id,
          description:`${req.body.taskName} Task Assigned on ${formatDate(req.body.todoTime)}.`
        }
        await http.postRequest({
          endpoint:'http://localhost:3005',
          api:'/apm/v1/audit/save-audit-log',
          body:auditObj
        })
        return res.json('updated:true');
      }
      
    } else {
      return res.status(400).send({
        errors: [{ title: 'Invalid  request', detail: e }]
      });
    }
  }

  exports.toDoTasks = async function (req, res) {
    try{
    if(!(req && req.query && req.query.practId&&req.query.todo_status)){
      return res.status(400).send({errors:[{title:'Invalid request',details:''}]  });
    }
    console.log('Get Locations is callled',req.query);
    const todoDB = new todoData();
    let gettoDoTasks = await Promise.resolve(todoDB.toDoTasks(req.query)).catch(e => {
      //logger.error('Error while getting toDotasks ', e)
      return res.status(400).send({
        errors: [{ title: 'Invalid  request', detail: e }]
      });
    });
    //logger.info('todo tasks API worked successfully')
    if(gettoDoTasks){
        return res.json(gettoDoTasks);
    }
  }catch(e){
    console.log("error while getting todo tasks")
  }
    
  }
  exports.clientTodotasks=async function(req,res){
    try{
      if(!(req && req.query && req.query.clientId)){
        return res.status(400).send({errors:[{title:'Invalid request',details:''}]  });
      }
      console.log('Get Locations is callled',req.query);
      const todoDB = new todoData();
      let gettoDoTasks = await Promise.resolve(todoDB.clientToDoTasks(req.query.clientId)).catch(e => {
        //logger.error('Error while getting toDotasks ', e)
        return res.status(400).send({
          errors: [{ title: 'Invalid  request', detail: e }]
        });
      });
      //logger.info('todo tasks API worked successfully')
      if(gettoDoTasks){
          return res.json(gettoDoTasks);
      }
    }catch(e){
      console.log("error while getting todo tasks")
    }
  }

  exports.getTaskStatus = async (req,res)=>{
    try{
      const todoDB = new todoData();
      let taskStatus = await Promise.resolve(todoDB.getTodoStatus()).catch(e => {
        //logger.error('Error while getting toDotasks ', e)
        return res.status(400).send({
          errors: [{ title: 'Invalid  request', detail: e }]
        });
      });
      //logger.info('todo tasks API worked successfully')
      if(taskStatus){
          return res.json(taskStatus);
      }
    }catch(e){
      console.log("error while getting todo tasks")
    }
  }

  exports.updateTaskMarkAsDone = async(req,res)=>{
    try {
      const todoDB = new todoData();
      let isExist;
      isExist = await Promise.resolve(todoDB.toDoTasksUpdateMarkAsDone(req.body))
      if (isExist && Object.entries(isExist).length) {
        return res.json({ 'updated': true, 'details': 'mark as done' });
      } else {
        return res.json({ 'updated': false, 'detail': 'error' });
      }
    } catch (e) {
      return res.status(400).send({ errors: [{ title: 'Invalid  request', detail: e.message }] });
  }
}