const express = require('express');
const router = express.Router();


const { Page, User } = require("../models");
const { addPage, wikiPage } = require('../views');

// const client = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    res.send('GET /wiki/');
  } catch (error) { next(error) }
});


router.get("/add", async (req, res, next) => {
    try {
        res.send(addPage());

    } catch (error) { next(error) }
});

router.get('/:slug', async (req, res, next) => {
    try {
        console.log("1");
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        let author = await page.getAuthor();
        console.log("2");
        console.log(author);
        // res.json(page);
        res.send(wikiPage(page, author));
    // res.send(`hit dynamic route at ${req.params.slug}`);
    } catch (error) { next(error) }
});



router.post("/", async (req, res, next) => {
    try {
        console.log(req.body);


        const page = await Page.create(
            {
            title: req.body.title,
            content: req.body.content,
        },

        // { fields: ["title", "content"] }

        );
        // await page.save();



        const arr = await User.findOrCreate({ where: { name: req.body.name, email: req.body.email } });
        const authorInstance = arr[0] // the first element is the instance

        console.log("PAGE 1:");
        // console.log(page);
        // console.log(page.title);
        console.log(authorInstance.dataValues);

        console.log("PAGE 2:");
        console.log(page);

        await page.setAuthor(authorInstance);


        res.redirect(`/wiki/${page.slug}`);

        // res.send('POST /wiki/');
    // Insert the post in the database
    // res.redirect(`/posts/${postId}`); // Redirect to the post details page

} catch (error) { next(error) }

});


module.exports = router;
