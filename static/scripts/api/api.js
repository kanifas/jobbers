import { delay } from '../utils/utils.js';
import store from '../store/store.js';

export default {
  async createItem(item) {
    await delay(1);
    store.createItem(item);
  },

  async updateItem(id, fields) {
    await delay(1);
    store.updateItem(id, fields);
  },
  
  async deleteItem(id) {
    await delay(1);
    store.deleteItem(id);
  }
};
