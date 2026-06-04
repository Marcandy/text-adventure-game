/**** GAME CLASS ****/

import readlineSync from "readline-sync";
import Hero from "./characters/Hero.js";
import OldMan from "./characters/OldMan.js";
import Shopkeeper from "./characters/Shopkeeper.js";
import { log } from "../utils/logger.js";

/*
   Spin up a new game and handle interactive gameplay.
*/

export default class Game {
	constructor() {
		this.player = new Hero();
		this.oldMan = new OldMan();
		this.shopkeeper = new Shopkeeper();
		this.currentStep = 0;
		this.isGameOver = false;

		this.encounters = [
			{
				type: "cave",
				npc: this.oldMan,
				intro: "Link stands in the base of a canyon in Hyrule, surrounded by high, moss-covered walls. He sees three narrow passages leading outward, but is curious about the dark cave opening just in front of him.",
				prompt: "Would you like Link to enter the cave? (Y/N): ",
			},
			{
				type: "combat",
				enemyType: "Tektite",
				count: 4,
				intro: "Link takes the western passage and emerges into another open canyon area littered with craggy rocks. Four tektites are hopping around, each looking at him menacingly with its enormous eye!",
			},
			{
				type: "combat",
				enemyType: "Octorok",
				count: 4,
				intro: "Link heads north into an area with long, narrow rows of bare rock. As he steps forward, he thinks he sees another cave along the north canyon wall, but four octoroks are racing about, spitting rocks at him!",
			},
			{
				type: "shop",
				npc: this.shopkeeper,
				intro: "Link is standing in front of a cave. It has a shop symbol over the narrow opening.",
				prompt: "Would you like Link to enter the shop? (Y/N): ",
			},
		];
	}

	displayIntroduction() {
		log.dividerTop();
		console.log("          🛡️  THE LEGEND OF ZELDA: HUMBLE BEGINNINGS  🛡️");
		log.divider();
		console.log("\nIt's 1986, and the kingdom of Hyrule is in chaos.\n");
		console.log("The evil prince of darkness, Ganon, has stolen the Triforce of");
		console.log("Power and is holding Princess Zelda captive in Death Mountain.\n");
		console.log("Link, you must grab a sword, defeat his minions, and prepare");
		console.log("to rescue the Princess! Only then can order be restored to Hyrule.\n");
		log.divider();

		readlineSync.question("\nPress Enter to begin your quest...");
	}

	handleCombat(enemyType, count) {
        let choosing = true;
		while (choosing) {
			log.instruction(`Will Link FIGHT or RUN?: `);
			let response = readlineSync.question("").toUpperCase();

			if (response === "FIGHT" || response === "F") {
				const survived = this.player.fightEnemy(enemyType, count);
				if (!survived) this.isGameOver = true;
                choosing = false;
			} else if (response === "RUN" || response === "R") {
				log.narrative(`💨 Link runs through the danger zone, trying to dodge the attacks!`);
				const survived = this.player.dodgeEnemy(enemyType, count);
				if (!survived) this.isGameOver = true;
                choosing = false;
			} else {
				log.alert("Invalid action. Type 'FIGHT' or 'RUN'.");
			}
		}
	}

	handlePurchase(shopkeeper) {
		let selection = readlineSync.questionInt("\nChoose an item to purchase: ");
		while (
			isNaN(selection) ||
			selection < 1 ||
			selection > shopkeeper.itemsForSale.length + 1
		) {
			selection = readlineSync.questionInt("\nPlease enter a number: ");
		}
		if (selection <= shopkeeper.itemsForSale.length) {
			this.player.buyItem(shopkeeper.itemsForSale[selection - 1]);
		}
	}

	playNextTurn() {
		if (this.isGameOver) return;

		const encounter = this.encounters[this.currentStep];
		log.narrative(encounter.intro);

		if (encounter.type === "cave") {
			log.instruction(encounter.prompt);
			let choice = readlineSync.question("").toUpperCase();
			if (choice === "Y") {
				log.describeNPC(encounter.npc.describe());
				log.dialogue(encounter.npc.speak());
				this.player.addItemToInventory("Magical Sword");
			} else {
				log.narrative("Link walks past the cave entrance... it feels like a bad idea.");
			}
		} else if (encounter.type === "combat") {
			this.handleCombat(encounter.enemyType, encounter.count);
		} else if (encounter.type === "shop") {
			log.instruction(encounter.prompt);
			let choice = readlineSync.question("").toUpperCase();
			if (choice === "Y") {
                encounter.npc.displayItemsForSale();
				log.moneyStatus(`Link currently has ${this.player.rupees} rupees.`);
				this.handlePurchase(encounter.npc);
			} else {
				log.narrative("Link skips the shop and keeps moving.");
			}
		}

		this.currentStep++;

		if (this.currentStep >= this.encounters.length && !this.isGameOver) {
			log.dividerTop();
			log.success("CONGRATULATIONS! Link survived his first encounters!\n");
            if (this.player.items.length > 0 || this.player.rupees > 0) {
                log.narrative("With his loot secure, he's ready to continue his journey to Death Mountain!");
            }
			log.divider();
			this.isGameOver = true;
		}
	}
}
