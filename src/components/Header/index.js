import React from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt } from 'react-icons/fa';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Link to="/" className="logo">
        <FaGithubAlt size={30} />
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/repositories">Repositories</Link>
      </nav>
    </Container>
  );
}
