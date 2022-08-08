import { types, getSnapshot } from "mobx-state-tree"

const AutorsModel = types.model({
  id: types.optional(types.integer, -1),
  name: types.optional(types.string, ""),
  surname: types.optional(types.string, ""),
  patr: types.optional(types.string, "")
})
.actions(self => ({
  set(id, name, surname, patr) {
    self.id = id;
    self.name = name;
    self.surname = surname;
    self.patr = patr;
  }
  }))

var autorsIdentityId = 1;

const AutorsArray = types
  .model({
      list: types.map(AutorsModel)
  })
  .actions(self => ({
    add(name, surname, patr) {
      var id = autorsIdentityId;
      self.list.set(autorsIdentityId, AutorsModel.create({ id, name, surname, patr }))
      autorsIdentityId++;  
    },
    delete(id) {
      self.list.delete(id);  
    },
    edit(id, name, surname, patr){
      self.list.get(id).name = name;  
      self.list.get(id).surname = surname;  
      self.list.get(id).patr = patr;  
    }
  }))
  
  const autors = AutorsArray.create();
  
  autors.add("Александр", "Пушкин", "Сергеевич");
  autors.add("Лев", "Толстой", "Николаевич");
  autors.add("Николай", "Гоголь", "Васильевич");
  autors.add("Федор", "Достоевский", "Михайлович");
  autors.add("Иван", "Тургенев", "Сергеевич");
  autors.add("Антон", "Чехов", "Павлович");
  autors.add("Александр", "Островский", "Николаевич");
  
  // console.clear();
  // console.log("Autors: ", getSnapshot(autors))

export default autors;