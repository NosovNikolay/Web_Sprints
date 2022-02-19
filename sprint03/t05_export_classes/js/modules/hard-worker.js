export { HardWorker }

class HardWorker {
    set age(value) {
        if (value >= 1 && value < 100)
            this._age = value
    }

    set salary(value) {
        if (value >= 100 && value < 10000)
            this._salary = value
    }

    toObject() {
        return this
    }
};