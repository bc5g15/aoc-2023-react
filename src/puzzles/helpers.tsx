export const sum = (arr: number[]) => arr.reduce((acc, cur) => acc+cur, 0);

const gcd = (a: number, b: number) => {
    for (let temp = b; b !== 0;) {
        b = a % b;
        a = temp;
        temp = b;
    } 
    return a;
}

export const leastCommonMultiple = (...numbers: number[]) => {
    const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
    return numbers.reduce((acc, cur) => _lcm(acc, cur));
}