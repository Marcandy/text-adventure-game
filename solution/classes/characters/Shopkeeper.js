/**** SHOPKEEPER CLASS ****/

import { log } from "../../utils/logger.js";
import Character from "./Character.js";

/*
   Inherits from Character.
   Offers items for sale.
*/

export default class Shopkeeper extends Character {
	constructor() {
		super("Shopkeeper", "NPC", "A merchant standing behind a counter surrounded by items.");
		// Items modeled cleanly as structured data literals
		this.itemsForSale = [
			{ name: "Blue Potion", price: 10 },
			{ name: "Magical Shield", price: 20 },
		];
	}

	displayItemsForSale() {
		log.describeNPC(this.describe());
		log.dialogue(this.speak());
		log.dividerTop();
		this.itemsForSale.forEach((item, index) => {
			console.log(`[${index + 1}] ${item.name} - 💰 ${item.price} Rupees`);
		});
		console.log(`[${this.itemsForSale.length + 1}] Sorry, perhaps another time.`);
		log.divider();
	}

	speak() {
		return "Buy somethin', will ya!";
	}
}
