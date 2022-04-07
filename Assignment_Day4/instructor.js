const instructor = {

    evaluate() {
        let sum = this.aptitude + this.coreskill;
        console.log(sum);
    }

}
let arr = [{ aptitude: 10, coreskill: 20 },
{ aptitude: 30, coreskill: 40 },
{ aptitude: 50, coreskill: 60 }];
arr.forEach((obj) => {
    const evaluate = instructor.evaluate;
    const make_eval = evaluate.bind(obj);
    make_eval();
})
