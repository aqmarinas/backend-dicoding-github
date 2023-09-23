const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
  {
    // handler berada di file handler.js
    method: "POST",
    path: "/notes",
    handler: addNoteHandler, // menambahkan catatan
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler, // menampilkan semua catatan
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler, // nenampilkan salah satu catatan
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler, // mengubah catatan
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler, // menghapus catatan
  },
];

module.exports = routes;
