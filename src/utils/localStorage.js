// Local Storage Helper Functions

export const setStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
};
export const getStorage = (key) => {
    let item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : false;
};
export const destroyStorage = (key) => {
    localStorage.removeItem(key);
};
export const destroyAllStorage = () => {
    localStorage.clear();
};
