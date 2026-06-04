/**** HERO CLASS ****/

import Character from "./Character.js";

/*
   Inherits from Character.
   Starts with no armor, no weapon, no items, no coins.
*/

export default class Hero extends Character {
    constructor() {
        super("Link", "hero", "A young adventurer on a brave quest to save Hyrule.");
        // TODO: Add properties unique to hero
    }

    equipWeapon(weapon) {
        // TODO: Complete method
    }

    addItemToInventory(item) {
        // TODO: Complete method
    }

    buyItem(itemObj) {
        // TODO: Complete method
    }

    getReward() {
        // TODO: Complete method
    }

    dodgeEnemy(enemyType, numEnemies) {
        // TODO: Complete method
    }

    fightEnemy(enemyType, numEnemies) {
        // TODO: Complete method
    }
}
