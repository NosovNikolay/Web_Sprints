'use strict';

const { Avenger } = require('./Avenger');

module.exports.Team = class Team {
    constructor(id, avengers) {
        this.id = id
        this.avengers = []
        for (let i = 0; i < avengers.length; i++) {
            this.avengers[i] = avengers[i]
        }
    }

    clone() {
        return new Team(this.id, this.avengers)
    }

    battle({ damage }) {
        const newAvangers = [...this.avangers]
        for (const avanger of this.avangers) {
            avanger.aHp -= damage
            if (avanger.aHp <= 0)
                newAvangers.splice(
                    newAvangers.findIndex(v => v === avanger),
                    1
                )
        }
        this.avangers = newAvangers
    }

    calculateLosses(clonedTeam) {
        let loses = 0;
        for (let i = 0; i < clonedTeam.avengers.length; i++) {
            if (clonedTeam.avengers[i].hp <= 0) {
                loses += 1
            }
        }
        loses == 0 ? console.log(`We haven't lost anyone in this battle!`) :
            console.log(`In this battle we lost ${loses} Avengers.`)
    }
}