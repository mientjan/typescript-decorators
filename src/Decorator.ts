import * as Functional from "./Functional";

// for auto import
class Decorator {}

export function log(name:string = '')
{
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
	{
		var originalMethod = descriptor.value;

		descriptor.value = function(...args: any[]) {
			console.log('log|in:', propertyKey, '|' + name, JSON.stringify(args));
			var result = originalMethod.apply(this, args);
			console.log('log|out:', propertyKey, '|' + name, JSON.stringify(args));
			return result;
		};

		return descriptor;
	}
}

export function debounce(wait:number)
{
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
	{
		var originalMethod = descriptor.value;

		descriptor.value = Functional.debounce(originalMethod, wait);

		return descriptor;
	}
}

export function throttle(threshhold:number)
{
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
	{
		var originalMethod = descriptor.value;

		descriptor.value = Functional.throttle(originalMethod, threshhold, target);

		return descriptor;
	}
}

export function readonly(target, key, descriptor) {
	descriptor.writable = false;
}

export function enumerable(value:boolean = false) {
	return function (target: Object, key:string, descriptor: TypedPropertyDescriptor<any>) {
		descriptor.enumerable = value;
	}
}


export function configurable(value:boolean = false) {
	return function (target: Object, key:string, descriptor: TypedPropertyDescriptor<any>) {
		descriptor.configurable = value;
	}
}