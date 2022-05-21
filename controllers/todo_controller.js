const todoData=require('../models/todo')

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