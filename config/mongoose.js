const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo has been connected"))
    .catch((e) => console.log(e));
