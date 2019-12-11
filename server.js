const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch(err => console.log("Error: " + err));

const port = process.env.PORT || 5001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//use routes
app.use("/gamestats", require("./routes/gamestats"));

if (process.env.NODE_ENV === "production") {
  app.user(express.static("client/build"));
  app.get("*", () => (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
