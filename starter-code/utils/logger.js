/**** LOG FORMATTING ****/

import chalk from "chalk";

export const log = {
    
    // Title text
    title: text => {
        console.log(chalk.bold.green(text));
    },
    
    // Validation warnings / errors / missing items
    alert: text => {
        console.log(`\n🚨 WARNING: ${chalk.bold.red(text)}`);
    },

	// Description of NPC preceding dialogue
	describeNPC: text => {
		console.log(chalk.dim.cyan(`\n${text}`));
	},

	// Dialogue with NPCs (Old Man / Shopkeeper)
	dialogue: text => {
		console.log(chalk.bold.yellow(`\n"${text}"`));
	},

	// Lines formed with "="
	divider: () => {
		console.log(
			chalk.gray("==================================================================")
		);
	},

	// Lines formed with "=" preceded by blank row
	dividerTop: () => {
		console.log(
			chalk.gray("\n==================================================================")
		);
	},

	// User input requirements / action choices
	instruction: text => {
		console.log(chalk.inverse.bold.white(`\n ACTION REQUIRED: ${text} `));
	},

	// Story text / descriptive atmosphere
	narrative: text => {
		console.log(`\n${chalk.italic.cyan(text)}`);
	},

	// Link gets injured
	hit: text => {
		console.log(`\n💥 ${chalk.hex("#ff8c00")(text)}`);
	},

	// Link dodges an attack
	miss: text => {
		console.log(`\n${chalk.hex("#7516c9")(text)}`);
	},

	// Link success events (Rupees, hearts, weapon drops)
	success: text => {
		console.log(chalk.bold.green(`\n✨ SUCCESS: ${text}`));
	},

	// Status metrics for rupees
	moneyStatus: text => {
		console.log(`\n💎 ${chalk.dim.green(text)}`);
	},

	// Status metrics for hearts
	healthStatus: text => {
		console.log(`\n❤️‍🩹 ${chalk.dim.hex("#ff8c00")(text)}`);
	},
};
