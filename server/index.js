/*   **********************************************************
 *****       NEURON SERVER          ***********************
 **********************************************************
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.set('useFindAndModify', false);

mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { useNewUrlParser: true }
);

const app = express();

const User = require('./models/user');
const Class = require('./models/class');
const Course = require('./models/course');
const Subject = require('./models/subject');
const Theme = require('./models/theme');
const Lesson = require('./models/lesson');
const Hw = require('./models/homework');

const secret = 'ludfkasdjkk23rj0f[sj99jls--dljie';

/*  **********************************************************
 *****      AUTH SECTION            ***********************
 **********************************************************
 */

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

/*  **********************************************************
    *****       REG SECTION            ***********************
    **********************************************************
 
*/

app.post('/reg', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();
  res.json(user);
});

app.post('/reg-class', async (req, res) => {
  let newClass = new Class(req.body);
  newClass = await newClass.save();
  res.json(newClass);
});

app.post('/reg-course', async (req, res) => {
  let course = new Course(req.body);
  course = await course.save();
  res.json(course);
});

app.post('/reg-subject', async (req, res) => {
  let subject = new Subject(req.body);
  subject = await subject.save();
  res.json(subject);
  console.log(subject);
});

app.post('/reg-theme', async (req, res) => {
  let theme = new Theme(req.body);
  theme = await theme.save();
  res.json(theme);
});

app.post('/reg-lesson', async (req, res) => {
  let lesson = new Lesson(req.body);
  lesson = await lesson.save();
  res.json(lesson);
});

/*     **********************************************************
       *****       GET SECTION            ***********************
       **********************************************************
 
*/

app.get('/users', async (req, res) => {
  const { status } = req.query;
  const users = await User.find({ status: status }).sort({ lastName: 1 });
  users.map(user => {
    user.password = null;
  });
  res.json({ users });
});

app.get('/classes', async (req, res) => {
  const studyClasses = await Class.find().sort({ name: 1 });
  res.json({ studyClasses });
});

app.get('/courses', async (req, res) => {
  const course = await Course.find().sort({ studyYear: 1 });
  res.json({ course });
});

app.get('/subject', async (req, res) => {
  const subject = await Subject.find().sort({ subject: 1 });
  res.json({ subject });
});

app.get('/theme', async (req, res) => {
  const theme = await Theme.find().sort({ name: 1 });
  res.json({ theme });
});

app.get('/lesson', async (req, res) => {
  const lesson = await Lesson.find().sort({ name: 1 });
  res.json({ lesson });
});

app.get('/find-class', async (req, res) => {
  const { name } = req.query;
  const studyClasses = await Class.find({ name: name }).sort({ name: 1 });
  res.json({ studyClasses });
});

app.get('/find-course', async (req, res) => {
  const { subject } = req.query;
  const courses = await Course.find({ subject: subject });
  res.json({ courses });
});

app.get('/pupil/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id);
  res.json({ user });
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

app.get('/user/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  user = user.toObject();
  //удаляем пароль
  delete user.password;
  res.json(user);
});

app.get('/subject/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id).sort({ subject: 1 });
  res.json({ subject });
});

app.get('/theme/:id', async (req, res) => {
  const theme = await Theme.findById(req.params.id).sort({ theme: 1 });
  res.json({ theme });
});

app.get('/lesson/:id', async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).sort({ lesson: 1 });
  res.json({ lesson });
});

/*    **********************************************************
      *****       PUT SECTION            ***********************
      **********************************************************
 
*/

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ user });
});

app.put('/classes/:id', async (req, res) => {
  let user = { user: req.body.pupil };
  const updateClass = await Class.findByIdAndUpdate(req.params.id, {
    $push: { pupil: user },
  }).catch(() => {
    console.log('class to add user or user was not chosen');
    return 'Вы не выбрали класс или ученика';
  });
  res.json({ updateClass });
});
app.put('/class/:id', async (req, res) => {
  let user = { user: req.body.user };
  let teacher = req.body.teacher;
  let updateClass;
  if (!teacher == '') {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      teacher: teacher,
    });
  }
  if (!user == '') {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      $pull: { pupil: user },
    }).catch(err => {
      console.log("we don't want to delete any user from this class");
    });
  }

  res.json({ updateClass });
});

app.put('/courses/:id', async (req, res) => {
  const subject = req.body.subject;
  course = await Course.findByIdAndUpdate(req.params.id, {
    $push: { subject: subject },
  }).catch(err => {
    console.log('course to edit or subject to add was not chosen');
  });
  res.json({ course });
});

app.put('/courses/delete/:id', async (req, res) => {
  const subject = req.body.subject;
  course = await Course.findByIdAndUpdate(req.params.id, {
    $pull: { subject: subject },
  }).catch(err => {
    console.log('course to edit or subject to delete was not chosen');
  });
  res.json({ course });
});

app.put('/subjects/:id', async (req, res) => {
  const theme = req.body.theme;
  subject = await Subject.findByIdAndUpdate(req.params.id, {
    $push: { themes: theme },
  }).catch(err => {
    console.log('subject to edit or theme to add was not chosen');
  });
  res.json({ subject });
});

app.put('/subjects/delete/:id', async (req, res) => {
  const theme = req.body.theme;
  subject = await Subject.findByIdAndUpdate(req.params.id, {
    $pull: { themes: theme },
  }).catch(err => {
    console.log('subject to edit or theme to delete was not chosen');
  });
  res.json({ subject });
});

app.put('/themes/:id', async (req, res) => {
  const lesson = req.body.lesson;
  theme = await Theme.findByIdAndUpdate(req.params.id, {
    $push: { lessons: lesson },
  }).catch(err => {
    console.log('theme to edit or lesson to add was not chosen');
  });
  res.json({ theme });
});

app.put('/themes/delete/:id', async (req, res) => {
  const lesson = req.body.lesson;
  theme = await Theme.findByIdAndUpdate(req.params.id, {
    $pull: { lessons: lesson },
  }).catch(err => {
    console.log('Theme to edit or lesson to delete was not chosen');
  });
  res.json({ theme });
});

/*      **********************************************************
        *****       API SECTION            ***********************
        **********************************************************
 
*/

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

//APP PORT

app.listen(8888, () => {
  console.log('Server has been started!');
});
