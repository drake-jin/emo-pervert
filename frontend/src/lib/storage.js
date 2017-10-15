export default (function() {
  const st = localStorage;
  return {
    set: (key, object) => {
      st.setItem(key, (typeof object) === 'string' ? object : JSON.stringify(object))
    },
    get: (key) => {
      if(!st[key]) {
        return null;
      }
      const value = st.getItem(key);

      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch(e) {
        return value;
      }
    },
    remove: (key) => {
      if(localStorage) {
        return localStorage.removeItem(key);
      }
      // delete st[key];
    }
  }
})();