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
    { title, code, description, tags, language, howToUse, isPrivate, author }
  ) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.description = description;
    this.tags = tags;
    this.language = language;
    this.howToUse = howToUse;
    this.isPrivate = isPrivate;
    this.author = author;
  }
}

class Author {
  constructor(id, { username, chakiboos, secretChakiboos, likedChakiboos }) {
    this.id = id;
    this.username = username;
    this.chakiboos = chakiboos;
    this.secretChakiboos = secretChakiboos;
    this.likedChakiboos = likedChakiboos;
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
  chakiboos: function({ fromUser }, context) {
    if (fromUser && context.user) {
      return db.Chakiboo.find({ author: context.user.id }).then(data => {
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
    } else {
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
    }
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
  author: function({ id }) {
    return db.User.findById(id).then(data => {
      return new Author(data._id, {
        username: data.username,
        chakiboos: data.chakiboos,
        secretChakiboos: data.secretChakiboos,
        likedChakiboos: data.likedChakiboos
      });
    });
  },
  me: function({ input }, context) {
    return db.User.findById(context.user.id).then(data => {
      return new Author(data._id, {
        username: data.username,
        chakiboos: data.chakiboos,
        secretChakiboos: data.secretChakiboos,
        likedChakiboos: data.likedChakiboos
      });
    });
  },
  createChakiboo: function({ input }, context) {
    console.log(input);
    if (context.user) {
      console.log(context.user);
      const newChakiboo = {
        title: input.title,
        code: input.code,
        description: input.description,
        tags: input.tags,
        language: input.language,
        howToUse: input.howToUse,
        isPrivate: input.isPrivate,
        author: context.user.id
      };
      return db.Chakiboo.create(newChakiboo).then(data => {
        return db.User.findById(context.user.id).then(dbAuthor => {
          dbAuthor.chakiboos.push(data);
          return dbAuthor.save().then(confirm => {
            console.log(data);
            return new Chakiboo(data._id, {
              title: data.title,
              code: data.code,
              description: data.description,
              tags: data.tags,
              language: data.language,
              howToUse: data.howToUse,
              isPrivate: data.isPrivate,
              author: data.author
            });
          });
        });
      });
    }
  },
  updateChakiboo: function({ input }, context) {
    if (context.user) {
      return db.Chakiboo.findById(input.id).then(dbChakiboo => {
        if (context.user.id == dbChakiboo.author) {
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
              isPrivate: data.isPrivate,
              author: data.author
            });
          });
        }
      });
    }
  },
  deleteChakiboo: function({ id }, context) {
    if (context.user) {
      return db.Chakiboo.findById(id).then(dbChakiboo => {
        if (context.user.id == dbChakiboo.author) {
          return db.Chakiboo.findByIdAndRemove(id)
            .then(data => {
              return { id: data._id, status: "ok" };
            })
            .catch(err => {
              return { id: id, status: "failure" };
            });
        } else {
          return { id: id, status: "only the author can delete a Chakiboo" };
        }
      });
    }
  },
  forkChakiboo: function({ id }, context) {
    if (context.user) {
      return db.Chakiboo.findById(id).then(dbChakiboo => {
        const newChakiboo = {
          title: dbChakiboo.title,
          code: dbChakiboo.code,
          description: dbChakiboo.description,
          tags: dbChakiboo.tags,
          language: dbChakiboo.language,
          howToUse: dbChakiboo.howToUse,
          isPrivate: dbChakiboo.isPrivate,
          author: context.user.id
        };
        return db.Chakiboo.create(newChakiboo).then(data => {
          return db.User.findById(context.user.id).then(dbAuthor => {
            dbAuthor.chakiboos.push(data);
            return dbAuthor.save().then(confirm => {
              console.log(data);
              return new Chakiboo(data._id, {
                title: data.title,
                code: data.code,
                description: data.description,
                tags: data.tags,
                language: data.language,
                howToUse: data.howToUse,
                isPrivate: data.isPrivate,
                author: data.author
              });
            });
          });
        });
      });
    }
  }
};
