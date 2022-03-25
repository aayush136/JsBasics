const counter = {
    value: 0,
    increment() {
        this.value += 1;
        return this;
    },
    decrement() {
        this.value -= 1;
        return this;
    }
}

counter.increment(); // value is 1
counter.increment(); // value is 2
counter.decrement(); // value is 1

// now we want to do something like below

const ans = counter.increment().increment().decrement(); // figure out how to do this
console.log(ans);
