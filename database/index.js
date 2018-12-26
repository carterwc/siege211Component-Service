const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const Blue = require('bluebird');

const connection = mysql.createConnection(mysqlConfig);


const AddComment = function(valuesObj,callback) {
  // console.log("AddComment values Obj: ", valuesObj);
  
  return connection.query(
    "INSERT INTO comments (textContent, dateCreated,user,idParentComment) VALUES ('"+valuesObj.textContent+"', '"+valuesObj.dateCreated.toString()+"', '"+valuesObj.user+"', '"+valuesObj.idParentComment+"')",
    function (err, result, fields) {
      if (err) {
        callback(err)
      }
      else {
        callback(null,result)
      }

    })
};



const AddMany = function(valuesObj,callback) {
  // console.log("AddComment values Obj: ", valuesObj);
  var promiseArray = valuesObj.map((data,i) => {
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
		  
		  // return connection.query(
		  //   "INSERT INTO comments (textContent, dateCreated,user,idParentComment) VALUES ('"+valuesObj.textContent+"', '"+valuesObj.dateCreated.toString()+"', '"+valuesObj.user+"', '"+valuesObj.idParentComment+"')",
		  //   function (err, result, fields) {
		  //     if (err) {
		  //       callback(err)
		  //     }
		  //     else {
		  //       callback(null,result)
		  //     }
		  //   })

	})
	Blue.all(promiseArray).then(result =>{
		database.commit();
		connect.end();
		}
	);
}



module.exports = {
	AddComment,
	AddMany
};