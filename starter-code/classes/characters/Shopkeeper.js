/**** SHOPKEEPER CLASS ****/

import { log } from "../../utils/logger.js";
import Character from "./Character.js";

/*
   Inherits from Character.
   Offers items for sale.
*/

// TODO: Inherit from Character
export default class Shopkeeper extends Character {

	// TODO: Define constructor
	constructor() {
		super("Shopkeeper", "NPC", "A merchat standing behind a counter surrounded by items");
		this.itemForSale = [
			{
				name: "Blue Potion",
				price: 10
			},
			{
				name: "Magic Shield",
				price: 10
			}
		]
	}

	speak() {
		return " Buy something, will ya!"
	}

	// TODO: Define method that displays items for sale
	displayItemForSale() {
		log.describeNPC(this.describe());
		log.dialogue(this.speak());
		log.dividerTop();

		this.itemForSale.forEach((item, index) => {
			console.log(`[${index + 1}] ${item.name}`)
		})
	}

}
