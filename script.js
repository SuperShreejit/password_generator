const characterRange = document.getElementById('range');
const characterNumber = document.getElementById('characters');
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('number');
const symbols = document.getElementById('symbols');
const form = document.getElementById('form');
const display = document.getElementById('display');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65,90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97,122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47)
.concat(arrayFromLowToHigh(58,64)
.concat(arrayFromLowToHigh(91,96))
.concat(arrayFromLowToHigh(123,126))
);

characterNumber.addEventListener("input", syncCharacter);
characterRange.addEventListener("input", syncCharacter);
form.addEventListener("submit", e=> {
  e.preventDefault();
  const characterAmount = characterNumber.value;
  const includeUppercase = uppercase.checked;
  const includeNumbers = numbers.checked;
  const includeSymbols = symbols.checked;
  
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
  display.innerText = password;
});

function syncCharacter(e){
  const value = e.target.value;
  characterNumber.value = value;
  characterRange.value = value;
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols){
  let charCodes = LOWERCASE_CHAR_CODES;
  if(includeUppercase) { charCodes = charCodes.concat(UPPERCASE_CHAR_CODES); }

  if(includeNumbers) { charCodes = charCodes.concat(NUMBER_CHAR_CODES); }

  if(includeSymbols) { charCodes = charCodes.concat(SYMBOL_CHAR_CODES); }

  const passwordCharacters = [];
  for(let i = 0; i< characterAmount;i++){
    const charCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(charCode));
  }
  return passwordCharacters.join("");
}

