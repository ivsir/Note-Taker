const express = require("express");
const path = require("path");
const api = require('./routes/index.js');
// const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static("public"));

// const uuid = require("./helpers/uuid");

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
  // Send a message to the client
  res.json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// POST request to add notes
// app.post("/api/notes", (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a note`);

//   // Destructuring assignment for the items in req.body
//   const { title, text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//       review_id: uuid(),
//     };

//     // Obtain existing reviews
//     fs.readFile('./db/notes.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         // Convert string into JSON object
//         const parsedNotes = JSON.parse(data);

//         // Add a new review
//         parsedNotes.push(newNote);

//         // Write updated notes back to the file
//         fs.writeFile(
//           './db/notes.json',
//           JSON.stringify(parsedNotes, null, 4),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated notes!')
//         );
//       }
//     });

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//     // readAndAppend(newNote, "./db/notes.json");
//     // res.json(`Note added successfully 🚀`);
//     // const response = {
//     //   status: "success",
//     //   body: newNote,
//     // };
//     // console.log(response);
//     // res.status(201).json(response);
//   } else {
//     res.status(500).json("Error in posting notes");
//   }
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
