import { types, getSnapshot } from "mobx-state-tree"

const BooksModel = types.model({
  id: types.optional(types.integer, -1),
  name: types.optional(types.string, ""),
  yearPublic: types.optional(types.integer, -1),
})
.actions(self => ({
  set(id, name, yearPublic) {
    self.id = id;
    self.name = name;
    self.yearPublic = yearPublic;
  }
  }))

var booksIdentityId = 1;

const BooksArray = types
  .model({
      list: types.map(BooksModel)
  })
  .actions(self => ({
    add(name, yearPublic) {
      var id = booksIdentityId;
      self.list.set(booksIdentityId, BooksModel.create({ id, name, yearPublic }))
      booksIdentityId++;  
    },
    delete(id) {
      self.list.delete(id);  
    },
    edit(id, name, yearPublic){
      self.list.get(id).name = name;  
      self.list.get(id).yearPublic = yearPublic;  
    },
    getIdentityKey() {
      return booksIdentityId - 1;
    },
  }))
  
  const books = BooksArray.create();
  
  books.add("Книга", 2002);
  books.add("Нига", 2001);
  
  // console.clear();
  // console.log("Books: ", getSnapshot(books))

export default books;