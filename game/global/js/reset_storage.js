import { removeStorageItem, key_array } from './storage.js';

function resetData() {
    key_array.forEach(key => {
        removeStorageItem(key);     
    });
}

export { resetData }