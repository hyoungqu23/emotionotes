const mongoose = require("mongoose");
const NoteSchema = require("./schemas/note");
const UserSchema = require("./schemas/user");

const Note = mongoose.model("Note", NoteSchema);

Note.getPaginatedNotes = async (query, page, perPage) => {
  const [total, notes] = await Promise.all([
    Note.countDocuments({ query }),
    Note.find({})
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate("author"),
  ]);

  const totalPage = Math.ceil(total / perPage);

  return [notes, totalPage];
};

exports.Note = Note;
exports.User = mongoose.model("User", UserSchema);
