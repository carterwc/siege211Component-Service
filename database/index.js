const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const Blue = require('bluebird');

const connection = mysql.createConnection(mysqlConfig);




const AddMany = function(commentsArr,callback) {
  // console.log("AddComment values Obj: ", valuesObj);
  var promiseArray = commentsArr.map((data,i) => {
  	return new Blue( (resolve,reject) => {
  		connection.query(
		    "INSERT INTO comments (textContent, dateCreated,user,idParentComment) VALUES ('"+data.textContent+"', '"+data.dateCreated.toString()+"', '"+data.user+"', '"+data.idParentComment+"')",
		    function (err, result, fields) {
		      if (err) {callback(err)}
		      else {
		      	console.log('insert#: ',i);
		      	callback(null,result)
		      }
		    })
  	})
		  


	})
	Blue.all(promiseArray).then(result =>{
		database.commit();
		connect.end();
		}
	);
}

const getAllComments = function(callback) {
  return connection.query("SELECT * FROM Comments WHERE id < 101;",function (err, result, fields) {
    if (err) {
    	callback(err)
    }
    else {
    	callback(null,result)
    }
  })
};



module.exports = {
	AddMany,
	getAllComments
};