import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <nav>
        <Link to="/">Main</Link>
        <Link to="/users">Users</Link>
        <Link to="/repositories">Repositories</Link>
      </nav>
    </Container>
  );
}
