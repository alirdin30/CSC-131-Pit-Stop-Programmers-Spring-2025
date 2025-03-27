import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import User from '../model/user.js';

passport.serializeUser((user, done) => {
  if (user && user.email) {
    done(null, user.email);
  } else {
    done(new Error('User object is invalid'), null);
  }
});

passport.deserializeUser(async (email, done) => {
  try {
    if (!email) {
      return done(new Error('Email is missing'), null);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (err) {
    console.error(err.message);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    { usernameField: "email" },
    async(email, password, done) => {
    try {
      // find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      console.error(err.message);
      return done(err);
    }
  })
);

export default passport;