function countNumberOfArray(numbers: number[], value: number) {
    let count =0;
    numbers.forEach(element => {
        if(element == value){
            count++;
        }
    });
    return count;
}

console.log(countNumberOfArray([1,2,3,4,5,1,2], 3));
