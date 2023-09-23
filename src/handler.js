const { nanoid } = require("nanoid");
const notes = require("./notes");

// MENYIMPAN catatan dari client ke array notes
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload; // nilai yang didapat dari client

  const id = nanoid(16);
  const createdAt = new Date().toISOString(); // membuat string untuk waktu saat ini dalam format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
  const updateAt = createdAt;

  // MENAMBAHKAN catatan dari client ke array notes
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };
  notes.push(newNote);

  // mengecek catatan baru (udah masuk apa blm)
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // menentukan respon yang diberikan server
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

// MENAMPILKAN CATATAN di home
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes, // berisi daftar catatan atau informasi yang ingin dikembalikan oleh getAllNotesHandler()
  },
});

// MENAMPILKAN CATATAN secara spesifik berdasarkan id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0]; // note tidak boleh undefined

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  respon.code(404);
  return response;
};

// MENGUBAH CATATAN
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload; // ambil data dari client
  const updateAt = new Date().toISOString(); // update tanggal edit

  // ubah isi notes
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index], // import notes
      title,
      tags,
      body,
      updateAt,
    };
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan",
  });
  response.code(404);
  return response;
};

// MENGHAPUS CATATAN
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus.",
  });
  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler }; //! ekspor lebih dari satu variabel
