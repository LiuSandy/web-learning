const Sequelize= require('sequelize');

// 连接数据库
const sequelize = new Sequelize('custom', 'root', '12345678', {
  host: "localhost",
  dialect: 'mysql'
})
// 定义数据模型
const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM(['男', '女']),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  
  email:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  phone:{
    type:Sequelize.STRING
  },
  country:{
    type:Sequelize.STRING
  },
  city:{
    type:Sequelize.STRING
  }
})
// 测试连接
sequelize.authenticate().then(() => {
  console.log("Connected");
}).catch(err => {
  console.log("Connect failed",err);

})