/**** CHARACTER CLASS ****/

/*
   Parent class for all non-enemy characters. Structures common properties and behaviors.
*/

export default class Character {
	constructor(name, charType, description, itemList = [], rupees = 0) {
		this.name = name;
		this.type = charType;
		this.desc = description;
		this.items = itemList;
		this.rupees = rupees;
	}

	describe() {
		return `[${this.type.toUpperCase()}] ${this.name}: ${this.desc}`;
	}

	getInventory() {
		if (this.items.length === 0) return `${this.name}'s pack is empty.`;
		return `${this.name}'s Inventory: ${this.items.join(", ")} | Rupees: ${this.rupees}`;
	}

	speak() {
		return `${this.name} stares silently...`;
	}
}
