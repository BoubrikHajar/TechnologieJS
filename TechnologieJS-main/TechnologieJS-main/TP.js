#!/usr/bin/env node
import inquirer from 'inquirer';
import axios from 'axios';


// Les points initiaux de chaque joueur 
const PLAYER_HP = 300;
const BOT_HP = 300;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to get Pokemon data from the API
async function getPokemon(name) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const { id, name: pokemonName, moves } = response.data;

        // Select 5 random moves
        const selectedMoves = [];
        while (selectedMoves.length < 5) {
            const randomMove = moves[getRandomInt(0, moves.length - 1)].move.url;
            const moveResponse = await axios.get(randomMove);
            const { name, accuracy, power, pp } = moveResponse.data;

            // Ensure the move has power, accuracy, and pp
            if (power && accuracy && pp) {
                selectedMoves.push({ name, accuracy, power, pp });
            }
        }

        return { id, name: pokemonName, moves: selectedMoves };
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        return null;
    }
}

// permet au bot de choisir une attaque de manière aléatoire parmi les attaques valable 
function botChooseMove(moves) {
    const availableMoves = moves.filter(move => move.pp > 0);
    return availableMoves[getRandomInt(0, availableMoves.length - 1)];
}

// Function to perform a move, considering accuracy and pp
function performMove(attacker, defender, move) {
    console.log(`${attacker.name} uses ${move.name}!`);

    // Check if the move hits
    if (Math.random() * 100 > move.accuracy) {
        console.log(`${move.name} missed!`);
        return defender.hp;
    }

    // Decrease PP
    move.pp -= 1;

    console.log(`It hits for ${move.power} damage!`);
    defender.hp -= move.power;
    return defender.hp;
}

// Main Game Loop
async function startGame() {
    const { playerName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'playerName',
            message: "Enter your Pokémon's name:"
        }
    ]);

    const playerPokemon = await getPokemon(playerName);

    if (!playerPokemon) {
        console.log("Could not retrieve your Pokémon. Please try again.");
        return;
    }

    const botPokemon = await getPokemon('pikachu');

    let playerHp = PLAYER_HP;
    let botHp = BOT_HP;

    console.log(`You chose ${playerPokemon.name}!`);
    console.log(`Bot chose ${botPokemon.name}!`);

    // Main game loop
    while (playerHp > 0 && botHp > 0) {
        console.log("\nYour Moves:");
        const moveChoices = playerPokemon.moves.map((move, idx) => ({
            name: `${move.name} (Power: ${move.power}, Accuracy: ${move.accuracy}%, PP: ${move.pp})`,
            value: idx
        }));

        // Player chooses a move
        const { moveIdx } = await inquirer.prompt([
            {
                type: 'list',
                name: 'moveIdx',
                message: 'Choose your move:',
                choices: moveChoices
            }
        ]);

        const playerMove = playerPokemon.moves[moveIdx];
        if (playerMove.pp > 0) {
            botHp = performMove(playerPokemon, { name: botPokemon.name, hp: botHp }, playerMove);
        } else {
            console.log(`${playerMove.name} is out of PP!`);
            continue;
        }

        if (botHp <= 0) {
            console.log(`${botPokemon.name} fainted! You win!`);
            break;
        }

        // Bot chooses a move
        const botMove = botChooseMove(botPokemon.moves);
        playerHp = performMove(botPokemon, { name: playerPokemon.name, hp: playerHp }, botMove);

        if (playerHp <= 0) {
            console.log(`${playerPokemon.name} fainted! Bot wins!`);
            break;
        }

        console.log(`\nPlayer HP: ${playerHp}`);
        console.log(`Bot HP: ${botHp}`);
    }
}

// Start the game
startGame();
