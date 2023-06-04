export const uniqId = (length = 6) => Math.random().toString(36).substring(2, length + 2);

export const debounce = (func, delay) => {
  let timeout;
  return function executed() {
    const later = () => {
      timeout = null;
      func.apply(this, arguments);
    };
    clearTimeout(timeout);
    // Restart the debounce waiting period.
    timeout = setTimeout(later, delay);
  };
};

export const delay = (sec = 0) => new Promise(res => setTimeout(res, sec * 1000));
