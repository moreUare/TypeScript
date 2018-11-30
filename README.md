# TypeScript
learning TypeScript

## 安装
> npm install -g typescript

## 编译
```tsc greeter.ts```
## 类型注解
变量：string
## 接口
```
interface Person{
	firstName: string;
	lastName: string;
}
```
## 类
```
class Student{
	fullName: string;
	constructor(public firstName, public middleInitial, public lastName){
		this.fullName = firstName + " " + middleInitial + " " + lastName;
	}
}
```

## 基础类型
### 字符串  
```let name: string = "smith"```   
 还可以使用模板字符串，它可以定义多行文本和内嵌表达式。这种字符串是以反引号包围（`）并以${express}这种形式切入表达式
 ```
 let sentence: string = `Hello, my name is ${ name }.
 I'll be ${ age + 1 } years old next month.`;
 ```
 ### 数组
 ```
 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组
 let list: number[] = [1, 2, 3];
 第二种方式是使用数组泛式，Array<元素类型>
 let list: Array<number> = [1, 2, 3];
 //let list: Array<T> = [1, 2, 3];
 ```
 ### 元组
 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如你可以定义一对值分别为string和number类型的元组。
 ```
 //Declare a tuple type
 let x: [string, number];
 //Initialize it
 x = ['hello', 10]; //OK
 //Initialize it incorrectly
 x= [10, 'hello'];  //Error
 ```
当访问一个已知索引的元素，会得到正确的类型：
```
console.log(x[0].substr(1));  //OK
console.log(x[1].substr(1));  //Error, 'number'does not have 'substr'
```
当访问一个越界的元素，会使用联合类型替代：
```
x[3] = 'world'; //OK,字符串可以赋值给（string | number）类型
console.log(x[5].toString()); //OK, 'string'和'number'都有toString
x[6] = true; //Error, 布尔不是（string | number）类型
```
`联合类型是高级主题`
### 枚举
enum类型是对JavaScript标准数据类型的一个补充。使用枚举类型可以为一组数组赋予友好的名字。
```
enum Color {Red, Green, Blue}
let c: Color = color.Green;
默认情况下，从0开始为元素编号。你也可以手动的指定成员的数值。
enum Color {Red = 1, Green, Blue}
let c: Color = color.Green;
或者全部手动赋值：
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
查找相应的名字
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName);      //Green
```
### Any  (类似弱变量)
有时候，我们想要为那些在编程阶段还不清楚类型的变量指定一个类型，这些值可能来自动态的内容，比如来自用户输入或第三方代码库。
```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;   //okay,definitely a boolean
```
any类型与Object类型的区别
```
let notSure: any = 4;
notSure.ifItExists();	//okay,ifItExists might exist at runtime
notSure.toFixed();		//okay,toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed();	//Error: Property 'toFixed' doesn't exist on type 'Object'.
```
当知道一部分数据的类型，any类型也是有用的。
```
let list: any[] = [1, true, 'free'];
list[1] = 100;
```
### Void
void类型与any类型相反，它表示没有任何类型。
```
function warnUser()： void{
	console.log("This is my warning message");
}
```
声明一个void类型,只能赋予undefined和null
let unusable: void = undefined;
### Null和Undefined
```
let u: undefined = undefined;
let n: null = null;
```
默认情况下null和undefined是所有类型的子类型，就是说你可以把null和udnefined赋给number类型变量
**当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和`它们各自`。这样能避免很多常见的问题。le**
### Never
`never`类型表示的那些永不存在的值的类型。
`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给never。
```
//返回never的函数必须存在无法到达的终点
function error(message: string): never{
	throw new Error(message);
}
//推断的返回类型为never
function fail(){
	return error("Something failed");
}
//返回never的函数必须无法达到的终点
function infiniteLoop(): never{
	while(true){
		
	}
}
```
### Object
`object`表示非原始类型，也就是除`number`，`string`，`Boolean`，`symbol`，`null`或`undefined`之外的类型。
```
declare function create(o: object | null): void;

create({prop: 0});	//OK
create(null);		//OK

create(42);			//Error
create("string")    //Error
create(false);		//Error
create(undefined);	//Error
```
### 类型断言
类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，知识在编译阶段起作用。
类型断言有两种形式。其中一种是"尖括号"语法：
```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```
另一种为as语法
```
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;
```
两种形式是等价的。

## 接口
```
interface LabelledValue {
	label: string;
}
function printLabel(labelledObj: LabelledValue){
	console.log(labelledObj.label);
}
let myObj = {size: 10, label:"Size 10 Object"};
printLabel(myObj);
```
LabelledValue接口就好比一个名字，用来描述上面的例子里的要求。他代表有一个label属性且类型为string的对象
### 可选属性
`接口里的属性不全是必需的`   ,有些是只在某些条件下存在，或者根本不存在。可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象种只有部分属性赋值了。
```
interface SquareConfig{
	color?: string;
	width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number}{
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
```
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。   
可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。比如，我们故意将`createSquare`里的`color`属性名拼错，就会得到一个错误提示

### 只读属性
一些对象属性只能刚刚创建的时候修改其值。你可以再属性名前用readonly来指定只读属性：
```
interface Point{
	readonly x: number;
	readonly y: number;
}
```
你可以通过赋值一个对象字面量来构造一个`point`。赋值后，x和y再也不能被改变。
```
let p1: Point = { x: 10, y: 20};
p1.x = 5;    //error!
```
TypeScript具有`ReadonlyArray<T>`类型，它与`Array<T>`相似,只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

**`readonly` VS `const`**  
作为变量使用的话用`const`,若作为属性则使用`readonly`

### 函数类型

### 可索引的类型
```
interface StringArray{
	[index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
上面例子中，定义了`StringArray`接口，它具有索引签名。这个索引签名表示了当用`number`去索引`StringArray`时会得到`string`类型的返回值
   
 TypeScript支持两种索引签名：字符串和数字。可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 
 
 
 //太多了
