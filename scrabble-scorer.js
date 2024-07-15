// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   //0: [' '],
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let scrabbleWord = input.question("Let's play some scrabble! Enter a word:").toLowerCase();
   
   while(test (scrabbleWord)){
      scrabbleWord = input.question("Please enter a valid word. Enter a word:").toLowerCase();
   }

   return scrabbleWord;
}

function test(word) {
   let flag = false;
   let checkWord = word.split('');
   for (let x = 0; x<checkWord.length; x++){
      if(!(checkWord[x] in newPointStructure)){//this isnt a word
         console.log("This has a character that is not a letter in it.")
         flag = true;
      } 
   }
   return flag;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

let simpleScorer = function(word){
   return word.length;
};

let vowelBonusScorer = function(word){
   let arr = word.split('');
   let score = 0;
   for (let x = 0; x<arr.length;x++){
      if(arr[x]==='a')
         score +=3;
         else if (arr[x]==='e')
            score +=3;
            else if (arr[x]==='i')
               score +=3;
               else if (arr[x]==='o')
                  score +=3;
                  else if (arr[x]==='u')
                     score +=3;
                     else
                        score +=1;
   }
   return score;
};

let scrabbleScorer = function (word){
   word = word.toLowerCase().split('');
	let score = 0;
   
	for (let x = 0; x < word.length; x++) {
      score += newPointStructure[word[x]];
	}
	return score;
};

const scoringAlgorithms = [{
      name: "Simple Score",
      description : "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   }, 
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   }, 
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }];

function scorerPrompt() {
   console.log("What type of scoring algorithm would you like to use?");
   console.log( `0 is ${scoringAlgorithms[0].name} and it's description is ${scoringAlgorithms[0].description}`);
   console.log( `1 is ${scoringAlgorithms[1].name} and it's description is ${scoringAlgorithms[1].description}`);
   console.log( `2 is ${scoringAlgorithms[2].name} and it's description is ${scoringAlgorithms[2].description}`);
   let selection = -1;
   let choice = [0,1,2];
   while(choice.indexOf(selection)===-1){
      selection = Number(input.question("Please select between 0, 1, or 2. "));
      if (choice.indexOf(selection)===-1)
         console.log("Please choose 0, 1, or 2.");
   }
   return scoringAlgorithms[selection];
}

function transform(oldPoints) {
   let newObject = {};
   let counter = 0;
   for(number in oldPoints){
      
      for(let x = 0; x<oldPoints[number].length; x++){
      
         let letter = oldPoints[number][x].toLowerCase();
         counter ++;
         newObject[letter] = Number(number);
     
         //console.log(letter + " "+  newObject[letter] + " "+ counter );
      }
   }
    //console.log(newObject);
   return newObject;
};

function runProgram() {
   let scrabWord = initialPrompt();
   let scoringAlgorithm = scorerPrompt();
   let keepPlaying = true;
   console.log("You choose this scoring method: ", scoringAlgorithm.name);
   console.log(`Value for the word ${scrabWord}`, scoringAlgorithm.scorerFunction(scrabWord));
   while(keepPlaying){
      console.log("Would you like to keep playing?");
      let choice = input.question("Please choose yes or no: ").toLowerCase();
      if (choice === 'yes'|| choice === 'no'){
         if(choice === 'yes'){
            scrabWord = initialPrompt();
            scoringAlgorithm = scorerPrompt();
            console.log("You choose this scoring method: ", scoringAlgorithm.name);
            console.log(`Value for the word ${scrabWord}`, scoringAlgorithm.scorerFunction(scrabWord));
         }else{
            keepPlaying = false;
            console.log("Thank you for playing!");
         }
            
      }else{
         console.log("That was not a valid choice. Please choose yes or no.")
      }
   }
   

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
