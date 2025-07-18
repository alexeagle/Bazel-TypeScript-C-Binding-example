import { adder } from "libadder";

function add_three(a: number, b: number, c: number): number {
    return adder.add(adder.add(a, b), c);
}

// Example usage
console.log(`1 + 2 + 3 = ${add_three(1, 2, 3)}`);
