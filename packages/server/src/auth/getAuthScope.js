const getToken = (req) => {
  if (req.query && req.query.hasOwnProperty("access_token")) {
    return req.query.access_token;
  }
  if (req.headers.authorization) {
    return req.headers.authorization.split(" ")[1];
  }
};

const getAuthScope = ({ req }) => {
  return {
    access_token: getToken(req),
  };
};

module.exports = getAuthScope;
