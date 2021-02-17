const nameForm = document.querySelector('#name-form');

nameForm.addEventListener('submit', submitSearch);

const storage = window.localStorage;

async function submitSearch(e) {
  e.preventDefault();

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

  // Fetch request

  // I need to work around the CORS problem. Here's a thread on getting it working:
  // https://github.com/Rob--W/cors-anywhere/issues/301

  //  fetch(
  //     `https://cors-anywhere.herokuapp.com/https://binaryfog-last-name-origin-v1.p.rapidapi.com/api/LastName/origin?lastName=${lastName}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': '56136daf19msh385e4199ffdb756p10ac0fjsn9721600950a7',
  //         'x-rapidapi-host': 'binaryfog-last-name-origin-v1.p.rapidapi.com',
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       /// only return the JSON object once the status is 200
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  newPage();
}

async function newPage() {
  await submitSearch;
  window.location.href = '/results.html';
}

// XHR request
// let xhr = new XMLHttpRequest();

// xhr.open('GET', `https://api.agify.io?name=${firstName}`, true);

// xhr.onload = function () {
//   if (this.status === 200) {
//     // must use JSON.parse for XHR requests, since XHR returns JSON as a string
//     console.log(JSON.parse(this.responseText));
//   } else {
//     // error handling for application-level errors
//     console.log('There was a problem with the request');
//   }
// };
// // error handling for network errors
// xhr.onerror = function () {
//   console.log('Request Error...');
// };

// xhr.send();

// Axios requests
// await axios
//   .get(`https://api.nationalize.io?name=${firstName}`)
//   .then((response) => {
//     storage.setItem('country', JSON.stringify(response.data));
//     console.log(response.data);
//   })
//   .catch((err) => {
//     if (err.response) {
//       console.log(err.response);
//     } else if (err.request) {
//       console.log(err.request);
//     } else {
//       console.log(err);
//     }
//   });

// await axios
//   .get(`https://api.agify.io?name=${firstName}`)
//   .then((response) => {
//     storage.setItem('age', JSON.stringify(response.data));
//     console.log(response.data);
//   })
//   .catch((err) => {
//     if (err.response) {
//       console.log(err.response);
//     } else if (err.request) {
//       console.log(err.request);
//     } else {
//       console.log(err);
//     }
//   });
