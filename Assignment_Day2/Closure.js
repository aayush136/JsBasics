function hello() {
    let value = 0;
    return {
        add: function (a) {
            value += a;
        },
        sub: function (a) {
            value -= a;
        },
        reset: function (a) {
            value = 0;
        },
        inc: function () {
            value++;
        },
        dec: function () {
            value--;
        },
        print: function () {
            console.log(value);
        }
    }
}
const ans = hello();
ans.add(1);
ans.sub(1);
ans.print();
