import $ from 'jquery';
import {dictionary} from '../dictionary/dictionary.js';

class Translate {
    constructor() {
        this.randomWord = null;
        this.randomWordArray = null;
        
    }
    findRandomWord(dictionary) {
        let dictionaryKeys = _.keys(dictionary);
        let sizeDictionary = _.size(dictionary);
        this.randomWord = dictionaryKeys[_.random(sizeDictionary - 1)]
        this.randomWordArray = dictionary[this.randomWord];
    }

    addTranslationText(randomWord, randomWordArray) {
        const translationPopupText = document.querySelector('.translation-popup-text');
        translationPopupText.innerHTML = `<div class="translation-popup-text__title">
                                           <h3>Please, translate this word:</h3><br>
                                           <h2>${randomWord}</h2>
                                          </div>
                                          `

    };

    setTranslateListener() {
        return new Promise((res) => {
            const buttonTranslate = document.querySelector(".translation-submit");
            buttonTranslate.addEventListener('click', () => {
                let inputWord = document.querySelector('.translation-input');
                if(inputWord.value) {
                    inputWord = _.lowerCase(inputWord.value);
                    $('.translation-popup').fadeOut('faster');
                    res(!(_.isUndefined(_.find(this.randomWordArray, (item) =>{
                            return item == inputWord;
                            })
                    )));
                 }
              });
        })
    }

    start() {
        this.findRandomWord(dictionary);
        this.addTranslationText(this.randomWord, this.randomWordArray);
        $('.translation-popup').fadeIn('faster');
        return this.setTranslateListener();
    }
}

export default Translate;
