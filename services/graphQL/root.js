var tags = [
  { id: "1", name: "premier", color: "blue" },
  { id: "3", name: "second", color: "red" }
];

module.exports = {
  tag: function({ id }) {
    return tags[id];
  }
};
