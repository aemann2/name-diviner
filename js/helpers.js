// a function that creates a loading spinner
const spinner = () => {
  const loader = document.createElement('div');
  loader.className = 'loader';
  const image = document.createElement('img');
  image.setAttribute('src', '/images/spinner.svg');
  loader.appendChild(image);
  return loader;
};

// a function that sets a timeout on fetch and returns null if any of the API calls take to long
const controller = new AbortController();

const fetchTimeout = (url, ms, options, { signal } = {}) => {
  const controller = new AbortController();
  const promise = fetch(url, { signal: controller.signal, ...options });
  if (signal) signal.addEventListener('abort', () => controller.abort());
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};

export { controller, fetchTimeout, spinner };
