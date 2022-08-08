import { types, getSnapshot } from "mobx-state-tree"

const BooksAutorsModel = types.model({
    id: types.optional(types.integer, -1),
    idBook: types.optional(types.integer, -1),
    idAutor: types.optional(types.integer, -1),
})
.actions(self => ({
  set(id, idBook, idAutor) {
    self.id = id;
    self.idBook = idBook;
    self.idAutor = idAutor;
  }
  }))

var booksAutorsIdentityId = 1;

const BooksAutorsArray = types
  .model({
      list: types.map(BooksAutorsModel)
  })
  .actions(self => ({
    add(idBook, idAutor) {
      var id = booksAutorsIdentityId;
      self.list.set(id, BooksAutorsModel.create({ id, idBook, idAutor }))
      booksAutorsIdentityId++;  
    },
    delete(id) {
      self.list.delete(id);  
    },
    // Ну а как еще блин
    deleteByAutor(id) {
      self.list.forEach(ba => { 
        if (ba.idAutor == id) { 
          self.list.delete(ba.id);
        } 
      });
    },
    deleteByBook(id) {
      self.list.forEach(ba => { 
        if (ba.idBook == id) { 
          self.list.delete(ba.id);
        } 
      });
    },
    addAutorsToBook(idBook, idsAutor){
      if(idBook == -1) idBook = booksAutorsIdentityId - 1;
      idsAutor.forEach(idAutor => {
        self.add(idBook, idAutor);
      });
  console.log("BooksAutors: ", getSnapshot(booksAutors))

    }
  }))
  
  const booksAutors = BooksAutorsArray.create();
  
  booksAutors.add(1, 1);
  booksAutors.add(1, 2);
  booksAutors.add(2, 2);
  
  // console.clear();
  // console.log("BooksAutors: ", getSnapshot(booksAutors))

export default booksAutors;