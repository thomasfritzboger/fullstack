import express, { Request, Response } from 'express';
require("dotenv").config()
import morgan from 'morgan';
import { readFileSync, writeFileSync } from 'node:fs';
//import { v4 as uuidv4 } from 'uuid';
const log4js = require('log4js');
const config = require('./log4js.json');

log4js.configure(config);

const logger = log4js.getLogger();

interface Person {
    id: string;
    name: string;
    age: number;
    city: string;
  }

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  const date = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  logger.info(`${date} ${method} ${url} ${JSON.stringify(req.body)}`);
  next();
}); 

if (process.env.NODE_ENV=== 'development') {
    app.use(morgan('dev'))
    console.log('dev mode')
}

// const generateId = (): string => {
//     return uuidv4();
//   };

  const getPeople = (): Person[] => {
    const data = readFileSync('./people.json', 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.people as Person[];
  };

const findPersonById = (people: Person[], id: string): Person | undefined => {
  return people.find(person => person.id.toString() === id);
};

  app.get('/api/people', (req: Request, res: Response) => {
    const people = getPeople();
    console.log('hej');
    
    console.log(people);
    
    res.status(200).json(people);
  });

  app.get('/api/people/:id', (req: Request, res: Response): void => {
    const id = req.params.id;
    const people = getPeople();
    const person = findPersonById(people, id);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ msg: 'Person not found' });
    }
  });

app.post('/api/people', (req: Request, res: Response) : void => {
  const { name, age, city } = req.body;
  const people = getPeople();
  const lastPerson = people[people.length - 1];
  const lastId = parseInt(lastPerson.id);
  const newPerson: Person = {
    id: (lastId + 1).toString(),
    name,
    age,
    city,
  };
  people.push(newPerson);
  writeFileSync('./people.json', JSON.stringify({ people }, null, 2));

  res.status(201).json(newPerson);
});
  
  app.put('/api/people/:id', (req: Request, res: Response) : void => {
  const id = req.params.id;
  const people = getPeople();
  const personIndex = people.findIndex((person) => person.id === id);
  if (personIndex === -1) {
    res.status(404).json({ msg: 'Person not found' });
    return;
  }
  const updatedPerson: Person = {
    id: id,
    name: req.body.name,
    age: req.body.age,
    city: req.body.city
  };
  people[personIndex] = updatedPerson;
  writeFileSync('./people.json', JSON.stringify({ people }, null, 2));

  res.status(200).json(updatedPerson);
});

app.patch('/api/people/:id', (req: Request, res: Response): void => {
    const id = req.params.id;
    const updateData = req.body;
    const people = getPeople();
    const index = people.findIndex(person => person.id === id);
  
    if (index === -1) {
        res.status(404).json({ msg: 'Person not found' });
        return 
    }

    people[index] = { ...people[index], ...updateData };
    writeFileSync('./people.json', JSON.stringify({ people }, null, 2));

    res.status(200).json(people[index]);
  });
  
  app.delete('/api/people/:id', (req, res) => {
    const people = getPeople();
    const index = people.findIndex(person => person.id === req.params.id);
    if (index === -1) {
      return res.status(404).send('Person not found');
    }
    people.splice(index, 1);
    writeFileSync('./people.json', JSON.stringify({ people }, null, 2));

    res.json(people);
  });
  
const PORT = process.env.PORT
app.listen(PORT,() => {console.log(`server is listening to port 3001`)})