const express = require("express");
const app = express();
const PORT = 3010;

app.use(express.json());

let Users = [
  {
    username: "avi",
    email: "avidurgade@gmail.com",
    password: "12345678",
    DOB: "13/03/2005",
  },
];

app.get("/api/users", (req, res) => {
  try {
    res.json({ User: Users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/signup", (req, res) => {
  try {
    const { username, email, password, DOB } = req.body;
    if (username == "") {
      throw new Error("Username cannot be empty");
    } else if (email == "") {
      throw new Error("Email cannot be empty");
    } else if (password.size < 8 || password.size > 16) {
      throw new Error(
        "Password length should be greater than 8 or less than or equal to 16"
      );
    }
    const newUser = { username, email, password, DOB };
    Users = Users.push(newUser);
    res.status(200).json({ message: "New user created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
