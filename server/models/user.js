var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    about: {type: String, default: "I wish I could be friends with Ria..."},
    mutuals: [{type: Schema.Types.ObjectId, ref: "User"}],
    pendings: [{type: Schema.Types.ObjectId, ref: "User"}],
});

mongoose.model("User", UserSchema);
