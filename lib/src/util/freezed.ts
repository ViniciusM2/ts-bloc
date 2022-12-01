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

// function freezeInstance(T) {
//   return new Proxy(T, {
//     construct: function (target, argumentLists, newTarget) {
//       var instance = new target(...argumentLists)
//       Object.freeze(instance)
//       return instance
//     }
//   })
// }

export { Freezed };

// export const Freezed = (target: Function) => {
//     Object.freeze(target);
// };
