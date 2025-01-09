// de giao tiep voi tep .env
import "dotenv/config";

import express from "express";
import expressLayouts from "express-ejs-layouts";

import Index from "./server/routes/index.js";

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', Index);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
