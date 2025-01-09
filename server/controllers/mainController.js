/**
 * GET /
 * Homepage
 */
let homepage = async (req, res) => {
    const locals = {
        title: "NodeJs Notes",
        description: "Free NodeJs Notes App",
    };

    res.render("index", locals);
};


/**
 * GET /
 * About
 */
let about = async (req, res) => {
    const locals = {
        title: "About - NodeJs Notes",
        description: "Free NodeJs Notes App",
    };

    res.render("about", locals);
};



export default {
    homepage,
    about
};
