import { delay } from '../utils/utils.js';
import store from '../store/store.js';

const sec = 0.3;

export default {
  async createItem(item) {
    await delay(sec);
    return store.createItem(item);
  },

  async updateItem(id, fields) {
    await delay(sec);
    return store.updateItem(id, fields);
  },
  
  async deleteItem(id) {
    await delay(sec);
    return store.deleteItem(id);
  },
  
  async moveItemBack(id) {
    await delay(sec);
    return store.moveItemBack(id);
  },
  
  async moveItemForward(id) {
    await delay(sec);
    return store.moveItemForward(id);
  },

  async fetchItems() {
    await delay(sec);
    return store.moveItemForward(id);
  }
};
