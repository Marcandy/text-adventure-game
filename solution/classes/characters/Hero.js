/**** HERO CLASS ****/

import Character from "./Character.js";
import { getRandomInRange } from "../../utils/mathHelpers.js";
import { log } from "../../utils/logger.js";

/*
   Inherits from Character.
   Starts with no armor, no weapon, no items, no coins.
*/

export default class Hero extends Character {
    constructor() {
        super("Link", "hero", "A young adventurer on a brave quest to save Hyrule.");
        this.maxHearts = 3;
        this.currentHearts = 3;
        this.weapon = null;
        this.armorLevel = 1;
    }

    equipWeapon(weapon) {
        this.weapon = weapon;
        log.success(`Link equipped the ${weapon}!`);
    }

    addItemToInventory(item) {
        if (item.toLowerCase().includes("sword")) {
            this.equipWeapon(item);
        } else {
            this.items.push(item);
            log.success(`Packed away: ${item}.`);
        }
    }

    buyItem(itemObj) {
        if (this.rupees >= itemObj.price) {
            this.rupees -= itemObj.price;
            this.addItemToInventory(itemObj.name);
            return true;
        } else {
            log.alert(`Link only has ${this.rupees} rupees. ${itemObj.name} costs ${itemObj.price}!`);
            return false;
        }
    }

    getReward() {
        let chance = getRandomInRange(10);
        if (chance >= 9) {
            this.currentHearts = Math.min(this.maxHearts, this.currentHearts + 1);
            log.success(`Link found a heart! Health: ${this.currentHearts}/${this.maxHearts}`);
        } else if (chance >= 7) {
            this.rupees += 5;
            log.success(`Link found 5 rupees! Total: ${this.rupees}`);
        } else if (chance >= 4) {
            this.rupees++;
            log.success(`Link found a rupee! Total: ${this.rupees}`);
        }
    }

    dodgeEnemy(enemyType, numEnemies) {
        let hitsTaken = 0;
        for (let i = 0; i < numEnemies; i++) {
            let chance = getRandomInRange(10);
            if (chance < 3) { // 30% hit chance
                this.currentHearts -= 0.5;
                hitsTaken++;
                console.log(`💥 Hit! Link loses 0.5 hearts. (${this.currentHearts} remaining)`);
                if (this.currentHearts <= 0) {
                    console.log("💀 GAME OVER. Link has fallen...");
                    return false; // Signal death
                }
            } else {
                console.log(`💨 Phew! A ${enemyType} missed Link.`);
            }
        }
        return true; // Still alive
    }

    fightEnemy(enemyType, numEnemies) {
        if (!this.weapon) {
            log.alert("Link cannot attack without a sword! He must try to dodge and flee!");
            return this.dodgeEnemy(enemyType, numEnemies);
        }

        console.log(`⚔️ Link draws his ${this.weapon} and charges into battle!`);
        
        // Simulating turn-based resolution cleanly
        while (numEnemies > 0) {
            console.log(`🗡️ Link defeats a ${enemyType}!`);
            this.getReward();
            numEnemies--;
            
            // Remaining enemies retaliate immediately
            if (numEnemies > 0) {
                const stillAlive = this.dodgeEnemy(enemyType, numEnemies);
                if (!stillAlive) return false;
            }
        }
        return true;
    }
}
