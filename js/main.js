//DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  //quote
  quote = document.getElementById("quote"),
  author = document.getElementById("author");

//Options
const showAmPm = true;

//Show Time
function showTime() {
  //utiliser Moment pour format francais
  const dateNow = moment(),
    dateHourFormat = "dddd Do MMMM, hh:mm:ss";
  dateNow.locale("fr");
  //Output Time
  time.innerHTML = dateNow.format(dateHourFormat);

  //variante avec new Date()
  /*let now = new Date(),
    hour = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds();

    //Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  //12hr Format
  hour = hour % 12 || 12;

  //Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ""}`;*/
}
/*
//Add Zeros if no Moment
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
    document.body.style.backgroundImage = 'url("../img/matin.jpg")';
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundSize = "cover";
    document.body.style.color = "white";
    greeting.textContent = "Bonne journée";
  } else if (hour < 18) {
    //Apres-midi
    document.body.style.backgroundImage = 'url("../img/midi.jpg")';
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Bonne après-midi";
  } else {
    //Soir
    document.body.style.backgroundImage = 'url("../img/soir.jpg")';
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundSize = "cover";
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
