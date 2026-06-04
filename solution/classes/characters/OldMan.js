/**** OLD MAN CLASS ****/

import Character from "./Character.js";

/*
   Inherits from Character.
   Serves specific purpose when interacting with hero.
   May or may not have items or coins for the hero.
   Initial instance will be to provide Link with a sword.
*/

export default class OldMan extends Character {
	constructor() {
		super("Old Man", "NPC", "A mysterious elder dwelling inside a dark cave.");
		this.hasGivenSword = false;
	}

	speak() {
		if (!this.hasGivenSword) {
			this.hasGivenSword = true;
			return "🔥 IT'S DANGEROUS TO GO ALONE! TAKE THIS.";
		}
		return "Master using it and you can have this.";
	}
}
