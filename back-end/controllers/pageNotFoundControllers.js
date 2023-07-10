async function handlePageNotFound(req, res) {
  try {
    res.status(404).send({ msg: "Page not found" });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
    console.log(error);
  }
}

export { handlePageNotFound };
