const Freezed = (target: any) => {
  // Object.freeze(target);
  return new Proxy(target, {
    construct: function (target, argumentLists, newTarget) {
      var instance = new target(...argumentLists)
      Object.freeze(instance)
      return instance
    }
  })
};


export { Freezed };

