import $ from 'jquery';
import {dictionary} from '../dictionary/dictionary.js';

class Speech {
    constructor() {
        this.randomWord = null;
        this.synth = window.speechSynthesis;
        const speechRepeatBtn = document.querySelector(".speech-repeat-btn");
        speechRepeatBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.speak(this.randomWord);
          });
    }
    findRandomWord(dictionary) {
        let dictionaryKeys = _.keys(dictionary);
        let sizeDictionary = _.size(dictionary);
        this.randomWord = dictionaryKeys[_.random(sizeDictionary - 1)];
    }

    speak(randomWord) {
        let voices;
        voices = this.synth.getVoices();
        if (this.randomWord !== '') {
        const utterThis = new SpeechSynthesisUtterance(this.randomWord);
        utterThis.voice = voices[1];
        utterThis.pitch = 1.1;
        utterThis.rate = 1;
        this.synth.speak(utterThis);
        }
    }
    setSpeechListener() {
        return new Promise(res => {

            const speechSubmit = document.querySelector(".speech-submit");
              speechSubmit.addEventListener('click', () =>{
                let inputWord = document.querySelector('.speech-input');
                if(inputWord.value) {
                    inputWord = _.lowerCase(inputWord.value);
                    $('.speech-popup').fadeOut('faster');
                    console.log(this.randomWord);
                    res(inputWord == this.randomWord ? true : false);
                }
              });
        })
    }
    start() {
        this.findRandomWord(dictionary);
        setTimeout(this.speak(this.randomWord), 1000);
        $('.speech-popup').fadeIn('faster');
        return this.setSpeechListener();
    }

}

export default Speech;
