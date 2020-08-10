//DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  //quote
  quote = document.getElementById("quote"),
  author = document.getElementById("author");

//Show Time
function showTime() {
  //utiliser Moment pour format francais
  const dateNow = moment(),
    dateHourFormat = "dddd Do MMMM, hh:mm:ss";
  dateNow.locale("fr");
  //afficher l'heure
  time.innerHTML = dateNow.format(dateHourFormat);

  //variante avec new Date()
  /*let now = new Date(),
    hour = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds();
    
  //Options
  const showAmPm = true;

  //Afficher AM ou PM
  const amPm = hour >= 12 ? "PM" : "AM";

  //12hr Format
  hour = hour % 12 || 12;

  //Afficher Heure
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ""}`;*/
}
/*
//Ajouter Zeros
function addZero(n) {
  return (n < 10 ? "0" : "") + n;
}
*/

//Set Background and Greeting
function setBgGreet() {
  //variante avec new Date()
  /*let now = new Date(),
    hour = now.getHours();*/
  const dateNow = moment(),
    hourFormat = "hh";
  let hour = dateNow.format(hourFormat);
  if (hour < 12) {
    //Matin
    refreshBg(bgMorning);
    setInterval("refreshBg(bgMorning)", 7000);
    document.body.style.color = "white";
    greeting.textContent = "Bonne journée";
  } else if (hour < 18) {
    //Apres-midi
    refreshBg(bgAfternoon);
    setInterval("refreshBg(bgAfternoon)", 7000);
    document.body.style.color = "white";
    greeting.textContent = "Bonne après-midi";
  } else {
    //Soir
    refreshBg(bgAfternoon);
    setInterval("refreshBg(bgAfternoon)", 7000);
    document.body.style.color = "white";
    greeting.textContent = "Bonne soirée";
  }
}

//Set Name
function setName(e) {
  if (e.type === "keydown") {
    //Make sure enter is pressed
    if (e.key === "Enter") {
      localStorage.setItem("name", e.target.textContent);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.textContent);
  }
}
//variante keypress & e.which
/*function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}*/

//Get Name
function getName() {
  let savedName = localStorage.getItem("name");
  if (savedName === null) {
    name.textContent = "<Quel est votre prénom?>";
  } else {
    name.textContent = savedName;
  }
}

//Set Focus
function setFocus(e) {
  if (e.type === "keydown") {
    //Make sure enter is pressed
    if (e.keyCode == 13) {
      localStorage.setItem("focus", e.target.textContent);
      //localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.textContent);
    //localStorage.setItem("focus", e.target.innerText);
  }
}

//Get Focus
function getFocus() {
  let savedFocus = localStorage.getItem("focus");
  if (savedFocus === null) {
    focus.innerText = "<Qu'est-ce que tu veux accomplir aujourd'hui?>";
  } else {
    focus.innerText = savedFocus;
  }
}

//Add Random Quote
function addRandomQuote() {
  if (quote && author) {
    const random = Math.floor(Math.random() * entries.length);
    const randomQuote = entries[random].quote;
    const randomAuthor = entries[random].author;
    quote.innerHTML = randomQuote;
    author.textContent = `— ${randomAuthor}`;
  }
}

name.addEventListener("keydown", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keydown", setFocus);
focus.addEventListener("blur", setFocus);

//Run
setInterval(showTime, 1000);
setBgGreet();
getName();
getFocus();
addRandomQuote();

// CODE DE PIERRE
// resfresh de l'arrière-plan

function refreshBg(object) {
  const random = Math.floor(Math.random() * 6);
  const randomBg = object[random];
  console.log("randomBg", randomBg);
  const imageBg = `${randomBg.link}`;
  document.body.style.backgroundImage = imageBg;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
}

//script TO DO
const enterButton = document.getElementById("enter");
const input = document.getElementById("userInput");
const ul = document.querySelector("ul");
const item = document.getElementsByTagName("li");

function inputLength() {
  return input.value.length;
}

function createListElement() {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  input.value = "";

  function crossOut() {
    li.classList.toggle("done");
  }

  li.addEventListener("click", crossOut);

  const dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  function deleteListItem() {
    li.classList.add("delete");
  }
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    createListElement();
  }
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
