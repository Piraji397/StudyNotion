export const useLocalStorage = () => {
  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(localStorage.getItem(key)) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [setItem, getItem, removeItem];
};
