class Timer {
    constructor(id, delay, stopCount) {
        this.title = id
        this.delay = delay
        this.stopCount = stopCount
    }

    start() {
        console.log(`Timer ${this.title} started (delay=${this.delay},  stopCount=${this.stopCount})`);
        this.timer = setInterval(() => this.tick(), this.delay);
    }
    tick() {
        this.stopCount--;
        console.log(`Timer ${this.title} Tick! | cycles left ${this.stopCount}`);
        if (this.stopCount === 0) {
            this.stop();
        }
    }
    stop() {
        clearInterval(this.timer);
        console.log(`Timer ${this.title} stopped`);
    }
}

function runTimer(id, delay, counter) {
    let timer = new Timer(id, delay, counter).start();

}

runTimer("Bleep", 1000, 5)