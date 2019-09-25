/**********************************************************
 *****       NEURON SERVER          ***********************
 **********************************************************
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const AWS = require('aws-sdk');
//AWS.config.loadFromPath('./config.json');
const S3 = require('aws-sdk/clients/s3');

AWS.config.update({
  accessKeyId: 'sHGdyEex47fVtP85ghTn1K',
  secretAccessKey: '4A6gk1f3oo7K55nWuqzBKynaTuCpJkxopbm4c3eUXzE1',
  region: 'ru-msk',
  endpoint: 'http://hb.bizmrg.com',
});

const neuronStore = new AWS.S3();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var multer = require('multer');
var uploadFromUser = multer().single('file');
const formData = require('express-form-data');

mongoose.set('useFindAndModify', false);

mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { useNewUrlParser: true }
);

const app = express();
app.use(express.json());
app.use(cors());

/* const options = {
  autoClean: true,
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union()); */

const User = require('./models/user');
const Class = require('./models/class');
const Course = require('./models/course');
const Subject = require('./models/subject');
const Theme = require('./models/theme');
const Lesson = require('./models/lesson');
const UserDoc = require('./models/userDoc');
const Hw = require('./models/homework');

const secret = 'ludfkasdjkk23rj0f[sj99jls--dljie';

/**********************************************************
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
    *****       USER SECTION            ***********************
    **********************************************************
 
*/

app.post('/reg', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();
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

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ user });
});

/*     **********************************************************
       *****       CLASSES SECTION          ***********************
       **********************************************************
 
*/

app.post('/reg-class', async (req, res) => {
  let newClass = new Class(req.body);
  newClass = await newClass.save();
  res.json(newClass);
});

app.get('/classes', async (req, res) => {
  const studyClasses = await Class.find().sort({ name: 1 });
  res.json({ studyClasses });
});

app.get('/class/:id', async (req, res) => {
  const studyClass = await Class.findById(req.params.id).catch(err => {
    console.log('The user is not a member of any class');
  });
  res.json({ studyClass });
});

app.get('/find-class', async (req, res) => {
  const { name } = req.query;
  const studyClasses = await Class.find({ name: name }).sort({ name: 1 });
  res.json({ studyClasses });
});

app.put('/classes/:id', async (req, res) => {
  let user = req.body.pupil;
  let course = req.body.courseId;
  let updateClass;
  if (user) {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      $addToSet: { pupil: user },
    }).catch(() => {
      console.log('class to add or user was not chosen');
      return 'Вы не выбрали класс или ученика';
    });
    await User.findByIdAndUpdate(user, {
      class: req.params.id,
    });
  }
  if (course) {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      $addToSet: { courses: course },
    }).catch(() => {
      console.log('class to add or course was not chosen');
      return 'Вы не выбрали класс или курс';
    });
    await Course.findByIdAndUpdate(course, {
      $addToSet: { classes: req.params.id },
    }).catch(err => {
      console.log(err);
    });
  }

  res.json({ updateClass });
});

app.put('/classes/delete/:id', async (req, res) => {
  console.log('class id :' + req.params.id);
  let user = req.body.user;
  let teacher = req.body.teacher;
  let course = req.body.courseId;
  let updateClass;
  if (teacher) {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      teacher: teacher,
    });
  }
  if (user) {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      $pull: { pupil: user },
    }).catch(err => {
      console.log("we don't want to delete any user from this class");
    });
    await User.findByIdAndUpdate({ _id: user }, { class: null });
  }
  if (course) {
    updateClass = await Class.findByIdAndUpdate(req.params.id, {
      $pull: { courses: course },
    }).catch(err => {
      console.log(err);
    });
    await Course.findByIdAndUpdate(course, {
      $pull: { classes: req.params.id },
    }).catch(err => {
      console.log(err);
    });
  }
  res.json({ updateClass });
});

/*     **********************************************************
       *****       COURSES SECTION        ***********************
       **********************************************************
 
*/

app.post('/reg-course', async (req, res) => {
  let course = new Course(req.body);
  course = await course.save();
  res.json(course);
});

app.get('/courses', async (req, res) => {
  const course = await Course.find().sort({ studyYear: 1 });
  res.json({ course });
});

app.get('/find-course', async (req, res) => {
  const { subject } = req.query;
  const courses = await Course.find({ subject: subject });
  res.json({ courses });
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
  const id = req.body.id;
  let course;
  if (subject) {
    course = await Course.findByIdAndUpdate(req.params.id, {
      $pull: { subject: subject },
    }).catch(err => {
      console.log('course to edit or subject to delete was not chosen');
    });
  }
  if (id) {
    course = await Course.findByIdAndDelete(id);
  }

  res.json({ course });
});

/* **********************************************************
   *****       SUBJECT SECTION        ***********************
   **********************************************************
 
*/

app.post('/reg-subject', async (req, res) => {
  let subject = new Subject(req.body);
  subject = await subject.save();
  res.json(subject);
  console.log(subject);
});

app.get('/subject', async (req, res) => {
  const subject = await Subject.find().sort({ subject: 1 });
  res.json({ subject });
});

app.get('/subject/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id).sort({ subject: 1 });
  res.json({ subject });
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
  const courses = await Course.find();
  const theme = req.body.theme;
  const delMarker = req.body.delMarker;
  let subject;
  let courseId;

  if (theme) {
    subject = await Subject.findByIdAndUpdate(req.params.id, {
      $pull: { themes: theme },
    }).catch(err => {
      console.log('subject to edit or theme to delete was not chosen');
    });
  }

  if (delMarker) {
    courses.map(item => {
      item.subject.map(i => {
        if (i == req.params.id) {
          courseId = item._id;
        }
      });
    });
  }
  if (courseId) {
    await Course.findByIdAndUpdate(courseId, {
      $pull: { subject: req.params.id },
    }).catch(err => {
      if (err) {
        console.log(err);
      }
    });
  }

  subject = await Subject.findByIdAndDelete(req.params.id, (err, res) => {
    if (err) {
      console.log(err);
    }
  });

  res.json({ subject });
});

/* **********************************************************
 *****       THEME SECTION          ***********************
 **********************************************************
 */

app.post('/reg-theme', async (req, res) => {
  let theme = new Theme(req.body);
  theme = await theme.save();
  res.json(theme);
});

app.get('/theme', async (req, res) => {
  const theme = await Theme.find().sort({ theme: 1 });
  res.json({ theme });
});

app.get('/theme/:id', async (req, res) => {
  const theme = await Theme.findById(req.params.id).sort({ theme: 1 });
  res.json({ theme });
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
  const delMarker = req.body.marker;
  let theme;
  const subjects = await Subject.find();
  let subId;
  if (lesson) {
    theme = await Theme.findByIdAndUpdate(req.params.id, {
      $pull: { lessons: lesson },
    }).catch(err => {
      console.log('Theme to edit or lesson to delete was not chosen');
    });
  }
  if (delMarker) {
    subjects.map(i => {
      i.themes.map(item => {
        if (item == req.params.id) {
          subId = i._id;
        }
      });
    });
    if (subId) {
      const subToEdit = await Subject.findByIdAndUpdate(subId, {
        $pull: { themes: req.params.id },
      });
      console.log(subToEdit);
    }
    theme = await Theme.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  }
  res.json({ theme });
});

/*  **********************************************************
    *****       LESSON SECTION AWS       *********************
    **********************************************************
 
*/

app.put('/reg-lesson', async (req, res) => {
  let lesson, toTheme, lessonId, fileName, file;
  let failedMessage = 'Файл с этим именем уже существует';
  let successMessage = 'файл успешно добавлен';
  let getFormData = new Promise((resolve, reject) => {
    // geting formData
    uploadFromUser(req, res, err => {
      if (err instanceof multer.MulterError) {
        reject(console.log(err));
      }
      fileName = req.body.body[0];
      lesson = req.body.body[1];
      toTheme = req.body.body[2];
      file = req.file.buffer;
      resolve(() => {
        console.log('promise done');
      });
    });
  });

  getFormData
    .then(async result => {
      let isLesson = await Lesson.findOne({
        lesson: lesson,
      }).lean();
      if (isLesson) {
        res.status(200).send(`${failedMessage}`);
        return;
      } else {
        const docData = {
          lesson: lesson,
          toTheme: toTheme,
          fileName: fileName,
        };
        // save docData into mongodb
        let newLesson = new Lesson(docData);
        newLesson = await newLesson.save();
        console.log(newLesson);
        lessonId = newLesson._id;
      }
    })
    .then(result => {
      message = result;
      // put file into cloud
      console.log(lessonId, fileName, file);
      if (lessonId && fileName && file) {
        console.log(lessonId, fileName, file);
        neuronStore.putObject(
          {
            Body: file,
            Bucket: 'neuron-bucket',
            Key: `lessons/${lessonId}/${fileName}`,
          },
          (err, data) => {
            if (err) console.log('an error occurred  ', err, err.stack);
            else console.log('successful response ', data);
            res.status(200).send(`${successMessage}`);
          }
        );
      }
    });
});

app.put('/lesson/delete/:id', async (req, res) => {
  const lessonId = req.params.id;
  const themes = await Theme.find();
  let themeId;
  themes.map(item => {
    item.lessons.map(i => {
      if (i == req.params.id) {
        return (themeId = item._id);
      }
    });
  });
  if (themeId) {
    const theme = await Theme.findByIdAndUpdate(themeId, {
      $pull: { lessons: req.params.id },
    });
    console.log(theme);
  }
  let lessonToDel = await Lesson.findById(lessonId);
  let fileName = lessonToDel.fileName;
  neuronStore.deleteObject(
    {
      Bucket: 'neuron-bucket',
      Key: `lessons/${lessonId}/${fileName}`,
    },
    (err, data) => {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
      res.json('successful doc delete');
    }
  );
  const lesson = await Lesson.findByIdAndDelete(lessonId, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
  //res.json({ lesson });
});

app.get('/lesson', async (req, res) => {
  const lesson = await Lesson.find().sort({ name: 1 });
  res.json({ lesson });
});

app.get('/lesson/:id', async (req, res) => {
  const lessonId = req.params.id;
  console.log(lessonId);
  const lesson = await Lesson.findById(lessonId);
  const fileName = lesson.fileName;
  if (lessonId && fileName) {
    neuronStore.getObject(
      {
        Bucket: 'neuron-bucket',
        Key: `lessons/${lessonId}/${fileName}`,
      },
      (err, data) => {
        if (err) console.log(err, err.stack);
        // an error occurred
        //console.log(data); // successful response
        else res.json({ data });
      }
    );
  }
  //res.json({ lesson });
});

/**********************************************************
 *****       AWS SECTION            ***********************
 **********************************************************
 */

//TO PUT OBJ INTO CLOUD AND MONGO

app.put('/upload/udoc', async (req, res) => {
  let userId, userDocId, docName, file;
  let failedMessage = 'Документ с этим именем уже существует';
  let successMessage = 'файл успешно добавлен';
  let getFormData = new Promise((resolve, reject) => {
    // geting formData
    uploadFromUser(req, res, err => {
      if (err instanceof multer.MulterError) {
        reject(console.log(err));
      }
      userId = req.body.body[0];
      docName = req.body.body[1];
      file = req.file.buffer;
      resolve(() => {
        console.log('promise done');
      });
    });
  });

  getFormData
    .then(async result => {
      let userDoc = await UserDoc.findOne({
        user: userId,
        docName: docName,
      }).lean();
      if (userDoc) {
        res.status(200).send(`${failedMessage}`);
        return;
      } else {
        const docData = {
          user: userId,
          docName: docName,
        };
        // save docData into mongodb
        let userDoc = new UserDoc(docData);
        userDoc = await userDoc.save();
        //console.log(userDoc);
        userDocId = userDoc._id;
      }
    })
    .then(result => {
      message = result;
      // put file into cloud
      if (userId && userDocId && docName) {
        neuronStore.putObject(
          {
            Body: file,
            Bucket: 'neuron-bucket',
            Key: `udoc/${userId}/${userDocId}/${docName}`,
          },
          (err, data) => {
            if (err) console.log('an error occurred  ', err, err.stack);
            else console.log('successful response ', data);
            res.status(200).send(`${successMessage}`);
          }
        );
      }
    });
});

//TO GET USER-DOC-LIST

app.get('/udoc-list/:id', async (req, res) => {
  userId = req.params.id;
  if (userId) {
    let userDoc = await UserDoc.find({
      user: userId,
    }).lean();
    res.json({ userDoc });
  }
});

//TO GET OBJ FROM CLOUD AND MONGO

app.get('/udoc/:id', async (req, res) => {
  let id = req.params.id;
  let userDoc = await UserDoc.findById(req.params.id);
  if (id) {
    neuronStore.getObject(
      {
        Bucket: 'neuron-bucket',
        Key: `udoc/${userDoc.user}/${userDoc._id}/${userDoc.docName}`,
      },
      (err, data) => {
        if (err) console.log(err, err.stack);
        // an error occurred
        //console.log(data); // successful response
        else res.json({ data });
      }
    );
  }
});

// TO DELETE OBJ FROM CLOUD AND MONGO

app.get('/udoc/del/:id', async (req, res) => {
  const id = req.params.id;
  if (id) {
    let userDoc = await UserDoc.findById(id);
    neuronStore.deleteObject(
      {
        Bucket: 'neuron-bucket',
        Key: `udoc/${userDoc.user}/${userDoc._id}/${userDoc.docName}`,
      },
      (err, data) => {
        if (err) console.log(err, err.stack);
        // an error occurred
        else console.log(data); // successful response
        res.json('successful doc delete');
      }
    );
    await UserDoc.findByIdAndDelete(id);
  }
});

//APP PORT

app.listen(8888, () => {
  console.log('Server has been started!');
});
