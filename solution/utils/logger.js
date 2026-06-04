/**** LOG FORMATTING ****/

import chalk from "chalk";

export const log = {
    // Lines formed with "="
    divider: () => {
        console.log(chalk.gray("=================================================================="));
    },

    // Story text / descriptive atmosphere
    narrative: (text) => {
        console.log(chalk.italic.cyan(`\n${text}`));
    },

    // User command requirements / action choices
    instruction: (text) => {
        console.log(chalk.bold.bgBlue.white(` 🎮 ACTION REQUIRED `) + " " + chalk.cyan(text));
    },

    // Dialogue with NPCs (Old Man / Shopkeeper)
    dialogue: (speaker, text) => {
        console.log(`${chalk.bold.yellow(`🗣️  [${speaker.toUpperCase()}]:`)} ${chalk.yellowBright(`"${text}"`)}`);
    },

    // Validation warnings / errors / missing items
    alert: (text) => {
        console.log(chalk.bold.red(`🚨 WARNING: ${text}`));
    },

    // Link success events (Rupees, hearts, weapon drops)
    success: (text) => {
        console.log(chalk.bold.green(`✨ SUCCESS: ${text}`));
    },
    
    // Status metrics block formatting
    status: (text) => {
        console.log(chalk.dim.green(`📊 [STATUS]: ${text}`));
    }
};