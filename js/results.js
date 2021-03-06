// importing country code index
import isoCountries from './countryCodes.js';

// getting <p> sections from the DOM
const nationalityText = document.querySelector('#nationality');
const ageText = document.querySelector('#age');
const nameOriginText = document.querySelector('#name-origin');

// assigning variables to values from localStorage (which are set in entry.js). if any values can't be destructured, they're set to null
let {
  country: [country],
} = JSON.parse(localStorage.getItem('country')) || {};
const { age } = JSON.parse(localStorage.getItem('age')) || {};
const { origin, confidenceScore } =
  JSON.parse(localStorage.getItem('origin')) || {};

// putting data into the DOM...error handling in case the API returns nothing
nationalityText.innerHTML = country
  ? `The Oracle is ${Math.floor(country.probability * 100)}% sure you live in ${
      isoCountries[country.country_id]
    }.`
  : `The Oracle can't figure this one out...`;
ageText.innerHTML = age
  ? `The Oracle believes you are ${age} years old.`
  : `The Oracle is stumped...`;
nameOriginText.innerHTML = origin
  ? `The Oracle is ${Math.floor(
      confidenceScore * 100
    )}% sure your last name is ${origin}.`
  : `The Oracle isn't sure...`;
