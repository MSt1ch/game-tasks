import $ from 'jquery';
import {dictionary} from '../dictionary/dictionary.js';

class Sortable {
    constructor() {
        this.randomWord = null;
        this.rightAnswer = null;
    }
    findRandomWord(dictionary) {
        let dictionaryKeys = _.keys(dictionary);
        let sizeDictionary = _.size(dictionary);
        this.randomWord = dictionaryKeys[_.random(sizeDictionary - 1)];
    }
    addSortableText(randomWord) {
        const sortableList = document.querySelector('.create-word-sortable');
        let sortableLi= '';
        this.rightAnswer = randomWord;
        randomWord = _.shuffle(randomWord);
        _.map(randomWord, (item)=>{
          sortableLi +=`<li class="sortable__letter">${item}</li>`;
        })
        sortableList.innerHTML = sortableLi;
        $( "#sortable" ).sortable();
    }
    setSortableListener() {
        return new Promise( res => {
            const createWordSubmit = document.querySelector('.create-word-submit');
            createWordSubmit.addEventListener('click', () =>{
                let lettersWord = '';
                _.map($('.sortable__letter'), (item)=>{
                  lettersWord += item.textContent;
                  $('.create-word-popup').fadeOut('faster');
                });
                res(lettersWord == this.randomWord ? true : false);
              });
        });
    }

    start() {
        this.findRandomWord(dictionary);
        this.addSortableText(this.randomWord);
        $('.create-word-popup').fadeIn('faster');
        return this.setSortableListener();
    }
}

export default Sortable;