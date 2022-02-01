import { writeFile, readFile } from "fs";
import { shuffleCards } from "./cardLogic.js";

/**
 * Read and log the contents of the target JSON file
 * @param {string} filename - The name of the target JSON file
 * @returns undefined
 */
export function read(filename) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error("Reading error", readErr);
      return;
    }
    // We only log the value of jsonContentStr. We could also parse it
    // into a JS Object to access specific keys and values.
    console.log(jsonContentStr);
  };

  readFile(filename, "utf-8", handleFileRead);
}

/**
 * Overwrite contents of the target JSON file
 * @param {string} filename - The name of the target JSON file
 * @param {object} content - The content to write to the file.
 * @returns undefined
 */
export function write(filename, jsonContentObj) {
  // Convert the data from JS Object to string
  const jsonContentStr = JSON.stringify(jsonContentObj);
  // Write JSON string to target file
  writeFile(filename, jsonContentStr, (writeErr) => {
    if (writeErr) {
      console.error("Writing error", writeErr);
    }
  });
}

// The following code builds on the imports, write and read functions above.
// We omit the above code here for brevity.

/**
 * Add a key-value pair to the JSON object in the relevant file
 * @param {string} filename - The name of the target JSON file
 * @param {string} key - The name of the key we wish to add
 * @param {*} value - The data that corresponds to the given key
 * @returns undefined
 */
export function add(filename, key, value) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error("Reading error", readErr);
      return;
    }

    // Parse the JSON string from the file into a JS Object.
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Add the new key and value to the content object.
    jsonContentObj[key] = value;

    // Transform the updated content object back into a JSON string.
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated JSON to original file, overwriting original contents.
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.error("Writing error", writeErr);
        return;
      }
      console.log("Success!");
    });
  };

  // Read the file called filename and call handleFileRead on its contents.
  readFile(filename, "utf-8", handleFileRead);
}

export const modifyJsonFile = (filename, action) => {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.log("Reading error", readErr);
    }

    // Convert data from string to Object
    let jsonContentObj = JSON.parse(jsonContentStr);

    // TODO: Modify the data however we would like
    // updated deck
    // shuffled deck, popped deck, anything deck
    switch (action) {
      case "shuffle":
        jsonContentObj.cardDeck = shuffleCards(jsonContentObj.cardDeck);
        break;
      case "deal":
        // check if playerHand is undefined
        if (jsonContentObj.playerHand === undefined) {
          jsonContentObj.playerHand = [];
        }

        // move 2 cards
        const poppedCard1 = jsonContentObj.cardDeck.pop();
        const poppedCard2 = jsonContentObj.cardDeck.pop();

        console.log(`first card: ${poppedCard1}`);
        console.log(`second card: ${poppedCard2}`);

        jsonContentObj.playerHand.push(poppedCard1);
        jsonContentObj.playerHand.push(poppedCard2);

        break;
      case "high-card":
        if (jsonContentObj.playerHand === undefined) {
          jsonContentObj.playerHand = [];
        }
        if (jsonContentObj.computerHand === undefined) {
          jsonContentObj.computerHand = [];
        }

        const playerCard = jsonContentObj.cardDeck.pop();
        const computerCard = jsonContentObj.cardDeck.pop();

        console.log(`Human: ${playerCard.name} of ${playerCard.suit}`);
        console.log(`Computer: ${computerCard.name} of ${computerCard.suit}`);

        jsonContentObj.playerHand.push(playerCard);
        jsonContentObj.computerHand.push(computerCard);

        // logic to compare
        if (playerCard.rank > computerCard.rank) {
          console.log("Human wins!");
        } else if (computerCard.rank > playerCard.rank) {
          console.log("Computer wins!");
        } else {
          console.log("Draw!");
        }

        break;
      case "blackjack":
        // check if playerHand is undefined
        if (jsonContentObj.playerHand === undefined) {
          jsonContentObj.playerHand = [];
        }
        if (jsonContentObj.computerHand === undefined) {
          jsonContentObj.computerHand = [];
        }

        let playerScore = 0;

        // move 2 cards
        const playerCard1 = jsonContentObj.cardDeck.pop();
        const playerCard2 = jsonContentObj.cardDeck.pop();

        if (playerCard1.rank >= 10) {
          playerScore += 10;
        } else {
          playerScore += playerCard1.rank;
        }

        if (playerCard2.rank >= 10) {
          playerScore += 10;
        } else {
          playerScore += playerCard2.rank;
        }

        jsonContentObj.playerHand.push(playerCard1);
        jsonContentObj.playerHand.push(playerCard2);

        let computerScore = 0;

        // move 2 cards
        const computerCard1 = jsonContentObj.cardDeck.pop();
        const computerCard2 = jsonContentObj.cardDeck.pop();

        if (computerCard1.rank >= 10) {
          computerScore += 10;
        } else {
          computerScore += computerCard1.rank;
        }

        if (computerCard2.rank >= 10) {
          computerScore += 10;
        } else {
          computerScore += computerCard2.rank;
        }

        jsonContentObj.computerHand.push(computerCard1);
        jsonContentObj.computerHand.push(computerCard2);

        console.log(`Human score: ${playerScore}`);
        console.log(`${playerCard1.name} of ${playerCard1.suit}`);
        console.log(`${playerCard2.name} of ${playerCard2.suit}`);

        console.log(`Computer score: ${computerScore}`);
        console.log(`${computerCard1.name} of ${computerCard1.suit}`);
        console.log(`${computerCard2.name} of ${computerCard2.suit}`);

        // compare blackjack hands
        if (playerScore > computerScore) {
          console.log("Human wins!");
        } else if (computerScore > playerScore) {
          console.log("Computer wins!");
        } else {
          console.log("Draw!");
        }

        break;
    }

    // Convert data from Object to string
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated data to file
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.log("writing error", writeErr);
      }
    });
  };

  // Read original data from file
  readFile(filename, "utf-8", handleFileRead);
};
