import {Sequelize} from "sequelize";
 
const db = new Sequelize('stories_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});


export default db;