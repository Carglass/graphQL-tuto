const getUser = function(cb) {
  $.get("/api/users/me", function(data) {
    cb(data);
  });
};

getUser(data => {
  console.log(data);
});
