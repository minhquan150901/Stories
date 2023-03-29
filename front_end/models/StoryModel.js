import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
 
const Story = db.define('stories',{
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    category: DataTypes.STRING
},{
    freezeTableName:true
});
 
export default Story;
 
(async()=>{
    await db.sync();
})();