import express from "express";

const app = express();

app.get("/_health", function (req, res) {
  res.send("Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
