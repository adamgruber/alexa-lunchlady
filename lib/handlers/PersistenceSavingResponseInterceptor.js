const PersistenceSavingResponseInterceptor = {
  process(handlerInput) {
    return handlerInput.attributesManager
      .getPersistentAttributes()
      .then(attributes => {
        console.log(attributes);
        handlerInput.attributesManager.setPersistentAttributes({
          testAttribute: false,
        });
        return handlerInput.attributesManager.savePersistentAttributes();
      });

    // return new Promise((resolve, reject) => {
    //   handlerInput.attributesManager
    //     .savePersistentAttributes()
    //     .then(() => {
    //       console.log('saved attributes');
    //       resolve();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       reject(error);
    //     });
    // });
  },
};

module.exports = PersistenceSavingResponseInterceptor;
