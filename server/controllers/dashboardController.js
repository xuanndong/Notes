import Notes from "../model/Notes.js";
import mongoose from "mongoose";

/**
 * GET /
 * Dashboard
 */
let dashboard = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Free NodeJs Notes App",
  };

  try {
    // Mongoose "^7.0.0 Update
    const notes = await Notes.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Notes.countDocuments();

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * View Specific Note
 */

let dashboarViewNote = async (req, res) => {
  const note = await Notes.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.render("Something went wrong.");
  }
};

/**
 * PUT /
 * Update Specific Note
 */

let dashboarUpdateNote = async (req, res) => {
  try {
    await Notes.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE /
 * Delete Specific Note
 */

let dashboarDeleteNote = async (req, res) => {
  try {
    await Notes.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Add Notes
 */

let dashboarAddNote = async (req, res) => {
  try {
    res.render("dashboard/add", {
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * Add Notes
 */

let dashboarAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Notes.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Search Notes
 */

let dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * Search For Notes
 */

let dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace("/[^a-zA-Z0-9 ]/g", "");

    const searchResults = await Notes.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });
    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  dashboard,
  dashboarViewNote,
  dashboarUpdateNote,
  dashboarDeleteNote,
  dashboarAddNote,
  dashboarAddNoteSubmit,
  dashboardSearch,
  dashboardSearchSubmit,
};
