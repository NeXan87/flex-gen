if (!Object.prototype.length) {
  Object.defineProperty(Object.prototype, 'length', {
    get: function () {
      return Object.keys(this).length;
    }
  });
}
