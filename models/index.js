const mongoose = require("mongoose");
const NoteSchema = require("./schemas/note");
const UserSchema = require("./schemas/user");

exports.Note = mongoose.model("Note", NoteSchema);
exports.User = mongoose.model("User", UserSchema);
