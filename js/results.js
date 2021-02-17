// importing country code index
import isoCountries from './countryCodes.js';

// getting <p> sections from the DOM
const nationalityText = document.querySelector('#nationality');
const ageText = document.querySelector('#age');
const nameOriginText = document.querySelector('#name-origin');

// assigning variables to values from localStorage (which are set in entry.js)
let country = localStorage.getItem('country');
let age = localStorage.getItem('age');
let origin = localStorage.getItem('origin');

// converting to JSON
country = JSON.parse(country).country[0].country_id;
age = JSON.parse(age);
origin = JSON.parse(origin);

// putting data into the DOM
nationalityText.innerHTML = `The Oracle believes you live in ${isoCountries[country]}.`;
ageText.innerHTML = `The Oracle believes you are ${age.age} years old.`;
nameOriginText.innerHTML = `The Oracle believes your last name is ${origin.origin}.`;

// Console logs
// console.log(country);
// console.log(age.age);
// console.log(origin.origin);
