const Sequelize = require('sequelize');
const db = new Sequelize(
    'postgres://localhost:5432/wikistack',
    {
        logging: false
    }
);

const Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false // name MUST have a value

    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false // name MUST have a value

    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false // name MUST have a value
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
});



function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}
Page.beforeValidate((postInstance, optionsObject) => {
    // console.log("BEFORE VALIDATE: ");
    // console.log( postInstance);
    postInstance.slug = generateSlug(postInstance.title);
    // return postInstance;
});


const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false // name MUST have a value
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false, // name MUST have a value
        validate: {
            isEmail: true
        }
    }
});



Page.belongsTo(User, { as: 'author' });





module.exports = {
  db, User, Page
}
