import {Stack} from "./Stack";
import {Queue} from "./Queue";


function isPalindrome(str: string): boolean {
    if (str.length === 0) {
        return false;
    }
    const stack = new Stack();
    const queue = new Queue();
    let length = str.length;
    for (let i = 0; i < length; i++) {
        stack.push(str[i]);
        queue.enqueue(str[i]);
    }

    for (let i = 0; i < length; i++) {
        if (stack.pop() !== queue.dequeue()) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome("acba"));

