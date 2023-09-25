function getSessionErrorData(req, defaultValues) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    console.log("세션 입력값이 없네여?");
    sessionInputData = {
      hasError: false,
      ...defaultValues,
    };
  }

  req.session.inputData = null;
  return sessionInputData;
}

function flashErrorsToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data,
  };
  req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorsToSession: flashErrorsToSession,
};
