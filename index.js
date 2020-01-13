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
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to PORT ${port}...`));
