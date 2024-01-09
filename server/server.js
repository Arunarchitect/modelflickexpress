const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Define the path for your static files in production
const publicFolderPath = path.join(__dirname, "public");
const buildFolderPath = path.join(publicFolderPath, "build");

// Serve static files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(buildFolderPath));

  // Serve the main HTML file for all routes
  app.get("/*", (req, res) => {
    res.sendFile(path.join(buildFolderPath, "index.html"));
  });
}


// Your other routes and middleware can go here

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
