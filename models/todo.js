const sequelize = require('./connection_pool');
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};

class todoDB {
    constructor() {
    }

    //sequelizing the hm_todo table
    org_hm_todo = sequelize.define('hm_todo', {
        uid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        pract_id: { type: DataTypes.INTEGER },
        client_id: { type: DataTypes.INTEGER },
        day_id: { type: DataTypes.DATE },
        todo_time: { type: DataTypes.STRING },
        task_name: { type: DataTypes.STRING },
        todo_status: { type: DataTypes.STRING },
        task_description: { type: DataTypes.STRING }
      }, DISABLE_SEQUELIZE_DEFAULTS)

//posting task details to todo table
      async todoTaskDetails(obj) {
        return await this.org_hm_todo.create({
          pract_id: obj.pract_id,
          day_id: obj.dayId,
          todo_time: obj.todoTime,
          task_name: obj.taskName,
          todo_status: obj.task_status,
          task_description: obj.taskDescription,
          client_id:obj.client_id

          
    }).then(data => {
          console.log("Added todo Task details", data)
          return Promise.resolve(data)
        }).catch(err => {
          console.log("Error while Inserting data", err)
          throw new Error("Can not insert data", err)
        })
      }


      //getting todo task details based on pracId and todo_status
      async toDoTasks(data) {
        return this.org_hm_todo.findAll({where:{pract_id:data.practId,todo_status:data.todo_status}}).then(rows => {
          return rows;
        }).catch((err) => {
          console.log("Error while getting data", err);
          throw new Error('Error while getting data', err.message);
        });
      }


      async clientToDoTasks(data){
        return this.org_hm_todo.findAll({where:{client_id:data.clientId,todo_status:data.todo_status}}).then(rows => {
          return rows;
        }).catch((err) => {
          console.log("Error while getting data", err);
          throw new Error('Error while getting data', err.message);
        });
      }
      
    }
module.exports=todoDB;