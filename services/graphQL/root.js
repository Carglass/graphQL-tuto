var db = require("./../models/index");

class Tag {
  constructor(id, { name, color }) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

class Chakiboo {
  constructor(id, {title, code, description, tags, language, howToUse, private}){
    this.id = id;
    this.title = title;
    this.code = code;
    this.description = description;
    this.tags = tags;
    this.language = language;
    this.howToUse = howToUse;
    this.isPrivate = isPrivate
  }
}

module.exports = {
  tag: function({ id }) {
    return db.Tag.findById(id).then(data => {
      return new Tag(data._id.toString(), {
        name: data.name,
        color: data.color
      });
    });
  },
  createTag: function({ input }) {
    return db.Tag.create(input).then(data => {
      return new Tag(data._id.toString(), {
        name: data.name,
        color: data.color
      });
    });
  }
};
