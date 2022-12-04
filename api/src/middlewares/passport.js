const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
//ExtractJwt = require("passport-jwt").ExtractJwt;

const { User } = require("../db");
const cookiExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};
var opts = {};

opts.jwtFromRequest = cookiExtractor;
opts.secretOrKey = "userKey";
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: cookiExtractor,
      secretOrKey: "userKey",
    },
    (jwt_payload, done) => {
      console.log(jwt_payload);
      console.log("aaaa");
      User.findOne({ where: { id: jwt_payload.id } })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((error) => console.log(error));
    }
  )
);

module.exports = passport;

/* passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((error) => console.log(error));
  })
); */
