import React from 'react';

interface Planet {
  name: string;
  climate: string;
  population: string;
}

interface PlanetListProps {
  searchResults: Planet[];
}

const PlanetList: React.FC<PlanetListProps> = ({ searchResults }) => {
  return (
    <ul>
      {searchResults.map((planet) => (
        <li key={planet.name}>
          <strong>Name:</strong> {planet.name} <br />
          <strong>Climate:</strong> {planet.climate} <br />
          <strong>Population:</strong> {planet.population}
        </li>
      ))}
    </ul>
  );
};

export default PlanetList;
