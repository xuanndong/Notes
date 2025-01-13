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
    Notes.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$title", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, notes) {
        Notes.count().exec(function (err, count) {
          if (err) return next(err);

          res.render("dashboard/index", {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "../views/layouts/dashboard",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export default {
  dashboard,
};
