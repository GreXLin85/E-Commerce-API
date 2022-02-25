const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const app = express();

const {
    ItemRoute,
    ItemCategoryRoute,
    ItemOrderRoute,
    AuthRoute,
    UserRoute,
    UserTypeRoute
} = require("./routes/index");
const tokenCheck = require("./middleware/tokenCheck.middleware");

app.use(json());
app.use(cors());

app.use("/user", tokenCheck, UserRoute);
app.use("/usertype", tokenCheck, UserTypeRoute);
app.use("/item", tokenCheck, ItemRoute);
app.use("/itemorder", tokenCheck, ItemOrderRoute);
app.use("/itemcategory", tokenCheck, ItemCategoryRoute);
app.use("/auth", AuthRoute);

app.listen(3000, () => {
    console.log("Server is running on port " + (3000));
});