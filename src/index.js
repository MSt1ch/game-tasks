
import style from "./main.css";
import $ from 'jquery';


import jquerySortable from 'jquery-ui-sortable-npm/jquery-ui-sortable.js';

import {dictionary} from './js/dictionary/dictionary.js';

;{
const _ = require('lodash');

let dictionaryKeys, sizeDictionary, randomWord, randomWordArray;

const buttonTranslate = document.querySelector(".translation-submit");
const translationPopup = document.querySelector(".translation-popup");
const popupsOverlay = document.querySelector(".popups-overlay");
const translationPopupText = document.querySelector('.translation-popup-text');




///////////////////  speech word
const speechRepeatBtn = document.querySelector(".speech-repeat-btn");

const speechSubmit = document.querySelector(".speech-submit");
const speachWord = randomWord;
const synth = window.speechSynthesis;


  function speak(randomWord){
    let voices;
    voices = synth.getVoices();
    if (randomWord !== '') {
    var utterThis = new SpeechSynthesisUtterance(randomWord);

    }
    utterThis.voice = voices[1];
    utterThis.pitch = 1.1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    console.log(randomWord);
  }



  speechRepeatBtn.addEventListener('click', (event) =>{
    event.preventDefault();

    speak(randomWord);


  });


  speechSubmit.addEventListener('click', () =>{
    let inputWord = document.querySelector('.speech-input');
    inputWord = _.lowerCase(inputWord.value);

    $('.speech-popup').fadeOut('faster');
    $('.popups-overlay').fadeOut('faster');
    console.log(inputWord, randomWord,  (inputWord == randomWord ? true : false) )
  });



////////////////////// random dictionary word


  (function findRandomWord(dictionary){
    let dictionaryKeys = _.keys(dictionary);
    let sizeDictionary = _.size(dictionary);
    randomWord = dictionaryKeys[_.random(sizeDictionary - 1)]
    randomWordArray = dictionary[randomWord];
    console.log('ключ: ', randomWord , randomWordArray);

    addTranslationText(randomWord, randomWordArray);

  })(dictionary);



////////////// calculation
  const calculationPopupText = document.querySelector(".calculation-popup-text");
  const buttonCalculation = document.querySelector(".calculation-submit");

  const operator = {
    addition: "+",
    subtraction: "-",
    multiplication: "*",
  };

  let resultCalculation;
  (function randomCalculation(operator){
    let operator_1, operator_2, operatorSize, operatorKeys;
    let randomOperation, randomOperate;
    operator_1 = _.random(1,10);
    operator_2 = _.random(1,10);
    operatorKeys = _.keys(operator);
    operatorSize = _.size(operator);
    randomOperate = operatorKeys[_.random(operatorSize - 1)];
    randomOperation = operator[randomOperate];
    resultCalculation = operator_1 + randomOperation + operator_2;
    resultCalculation = eval(resultCalculation);
    // console.log(operator_1,operator_2, eval(resultCalculation));

    addCalculationText(operator_1, operator_2, randomOperation);

  })(operator);

  function addCalculationText(operator_1, operator_2, randomOperation){
    calculationPopupText.innerHTML = `<div class="calculation-popup-text__title">
                                       <h3>Please, solve a mathematical example:</h3><br>
                                       <div>
                                         <span>${operator_1}</span>
                                         <span>${randomOperation}</span>
                                         <span>${operator_2}</span>
                                         <span> = ?</span>
                                       </div>
                                      </div>
                                      `
  };

  buttonCalculation.addEventListener('click', () =>{
    let result;
    let inputResult= document.querySelector('.calculation-input');
    result = inputResult.value;
    $('.calculation-popup').fadeOut('faster');
    $('.popups-overlay').fadeOut('faster');
    result == resultCalculation ? true : false;
    console.log(result == resultCalculation ? true : false)
  });



///////////// translate word


  function addTranslationText(randomWord, randomWordArray){
    translationPopupText.innerHTML = `<div class="translation-popup-text__title">
                                       <h3>Please, translate this word:</h3><br>
                                       <h2>${randomWord}</h2>
                                      </div>
                                      `

  };



  buttonTranslate.addEventListener('click', () =>{
    let inputWord = document.querySelector('.translation-input');
    inputWord = _.lowerCase(inputWord.value);
    $('.translation-popup').fadeOut('faster');
    $('.popups-overlay').fadeOut('faster');
    console.log( !(_.isUndefined(_.find(randomWordArray, (item) =>{
              return item == inputWord})
            )) )
  });

// $('.translation-popup').fadeIn('slow');
// $('.popups-overlay').fadeIn('slow');

//////////////////// sortable word

const sortableList = document.querySelector('.create-word-sortable');
const createWordSubmit = document.querySelector('.create-word-submit');

$( "#sortable" ).sortable();

(function addSortableText(randomWord){
  let sortableLi= '', rightAnswer;
  rightAnswer = randomWord;
  randomWord = _.shuffle(randomWord);
  _.map(randomWord, (item)=>{
    sortableLi +=`<li class="sortable__letter">${item}</li>`
  })
  // console.log(sortableLi);
  sortableList.innerHTML = sortableLi;
})(randomWord)

createWordSubmit.addEventListener('click', () =>{
  let lettersWord ='';
  _.map($('.sortable__letter'), (item)=>{
    lettersWord += item.textContent;
    $('.create-word-popup').fadeOut('faster');
  });


  console.log(lettersWord == randomWord ? true : false);

});


}
