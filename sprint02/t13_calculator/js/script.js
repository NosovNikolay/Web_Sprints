function Calculator() {
    this.result = 0;
    this.init = (n) => {
        this.result = n
        return this
    };

    this.add = (n) => {
        this.result += n;
        return this
    };

    this.mul = (n) => {
        this.result *= n;
        return this
    };

    this.div = (n) => {
        this.result /= n;
        return this
    };

    this.sub = (n) => {
        this.result -= n;
        return this
    };

    this.alert = () => {
        setTimeout(() => alert(this.result), 5000)
        return this
    };
}

// const calc = new Calculator();
// console.log(calc.init(2).add(2).mul(3).div(4).sub(2).result)
// calc.alert()