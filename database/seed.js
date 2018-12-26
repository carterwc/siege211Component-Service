var faker = require('faker');
const db = require('../database');
var fakeArr =[] 

for (let i=0;i<=99;i++) {
	var fakeObj= {};
	fakeObj.textContent = faker.lorem.sentence();
	fakeObj.dateCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
	fakeObj.user = faker.random.word() + faker.random.number({min:1,max:999});
	fakeObj.idParentComment = 0;
	fakeArr.push(fakeObj);
}

//


var storeFakeData = function(commentObject) {
	db.AddComment(commentObject,
		(err,comment)=> {
			if (err) {console.log(err);throw err;}
			else {console.log('it got added');}
		}
	)
}

var storeManyFakeData = function(commentArr) {
	db.AddMany(commentArr,
		(err,comment)=> {
			if (err) {console.log(err);throw err;}
			else {console.log('they got added');}
		}
	)
}

storeManyFakeData(fakeArr);

// for (i=0;i<99;i++) {
// 	setTimeout(function(){storeFakeData(fakeArr[i])},i*150);
// }


// setTimeOut(()=>{
// 	for(var i=0,i<9,i++) {
// 		storeFakeData(fakeArr[i])
// 	}
// },0)


/*setTimeOut(()=>{
	for(i=10,i<19,i++) {
		storeFakeData(fakeArr[i])
	}
},1500)

setTimeOut(()=>{
	for(i=20,i<29,i++) {
		storeFakeData(fakeArr[i])
	}
},3000)

setTimeOut(()=>{
	for(i=30,i<39,i++) {
		storeFakeData(fakeArr[i])
	}
},4500)

setTimeOut(()=>{
	for(i=40,i<49,i++) {
		storeFakeData(fakeArr[i])
	}
},6000)

setTimeOut(()=>{
	for(i=50,i<59,i++) {
		storeFakeData(fakeArr[i])
	}
},7500)

setTimeOut(()=>{
	for(i=60,i<69,i++) {
		storeFakeData(fakeArr[i])
	}
},9000)

setTimeOut(()=>{
	for(i=70,i<79,i++) {
		storeFakeData(fakeArr[i])
	}
},10500)

setTimeOut(()=>{
	for(i=80,i<89,i++) {
		storeFakeData(fakeArr[i])
	}
},12000)

setTimeOut(()=>{
	for(i=90,i<99,i++) {
		storeFakeData(fakeArr[i])
	}
},13500)*/
/// if i have time, consider async await instead of setTimeOut();