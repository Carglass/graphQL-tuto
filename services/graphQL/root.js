var db = require("./../models/index");

class Tag {
  constructor(id, { name, color }) {
    this.id = id;
    this.name = name;
    this.color = color;
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
    console.log(input);
    return db.Tag.create(input).then(data => {
      return new Tag(data._id.toString(), {
        name: data.name,
        color: data.color
      });
    });
  }
};
