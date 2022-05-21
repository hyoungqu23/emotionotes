const mongoose = require("mongoose");
const NoteSchema = require("./schemas/note");

exports.Note = mongoose.model("Note", NoteSchema);
