exports.client = (req, res) => {
  res.status(404).render("error", {
    layout: "error",
    statusCode: 404,
    errorMessage: "This page isn't available. Sorry."
  });
};

exports.server = (err, req, res, next) => {
  res.status(500).render("error", {
    layout: "error",
    statusCode: 500,
    errorMessage: "Internal rupture. Sorry."
  });
};
