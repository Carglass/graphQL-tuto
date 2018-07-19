var db = require("./../models/index");

class Tag {
  constructor(id, { name, color }) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

class Chakiboo {
  constructor(
    id,
    { title, code, description, tags, language, howToUse, isPrivate }
  ) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.description = description;
    this.tags = tags;
    this.language = language;
    this.howToUse = howToUse;
    this.isPrivate = isPrivate;
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
  },
  chakiboos: function() {
    return db.Chakiboo.find().then(data => {
      let chakiboosToReturn = [];
      for (piece of data) {
        chakiboosToReturn.push(
          new Chakiboo(piece._id, {
            title: piece.title,
            code: piece.code,
            description: piece.description,
            tags: piece.tags,
            language: piece.language,
            howToUse: piece.howToUse,
            isPrivate: piece.isPrivate
          })
        );
      }
      return chakiboosToReturn;
    });
  },
  chakiboo: function({ id }) {
    return db.Chakiboo.findById(id).then(data => {
      return new Chakiboo(data._id, {
        title: data.title,
        code: data.code,
        description: data.description,
        tags: data.tags,
        language: data.language,
        howToUse: data.howToUse,
        isPrivate: data.isPrivate
      });
    });
  },
  createChakiboo: function({ input }, context) {
    if (context.user) {
      return db.Chakiboo.create(input).then(data => {
        return new Chakiboo(data._id, {
          title: data.title,
          code: data.code,
          description: data.description,
          tags: data.tags,
          language: data.language,
          howToUse: data.howToUse,
          isPrivate: data.isPrivate,
          author: context.user.id
        });
      });
    }
  },
  updateChakiboo: function({ input }) {
    return db.Chakiboo.findByIdAndUpdate(
      input.id,
      {
        $set: {
          title: input.title,
          code: input.code,
          description: input.description,
          tags: input.tags,
          language: input.language,
          howToUse: input.howToUse,
          isPrivate: input.isPrivate
        }
      },
      { new: true }
    ).then(data => {
      return new Chakiboo(data._id, {
        title: data.title,
        code: data.code,
        description: data.description,
        tags: data.tags,
        language: data.language,
        howToUse: data.howToUse,
        isPrivate: data.isPrivate
      });
    });
  },
  deleteChakiboo: function({ id }) {
    return db.Chakiboo.findByIdAndRemove(id)
      .then(data => {
        return { id: data._id, status: "ok" };
      })
      .catch(err => {
        return { id: id, status: "failure" };
      });
  }
};
