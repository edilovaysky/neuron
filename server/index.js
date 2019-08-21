const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secret = 'ludfkasdjkk23rj0f[sj99jls--dljie';

mongoose.set('useFindAndModify', false);

mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
    process.env.DB_NAME
  }`,
  { useNewUrlParser: true }
);

const app = express();

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Wrong token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token present' });
  }
};

const User = require('./models/user');

app.use(express.json());
app.use(cors());

app.post('/auth', async (req, res) => {
  const { firstName, lastName, password } = req.body;

  let user = await User.findOne({
    firstName: firstName,
    lastName: lastName,
    password: password,
  }).lean();
  if (user) {
    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      secret
    );
    delete user.password;
    res.json({ token, user });
  } else {
    res.status(401).json({ message: 'Wrong credentials' });
  }
});

app.post('/reg', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();
  console.log(user);
  res.json(user);
});

app.get('/users', async (req, res) => {
  const { status } = req.query;
  const users = await User.find({ status: status }).sort({ lastName: 1 });
  users.map(user => {
    user.password = null;
  });
  res.json({ users });
});

app.get('/find-users', async (req, res) => {
  const { status, lastName } = req.query;
  const foundUsers = await User.find({
    lastName: lastName,
    status: status,
  }).sort({ firstName: 1 });
  foundUsers.map(found => {
    found.password = null;
  });
  res.json({ foundUsers });
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ user });
});

app.all('/api*', verifyToken);
app.all('/prevatearea*', verifyToken);

app.get('/api/photos', async (req, res) => {
  const { page = 1, limit = 15 } = req.query;
  const photos = await Picture.find()
    .populate(['comments.user', 'likes.user', 'owner'])
    .skip(limit * (page - 1))
    .limit(limit);
  const total = await Picture.countDocuments();
  res.json({
    page,
    total,
    photos,
  });
});

app.get('/api/users/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  user = user.toObject();

  // удаляем пароль
  delete user.password;

  res.json(user);
});

app.get('/api/photos/:id', async (req, res) => {
  const photo = await Picture.findById(req.params.id).populate([
    'comments.user',
    'likes.user',
    'owner',
  ]);
  res.json(photo);
});

app.listen(8888, () => {
  console.log('Server has been started!');
});
