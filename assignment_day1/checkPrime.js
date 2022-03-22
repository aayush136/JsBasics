function checkPrime(num){
    let isPrime = true;
    const cond = Math.sqrt(num);

    for( let div=2; div<=cond; div++ ) {
        if( num % div == 0 ) {
            isPrime = false;
            break;
        }
    }

    isPrime ? console.log("Prime Number") : console.log("Not Prime Number");
}

// function calling
const num = 7;
checkPrime(num);