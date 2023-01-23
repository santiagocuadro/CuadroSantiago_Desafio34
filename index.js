import express from 'express';
import {engine} from 'express-handlebars';
import session from "express-session";
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from "cookie-parser";
import {Strategy as LocalStrategy} from 'passport-local';
import * as strategy from './src/passport/strategy.js';
import { User } from './src/models/index.js';
import { routerProducts, routerMessage, routerTest, routerSession } from './src/Routes/index.js';
import { config } from './src/config/index.js';
import { MongoDBService } from "./src/services/index.js";


const PORT = config.SERVER.PORT;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({extname: ".hbs",defaultLayout: "index.hbs",}));
app.set("view engine", "hbs");
app.set('views', './public');

const MONGO_DB_URI = process.env.MONGO_DB_URL;

app.use(session({
  store:MongoStore.create({
    mongoUrl: MONGO_DB_URI,
    ttl:600, 
    collectionName:'sessions'
}),
secret:'secret',
resave: false,
saveUninitialized: false,
rolling: false,
cookie: {
  maxAge: 600000,
}
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true }, strategy.register)
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


app.use('/', routerSession);

app.use('/api/productos', routerProducts);
app.use('/api/mensajes', routerMessage);
// Mocks para productos
app.use('/api/products-test', routerTest);

app.use('*', (req, res) => {
  res.send({ error: -1, descripcion: 'ruta "x" método "y" no autorizada' });
});

const server = app.listen(PORT, async () => {
  MongoDBService.init();
  console.log(`Running on port ${PORT}`);
});
server.on('error', (err) => console.log(err));
