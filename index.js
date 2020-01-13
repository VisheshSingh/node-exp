const express = require('express');
const Joi = require('joi');

const app = express();

// MIDDLEWARE
app.use(express.json());

const courses = [
  { id: 1, name: 'Modern Javascript' },
  { id: 2, name: 'React Front to Back' },
  { id: 3, name: 'Building APIs with Node & Express' }
];

app.get('/', (req, res) => {
  res.send('Welcome to courses API, you may access it here - /api/courses');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const result = validateCourse(req.body);

  if (result.error) {
    // BAD REQUEST
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('Course with requested id not found 😣');

  const result = validateCourse(req.body);

  if (result.error) {
    // BAD REQUEST
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));

  if (!course)
    return res
      .status(404)
      .send('Course with requested id cannot be deleted! 😣');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to PORT ${port}...`));
