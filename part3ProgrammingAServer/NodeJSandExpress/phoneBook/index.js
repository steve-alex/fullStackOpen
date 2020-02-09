const express = require("express");
const app = express();

let people = [
  {
    id: 0,
    name: "Steve",
    number: "0201983209138210"
  },
  {
    id: 1,
    name: "Anna",
    number: "0202193219382109"
  },
  {
    id: 2,
    name: "Johny",
    number: "0200198371293"
  },
  {
    id: 3,
    name: "Luke",
    number: "020281730912837"
  }
];

app.get("/", (req, res) => {
  res.write("<h1>Hello</h1>");
});

app.get("/info", (req, res) => {
  res.json(people);
});

app.get("/info/:id", (req, res) => {
  let person = people.find(p => Number(req.params.id) === p.id);
  res.json(person);
});

app.delete("/info/:id", (req, res) => {
  let person = people.filter(p => Number(req.params.id) !== p.id);
  res.status(204).end();
});

app.post("/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  const person = {
    name: body.name,
    number: body.name,
    id: generateId()
  };

  if (duplicateName(person)) {
    res.status(400).json({
      error: "Name already exists"
    });
  } else if (duplicateNumber(person)) {
    res.status(400).json({
      error: "Number already exists"
    });
  } else {
    people.concat(person);
    res.json(person);
  }
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

const duplicateName = person => {
  let personFound = people.find(p => {
    return person.name === p.name;
  });
  return !!personFound;
};

const duplicateNumber = person => {
  let personFound = people.find(p => {
    return person.name === p.name;
  });
  return !!personFound;
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
