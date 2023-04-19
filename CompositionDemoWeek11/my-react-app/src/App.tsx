import React from 'react';
import Table, {Header,Row} from './componets/Table'; 


  const people = [
    { id: '1', name: 'Helle', age: 20 },
    { id: '2', name: 'Ib', age: 30 },
    { id: '3', name: 'Bodil', age: 45 },
  ];

  const headers = ['ID', 'Name', 'Age'];
  const rows = people.map((person) => [person.id, person.name, person.age]);

  return (
    <div>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default App;
