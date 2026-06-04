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
        log.success(`Link is now equipped with the ${weapon}!`);
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
            this.currentHearts = this.maxHearts;
            log.success(`🧚 A fairy has fully healed Link! Health: ${this.maxHearts}\n`);
        } else if (chance >= 7) {
            this.currentHearts = Math.min(this.maxHearts, this.currentHearts + 1);
            log.success(`💝 Link found a heart! Health: ${this.currentHearts}/${this.maxHearts}\n`);
        } else if (chance >= 5) {
            this.rupees += 5;
            log.success(`💎💎💎💎💎 Link found 5 rupees! Total: ${this.rupees}\n`);
        } else if (chance >= 3) {
            this.rupees++;
            log.success(`💎 Link found a rupee! Total: ${this.rupees}\n`);
        }
    }

    dodgeEnemy(enemyType, numEnemies) {
        let hitsTaken = 0;
        for (let i = 0; i < numEnemies; i++) {
            let chance = getRandomInRange(10);
            if (chance < 3) { // 30% hit chance
                this.currentHearts -= 0.5;
                hitsTaken++;
                log.hit(`Hit! Link loses 0.5 hearts.`);
                log.healthStatus(`${this.currentHearts} remaining`);
                if (this.currentHearts <= 0) {
                    log.alert("\n💀 GAME OVER. Link has fallen...");
                    return false; // Signal death
                }
            } else {
                log.miss(`Phew! A ${enemyType} missed Link.`);
            }
        }
        return true; // Still alive
    }

    fightEnemy(enemyType, numEnemies) {
        if (!this.weapon) {
            log.alert("Link cannot attack without a sword! He must try to dodge and flee!");
            return this.dodgeEnemy(enemyType, numEnemies);
        }

        console.log(`\nLink draws his ${this.weapon} and charges into battle!`);
        
        // Simulating turn-based resolution cleanly
        while (numEnemies > 0) {
            console.log(`\n🏆 Link defeats a ${enemyType}!`);
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
