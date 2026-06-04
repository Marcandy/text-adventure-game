/**** GAME CLASS ****/

import readlineSync from "readline-sync";
import { log } from "../utils/logger.js";
import Hero from "./characters/Hero.js";
import OldMan from "./characters/OldMan.js";
import Shopkeeper from "./characters/Shopkeeper.js";

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
		log.title("          🛡️  THE LEGEND OF ZELDA: HUMBLE BEGINNINGS  🛡️");
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
        // TODO: Complete method
	}

	handlePurchase(shopkeeper) {
		// TODO: Complete method
	}

	playNextTurn() {
		// TODO: Complete method
	}
}
