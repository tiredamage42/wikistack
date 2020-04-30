const express = require('express');
const router = express.Router();
const { userList, userPages } = require('../views');
const { Page, User } = require("../models");


// const client = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    console.log("user1");
    let users = await User.findAll();
    console.log("user2");
    console.log(users);
    res.send(userList(users));


  } catch (error) { next(error) }
});

router.get("/:id", async (req, res, next) => {
  try {
    let user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    let pages = await Page.findAll({
        where: {
            authorId: user.id
        }
    });

    res.send(userPages(user, pages));
  } catch (error) { next(error) }
});

module.exports = router;
