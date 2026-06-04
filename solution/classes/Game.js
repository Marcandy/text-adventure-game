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
				intro: "Link stands in North Hyrule. He sees a dark cave opening in front of him.",
				prompt: "Would you like Link to enter the cave? (Y/N): ",
			},
			{
				type: "combat",
				enemyType: "Tektite",
				count: 4,
				intro: "Link walks west into a rocky canyon and sees four Tektites hopping around!",
			},
			{
				type: "combat",
				enemyType: "Octorok",
				count: 4,
				intro: "Link heads north toward a river. Four Octoroks are spitting rocks at him quickly!",
			},
			{
				type: "shop",
				npc: this.shopkeeper,
				intro: "Behind the river, Link discovers a hidden cave opening with a shop symbol over it.",
				prompt: "Would you like Link to enter the shop? (Y/N): ",
			},
		];
	}

	displayIntroduction() {
		log.divider();
		console.log("🛡️  THE LEGEND OF ZELDA: COMPACT ARCHITECTURAL DEMO  🛡️");
		log.divider();
		console.log("It's 1986, and the kingdom of Hyrule is in chaos.\n");
		console.log("The evil prince of darkness, Ganon, has stolen the Triforce of Power");
		console.log("and is holding Princess Zelda captive in Death Mountain.\n");
		console.log("Link, you must grab a sword, defeat his minions, and prepare");
		console.log("to rescue the Princess! Only then can order be restored to Hyrule.");
		log.divider();

		readlineSync.question("\nPress Enter to begin your quest...");
	}

	handleCombat(enemyType, count) {
		let choosing = true;
		while (choosing) {
			log.instruction(`Will Link FIGHT or FLEE/DODGE? (FIGHT/DODGE): `);
			let response = readlineSync.question("").toUpperCase();

			if (response === "FIGHT") {
				const survived = this.player.fightEnemy(enemyType, count);
				if (!survived) this.isGameOver = true;
				choosing = false;
			} else if (response === "DODGE" || response === "FLEE") {
				log.narrative(`Link runs through the danger zone, trying to dodge out of the way!`);
				const survived = this.player.dodgeEnemy(enemyType, count);
				if (!survived) this.isGameOver = true;
				choosing = false;
			} else {
				log.alert("Invalid action. Type 'FIGHT' or 'DODGE'.");
			}
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
				log.narrative(encounter.npc.describe());
				log.dialogue(encounter.npc.name, encounter.npc.speak());
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
				log.narrative(encounter.npc.describe());
				encounter.npc.displayItemsForSale();

				log.status(`Link currently has: [${this.player.rupees} Rupees]`);
				log.dialogue(encounter.npc.name, "PAY ME FOR THE DOOR REPAIR CHARGE!");
			} else {
				log.narrative("Link skips the shop and keeps moving.");
			}
		}

		this.currentStep++;

		if (this.currentStep >= this.encounters.length && !this.isGameOver) {
			console.log("\n");
			log.divider();
			log.success("CONGRATULATIONS! Link survived the wilderness track!");
			console.log(this.player.displayInventory());
			log.narrative("With his weapons and coins secure, he's ready for Death Mountain!");
			log.divider();
			this.isGameOver = true;
		}
	}
}
