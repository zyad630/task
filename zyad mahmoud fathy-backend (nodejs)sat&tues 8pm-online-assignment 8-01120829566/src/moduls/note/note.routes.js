const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const {
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
} = require('./note.controller');

router.post('/', auth, createNote);
router.get('/paginate-sort', auth, paginateSort);
router.get('/note-by-content', auth, getNoteByContent);
router.get('/note-with-user', auth, getNotesWithUser);
router.get('/aggregate', auth, aggregateNotes);
router.patch('/all', auth, updateAllTitles);
router.put('/replace/:noteId', auth, replaceNote);
router.patch('/:noteId', auth, updateNote);
router.delete('/', auth, deleteAllNotes);
router.delete('/:noteId', auth, deleteNote);
router.get('/:id', auth, getNoteById);

module.exports = router;
