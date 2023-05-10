import passport from "passport"
import {UserModel} from "../model/use.model";
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
        return done(null, false);
    } else {
        if (user.password === password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

passport.use(new GoogleStrategy({
        clientID: "894354126040-pr9au282m8oi9hcjm461035535mfuder.apps.googleusercontent.com",
        clientSecret: "1PoZYzXq77VrKeYuccTQcwJw",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await UserModel.findOne({ 'google.id': profile.id });
            // if user exists return the user
            if (existingUser) {
                return done(null, existingUser);
            }
            // if user does not exist create a new user
            const newUser = new UserModel({
                google: {
                    id: profile.id,
                },
                username: profile.emails[0].value,
                password: null
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(null, false)
        }
    }
));

export default passport;
