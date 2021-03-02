# [Name Diviner](https://name-diviner.netlify.app/)

**Name Diviner** is an app that uses 3rd party API data to make predictions about a person based on their name. Two of the APIs -- [agify.io](https://agify.io) and [nationalize.io](https://nationalize.io) -- return name- and country-predictive data (respectively) based on the first name. A third API called [Last Name Origin](https://rapidapi.com/binaryfog/api/last-name-origin/) determines the country of origin of a last name.

Note: the **Last Name Origin** API is very slow. The app is configured to time out the request after **10** seconds, but sometimes the API takes even longer to respond. It does seems to speed up after a few searches.

## Background:

I wanted to build an original project using API data, so I decided to combine three separate APIs into one app. I used both `fetch` and Axios for the calls so I could practice using both of them, and though I'd originally used `XHR` as well, I decided to take it out because it made the code too messy.

Although this is exactly the kind of thing you'd want to use React for, I decided to build it using Vanilla JS just so I could see firsthand what it's like to build something complex without the aid of a library / framework. I learned a ton here: how to use `async/await` to wait on data to return from an API call before moving to the next page, how to use browser local storage when you don't have React to handle state management, how to set up a loading spinner, how to use `setTimeout` to abort an API call that's taking too long, and a lot more.

Design-wise, this is a much more ambitious project than my others. It was my first time using Figma, which I really enjoyed and will continute to use. One thing I learned, however, is that Figma sketches can be difficult to implement in CSS...if I were to go back and start again, I'd make things more minimalistic.

## Technology:

HTML, CSS, Axios, 3rd party APIs, Javascript.

## What I learned or used for the first time:

- **Figma**
- **Axios**
- **Browser local storage**
- **Mobile-first design**
- **Postman**
- **Using regex to validate an input field**
- **Using a loading spinner**
- **CSS modules**
- **Using setTimeout to abort an API request**
- **Deploying with Netlify**
- **Using a proxy to fix a CORS error**
