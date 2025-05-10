
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          name: profile.displayName,
          email: profile.emails[0].value,
        };

        // You can save to DB here if needed, or just pass the user
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// No session used — skip serialize/deserialize
module.exports = passport;
