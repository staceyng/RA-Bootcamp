data =
  '{"person": [{"name": "Bob","age": "20"}, {"name": "Alice","age": "20"}]}';

// parse to convert str to js obj
let personObj = JSON.parse(data);
console.log(personObj);
console.log("\n");

/*
{
	"person": [{
		"name": "Bob",
		"age": "20"
	}, {
		"name": "Alice",
		"age": "20"
	}]
}
*/

// stringify to convert back to JSON string
personObj.person[1].age = Math.floor(Math.random() * 100);
const string = JSON.stringify(personObj);
console.log(string);

/*
{"person":[{"name":"Bob","age":"20"},{"name":"Alice","age":27}]}
*/
