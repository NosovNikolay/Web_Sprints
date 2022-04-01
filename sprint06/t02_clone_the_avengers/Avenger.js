'use strict'

exports.Avenger = class Avenger extends Function {
    constructor(name, alias, gender, age, powers, hp) {
        super()

        this.aName = name
        this.aAlias = alias
        this.aGender = gender
        this.aAge = age
        this.aPowers = powers

        const ptr = this

        function Avanger() {
            return `${ptr.aAlias.toUpperCase()}\n${ptr.aPowers.join('\n')}`
        }

        Avanger.aHp = hp

        Avanger.toString = () =>
            `name: ${this.aName}\ngender: ${this.aGender}\nage: ${this.aAge}\nhp: ${Avanger.aHp}`

        return Avanger
    }
}