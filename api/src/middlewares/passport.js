const passport = require("passport");
const AnonymousStrategy = require("passport-anonymous").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const { User } = require("../db");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = "userKey";
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    //console.log(jwt_payload);
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
);
passport.use(new AnonymousStrategy());
