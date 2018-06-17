import style from "./main.css";
import $ from 'jquery';
import jquerySortable from 'jquery-ui-sortable-npm/jquery-ui-sortable.js';
import Game from './js/app/game.js';


const _ = require('lodash');


const userForm = document.querySelector('.user-form');
const submitForm = document.querySelector('.btn-start');

const startPage = document.querySelector("header");
const gamePage = document.querySelector(".wrapper");
const formSubmitButton = document.getElementById("formSubmitButton");

formSubmitButton.addEventListener("click", addUser);

  function addUser(e){
    let userName = '';
    let audio = new Audio("sounds/theme.mp3").play();
    for (let i = 0; i < userForm.length; i++){
      const el = userForm[i];
      if (el.type !== "submit" && el.type !== "button"){
        //currentUser[el.name] = el.value;
        userName += el.value + " ";
      }
    }
    startPage.style.display = "none";
    gamePage.style.display = "block";
    const game = new Game(userName);
    game.start();
  };
