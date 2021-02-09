const nameForm = document.querySelector('form');

nameForm.addEventListener('submit', submitSearch);

function submitSearch(e) {
  e.preventDefault();

  const fullName = this.name.value.split(' ');
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];

  // Axios request
  axios.get(`https://api.nationalize.io?name=${firstName}`).then((response) => {
    console.log(response.data);
  });

  // Fetch request

  // I need to work around the CORS problem. Here's a thread on getting it working:
  // https://github.com/Rob--W/cors-anywhere/issues/301

  fetch(
    `https://cors-anywhere.herokuapp.com/https://binaryfog-last-name-origin-v1.p.rapidapi.com/api/LastName/origin?lastName=${lastName}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '56136daf19msh385e4199ffdb756p10ac0fjsn9721600950a7',
        'x-rapidapi-host': 'binaryfog-last-name-origin-v1.p.rapidapi.com',
      },
    }
  )
    .then((response) => {
      /// only return the JSON object once the status is 200
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  // XHR request
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = returnXHRData;
  httpRequest.open('GET', `https://api.agify.io?name=${firstName}`, true);
  httpRequest.send();

  function returnXHRData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        // must use JSON.parse for XHR requests, since XHR returns JSON as a string
        console.log(JSON.parse(httpRequest.responseText));
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
}

// Here's what the FETCH response looks like for above:

// {name: "michael", country: Array(3)}
// country: Array(3)
// 0:
// country_id: "US"
// probability: 0.08986482266532715
// __proto__: Object
// 1:
// country_id: "AU"
// probability: 0.05976757527083082
// __proto__: Object
// 2:
// country_id: "NZ"
// probability: 0.04666974820852911}
