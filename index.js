let time = document.getElementById('time');
let dayMonthYear = document.getElementById('dayMonthYear');
let body = document.querySelector("body");
let quote = document.querySelector("#quote");
let greeting = document.querySelector("#greeting-static");
let nameField = document.querySelector("#greeting-dynamic");
let goalField = document.querySelector("#goal-dynamic");


// Showe time

let hour = 0;

function showeTime() {
    let today = new Date();
    hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // AM or PM
    let amPm = hour >= 12 ? 'PM' : 'AM';

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec}<span>   </span>${showeAmPm ? amPm : ''}`;

    setTimeout(showeTime, 1000);
}

// Optional Am Pm

let showeAmPm = false;

// Showe date

function showeDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();


    // Month Name
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    month = monthNames[month];

    // Output Date
    dayMonthYear.innerHTML = `${day}<span> </span>${month}<span> </span>${year}`;

    setTimeout(showeTime, 100000);
}



showeTime();
showeDate();

// Display special backgraound for part of day

if (hour >= 6 && hour <= 11) {
    body.classList.add('background-morning');
    greeting.textContent = 'Good Morning, master';
} else if (hour >= 11 && hour <= 17) {
    body.classList.add('background-noon');
    greeting.textContent = 'Good Afternoon, master';
} else {
    body.classList.add('background-evening');
    greeting.textContent = 'Good Evening, master';
    document.body.style.color = 'aqua';
}



// Set name

function setName(event) {
    if (event.type === 'keypress') {
        if (event.keyCode == 13) {
            localStorage.setItem('name', event.target.innerText)
            nameField.blur()
        }
    } else {
        localStorage.setItem('name', event.target.innerText)
    }
}

function removeTip() {
    if (localStorage.getItem('name') === null) {
        nameField.innerHTML = '';
    }
}

nameField.addEventListener('keypress', setName);
nameField.addEventListener('blur', setName);
nameField.addEventListener('click', removeTip);


// Get Name

function getName() {
    if (localStorage.getItem('name') === null) {
        nameField.innerHTML = '[Enter your name]'
    } else {
        nameField.innerHTML = localStorage.getItem('name');
    }

}

// Set goal

function setGoal(event) {
    if (event.type === 'keypress') {
        if (event.keyCode == 13) {
            localStorage.setItem('goal', event.target.innerText)
            goalField.blur()
        }
    } else {
        localStorage.setItem('goal', event.target.innerText)
    }
}

function removeTipGoal() {
    if (localStorage.getItem('goal') === null) {
        goalField.innerHTML = '';
    }
}

goalField.addEventListener('keypress', setGoal);
goalField.addEventListener('blur', setGoal);
goalField.addEventListener('click', removeTipGoal);



// Get Goal

function getGoal() {
    if (localStorage.getItem('goal') === null) {
        goalField.innerHTML = '[Enter your goal]'
    } else {
        goalField.innerHTML = localStorage.getItem('goal');
    }

}


getName();
getGoal();


// Get Day quote 
fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(body => quote.innerHTML = `${body[1].text}`)


