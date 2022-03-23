let counter = 0;
let ans = 0;
function setAfter(count, fun) {
    let counter = 0;
    return function ans() {
        counter++;
        if (counter > count){
            return fun();
        }
    }

}
function callMe() {
    return "nothing";
}
const hello = setAfter(2, callMe);
console.log(hello());
console.log(hello());
console.log(hello());