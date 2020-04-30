const express = require("express");
const morgan = require("morgan");

const { layout, main } = require("./views");

const { db, Page } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


// const routes = require('./routes/posts');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// parses json bodies
app.use(express.json())


app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get("/", async (req, res) => {

    let allPages = await Page.findAll();

    res.send(main(allPages));

    // res.send(layout());
    // res.send("Hello World!");
    // res.redirect("/wiki");
});





db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
    // await User.sync();
    // await Page.sync();
    await db.sync({force:true});


    const PORT = 3000;
        app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
};

init ();


// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
