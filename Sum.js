let suming = 0;
function sum(num) {

    if (num != undefined) {
        suming += num;

        return sum;
    }
    else {
        console.log(suming);
        suming = 0;
    }
}

sum(2)(3)();
sum(1)(2)(3)();
sum();