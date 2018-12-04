class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);

let x: [string, number];
x = ['hello', 10];
console.log(x[0].substr(1));


enum Color{Red, Green, Blue}
let c: Color = Color.Green;
console.log(c);

let colorName: string = Color[2];
console.log(colorName);		//显示'Green'因为上面代码里它的值

let unusable: void = undefined;

let u: undefined = undefined;
let n: null = null;

for(var i = 0; i < 10; i++){
// 	(function(i){
// 		setTimeout(function(){ console.log(i);}, 1000*i);
// 	})(i);
}


interface SquareConfig{
	color?: string;
	width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number }{
	let newSquare = { color: "white", area: 100};
	if(config.color){
		newSquare.color = config.color;
	}
	if(config.width){
		newSquare.area = config.width * config.width;
	}
	return newSquare;
}
let mySquare = createSquare({color: "black"});
console.log(mySquare)

let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

