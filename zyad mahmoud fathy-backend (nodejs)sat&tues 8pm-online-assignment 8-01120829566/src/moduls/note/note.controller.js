const mongoose = require('mongoose');
const Note = require('./note.model');

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      userId: req.userId
    });

    return res.status(201).json({ message: 'Note created', note });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    return res.status(200).json({ message: 'updated', note });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const replaceNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    note.title = title;
    note.content = content;

    await note.save();

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateAllTitles = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await Note.updateMany(
      { userId: req.userId },
      { title },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'No note found' });
    }

    return res.status(200).json({ message: 'All notes updated' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    await Note.findByIdAndDelete(noteId);

    return res.status(200).json({ message: 'deleted', note });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const paginateSort = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const notes = await Note.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getNoteByContent = async (req, res) => {
  try {
    const { content } = req.query;

    const note = await Note.findOne({ content, userId: req.userId });
    if (!note) {
      return res.status(404).json({ message: 'No note found' });
    }

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getNotesWithUser = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .select('title userId createdAt')
      .populate('userId', 'email');

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const aggregateNotes = async (req, res) => {
  try {
    const { title } = req.query;

    const match = { userId: new mongoose.Types.ObjectId(req.userId) };
    if (title) match.title = title;

    const notes = await Note.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          title: 1,
          userId: 1,
          createdAt: 1,
          'user.name': 1,
          'user.email': 1
        }
      }
    ]);

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({ userId: req.userId });

    return res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNote,
  updateNote,
  replaceNote,
  updateAllTitles,
  deleteNote,
  paginateSort,
  getNoteById,
  getNoteByContent,
  getNotesWithUser,
  aggregateNotes,
  deleteAllNotes
};
