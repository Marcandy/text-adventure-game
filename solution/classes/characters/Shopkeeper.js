/**** SHOPKEEPER CLASS ****/

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
            { name: "Magical Shield", price: 20 }
        ];
    }

    displayItemsForSale() {
        console.log(`\n--- ${this.name.toUpperCase()}'S SHOP ---`);
        this.itemsForSale.forEach((item, index) => {
            console.log(`[${index + 1}] ${item.name} - 💰 ${item.price} Rupees`);
        });
    }
}