import { uniqId } from '../utils/utils.js';
import { STORAGE_NAME } from '../constants.js';

function getStorage() {
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  if (!storage) {
    return []
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

setTimeout(() => observer.broadcast(getStorage()), 0);

export default {
  createItem(item) {
    const id = uniqId();
    const storage = getStorage();
    const newItem = { ...item, id };
    storage.push(newItem);
    setStorage(storage);
    return newItem;
  },

  deleteItem(id) {
    const storage = getStorage().filter(item => item.id !== id);
    setStorage(storage);
    return id;
  },

  updateItem(id, fields) {
    const storage = getStorage();
    const index = storage.findIndex(item => item.id === id);
    storage[index] = {
      ...storage[index],
      ...fields
    }
    setStorage(storage);
    observer.broadcast(storage);
  },  

  moveItemBack(id) {
    const storage = getStorage();
    const index = storage.findIndex(item => item.id === id);
    if (index === 0) {
      return
    }
    [storage[index-1], storage[index]] = [storage[index], storage[index-1]];
    setStorage(storage);
    observer.broadcast(storage);
  },

  moveItemForward(id) {
    const storage = getStorage();
    const index = storage.findIndex(item => item.id === id);
    if (index === storage.length - 1) {
      return
    }
    [storage[index], storage[index+1]] = [storage[index+1], storage[index]];
    setStorage(storage);
    observer.broadcast(storage);
  },

  fetchItems() {
    const storage = getStorage();
    observer.broadcast(storage);
    return storage;
  }
}


