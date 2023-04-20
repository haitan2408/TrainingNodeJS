import {Stack} from "./Stack";

function reverse(arr: number[]) {
    const stacks = new Stack<number>();
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        stacks.push(arr[i]);
    }

    for (let i = 0; i < length; i++) {
        arr[i] = stacks.pop();
    }
    return arr;
}
