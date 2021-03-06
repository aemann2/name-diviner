import { controller, fetchTimeout, spinner } from './helpers.js';

// grabbing the form element and adding an event listener
const nameForm = document.querySelector('#name-form');
nameForm.addEventListener('submit', submitSearch);

// assigning a storage variable
const storage = window.localStorage;

// grabbing body and main classes of entry page
const pageBody = document.querySelector('.entry-body');
const pageMain = document.querySelector('.entry-main');

// making a function that newPage will wait on so that the data returns before the results page is rendered
async function submitSearch(e) {
  // prevents the form from submitting and reloading the page and clears any values present in local storage
  e.preventDefault();
  storage.clear();
  // calling the loading spinner
  pageBody.replaceChild(spinner(), pageMain);

  // breaking up first and last name
  const fullName = this.name.value.split(' ');
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];

  // Axios requests to both APIs using .all
  await axios
    .all([
      await axios.get(`https://api.nationalize.io?name=${firstName}`),
      axios.get(`https://api.agify.io?name=${firstName}`),
    ])
    .then(
      axios.spread((data1, data2) => {
        storage.setItem('country', JSON.stringify(data1.data));
        storage.setItem('age', JSON.stringify(data2.data));
      })
    )
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err);
      }
    });

  // Fetch request using a CORS proxy
  var myHeaders = new Headers();
  myHeaders.append(
    'x-rapidapi-key',
    '56136daf19msh385e4199ffdb756p10ac0fjsn9721600950a7'
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  // fetch request with a timeout
  await fetchTimeout(
    `https://quiet-tundra-15224.herokuapp.com/https://binaryfog-last-name-origin-v1.p.rapidapi.com/api/LastName/origin?lastName=${lastName}`,
    10000,
    requestOptions,
    { signal: controller.signal }
  )
    .then((response) => response.text())
    .then((result) => storage.setItem('origin', result))
    .catch((error) => console.log('error', error));

  loadNextPage();
}

async function loadNextPage() {
  await submitSearch;
  // routes to results.html after API calls return
  const nextPage = new URL('results.html', window.location.href);
  window.location.href = nextPage;
}
