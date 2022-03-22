function findFibonacci(n){
    if( n <= 1 ) return 0;
    if( n <= 3 ) return 1;

    let prev = 0;
    let next = 1;
    let sum = 0;

    while( n > 2 ) {
        sum = prev + next;
        prev = next;
        next = sum;
        n--;
    }

    return next;
}

// function calling
const num = 10;
console.log( findFibonacci(num) );