class Tower extends Building {
    constructor(floors, material, address) {
        super(floors, material, address)
        this.hasElevator
        this.arcCapacity
        this.height
    }

    getFloorHeight() {
        return this.height / this.floors
    }

    toString() {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`,
            `Elevator: ${this.hasElevator ? "+" : "-"} `,
            `Arc reactor capacity: ${this.arcCapacity}`,
            `Floor height: ${this.getFloorHeight()}`,
        ].join('\n');
    }
}