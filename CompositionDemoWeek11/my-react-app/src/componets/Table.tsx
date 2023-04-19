import React from 'react';

export default function Table = ({ headers, rows }) => {
    return (
      <table>
        <thead>
          <Header {headers}={headers:JSX.Element} />
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </tbody>
      </table>
    );
  };

// Row component
interface RowProps {
    row: string[];
  }

// Row component
interface HeaderProps {
    headers: string[];
  }

const headers = ['ID', 'Name', 'Age'];

// Header component
export const Header = ({ headers }:string[]) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
    </tr>
  );
};

// Row component
export const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, index) => (
        <td key={index}>{cell}</td>
      ))}
    </tr>
  );
};

// Table component



