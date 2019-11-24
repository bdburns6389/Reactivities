// Basic demo for typescript functionality

// Assign type to variable for compile-time checking.
let data: number = 42;

data = 33;

// Use interfaces to control what objects should contain
export interface ICar {
  color: string;
  model: string;
  // ? allows an optional member of an interface.
  topSpeed?: number;
}

const car1: ICar = {
  color: "blue",
  model: "BMW"
};

const car2: ICar = {
  color: "red",
  model: "Mercedes",
  topSpeed: 100
};

// Parameters must be explicitly given a type, even if that
// type is 'any'.  Function return type can also be explicitly
// typed, but this is optional.
const multiply = (x: number, y: number): number => {
  return x * y;
};

export const cars = [car1, car2];
