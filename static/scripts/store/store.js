import { uniqId } from '../utils/utils.js';
import { STORAGE_NAME } from '../constants.js';

function getStorage() {
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  if (!storage) {
    return {}
  }
  return storage
}

function setStorage(storage) {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(storage));
}


class EventObserver {
  constructor() {
    this.observers = []
  }

  subscribe(fn) {
    this.observers.push(fn)
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn)
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data))
  }
}

export const observer = new EventObserver();

const state = {
  cards: Object.values(getStorage()),
};

setTimeout(() => observer.broadcast(state));

export default {
  createItem(item) {
    const id = uniqId();
    const storage = getStorage();
    const newItem = {
      ...item,
      id,
      order: Object.keys(storage).length,
    };
    storage[id] = newItem;
    state.cards.push(newItem);
    setStorage(storage);
    observer.broadcast(state);
  },

  updateItem(id, fields) {
    const storage = getStorage();
    const item = storage[id];
    storage[id] = {
      ...item,
      ...fields,
    }
    state.cards = Object.values(storage)
    setStorage(storage);
    observer.broadcast(state);
  },

  deleteItem(id) {
    const storage = getStorage();
    const item = storage[id];
    delete storage[id];
    state.cards = Object.values(storage);
    observer.broadcast(state);
  },

  // getItems()
}


