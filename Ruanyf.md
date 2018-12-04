# TypeScript入门 by 阮一峰

## 未声明类型的变量
**变量如果再声明的时候，未指定其类型，那么它会被识别为任意值类型**
```
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```
等价于
```
let something: any;
something = `seven`;
something = 7;

something.setName('Tom');
```

## 类型推理
TypeScript会在没有明确的指定类型的时候推测出一个类型，
**如果定义的时候没有赋值，不管之后有没有赋值。都会被推断成any类型而且完全不被类型检查**
```
let myFavoriterNumber;
myFavoriterNumber = 'seven';
myFavoriterNumber = 7;
```

## 联合类型
**联合类型表示取值可以为多种类型中的一种**
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
联合类型使用`|`分隔每个类型。
`let myFavoriteNumber: string | number `的含义是，允许`myFavoriteNumber`的类型是`string`或者`number`，但是不能是其他类型。

### 访问联合类型的属性或方法
当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问联合类型的所有类型里共有的属性或方法。
```
function getString(something: string | number): string{
	return something.toString();
}
//toString()是string和number的共有属性。
```
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length);   //5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length);   //编译时报错
```
第二行的`myFavoriteNumber`被推断成了`string`,访问它的`length`属性不会报错，而第四行的`myFavoriteNumber`被推断成了`number`，访问它的`length`属性是就报错了。

## 接口
- 接口一般首字母大写。有的编程语言中会建议接口的名称加上`I`前缀
定义的变量比接口少了一些属性是不允许的：
```
interface Person{
	name: string;
	age: number;
}
let tom: Person = {
	name: 'Tom'
};
//index.ts: error TS2322: Type '{name: string}' is not assignable to type 'Person'
//Property 'age' is missing in type '{name: string}'
```
多一些属性也是不允许的。
赋值时，变量的形状必须和接口的形状必须保持一致。

### 可选属性
`age?: number;`
```
interface Person{
	name: string;
	age?: number;
}
let tom: Person = {
	name: 'Tom'
};
```
**可选属性的含义时该属性可以不存在，但不允许添加未定义的属性**
### 任意属性 ***
有时希望一个接口有任意的属性
```
interface Person{
	name: string;
	age?: number;
	[propName: string]: any;
}
```
使用`[propName: string]`定义了任何属性取`string`类型的值。
一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性。
```
interface Person{
	name: string;
	age?: number;
	[propName: string]: string;
}
let tom: Person = {
	name: 'Tom',
	age: 25,
	gender: 'male'
}
//index.ts(3, 5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
//index.ts(7, 5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string;}' is not assignable to type 'Person'
//	Index signatures are incompatible
//		Type 'string | number' is not assignable to type 'string'.
//			Type 'number' is not assignable to type 'string'.
上例中，任意属性的值是string，但是可选属性age的值却是number，number不是string的子属性，所以会报错。
```

### 只读属性
```
interface Person{
	readonly id: number;
	name: string;
	age?: number;
	[propName: string]: any;
}
let tom: Person = {
	id: 89757,
	name: 'Tom',
	gender: 'male'
}
tom.id = 9257;
//index.ts(14, 5):error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
--------------------------------------------------
注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
interface Person{
	readyonly id: number;
	name: string;
	age?: number;
	[propName: string]: any;
}
let tom: Person = {
	name: 'Tom',
	gender: 'male'
}
tom.id = 89757;
//index.ts(8, 5): error TS2322: Type '{ name: string; gender: string}' is not assignable to type 'Person'
```



