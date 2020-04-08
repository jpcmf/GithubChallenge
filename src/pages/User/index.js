import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import { FaUsers, FaSpinner, FaSearch } from 'react-icons/fa';

import Header from '~/components/Header';
import Container from '~/components/Container';
import Pagination from '~/components/Pagination';
import LoadingLine from '~/components/LoadingLine';

import { Form, SubmitButton, List } from './styles';

import api from '~/services/api';

export default function Repository() {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState(''); // eslint-disable-line

  const loadUsers = useCallback(async (search, pageNumber = 1) => {
    try {
      setLoading(true);

      const response = await api.get('/search/users', {
        params: {
          q: search,
          page: pageNumber,
        },
      });

      const data = response.data.items;

      const newUsers = data;

      localStorage.setItem('users', JSON.stringify(newUsers));

      if (search) {
        const lastSearch = search;

        localStorage.setItem('search', JSON.stringify(lastSearch));
      }

      if (pageNumber) {
        const lastPageNumber = pageNumber;

        localStorage.setItem('page', JSON.stringify(lastPageNumber));
      }

      setUsers(newUsers);

      setReg(response.data.total_count);

      setError(false);
    } catch (err) {
      setError(true);

      toast.error('There was an error when trying to load users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Github - Users';
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const storage = localStorage.getItem('users');
    const lastSearch = localStorage.getItem('search');

    if (storage) {
      setUsers(JSON.parse(storage));
    }

    if (lastSearch) {
      setNewUser(JSON.parse(lastSearch));
    }
  }, []); // eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();

    loadUsers(newUser);
  }

  function handleInputChange(e) {
    setNewUser(e.target.value);
  }

  function handleNextPage() {
    setPage(page + 1);
    loadUsers(newUser, page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
    loadUsers(newUser, page - 1);
  }

  return (
    <>
      <Header />

      <Container>
        <h1>
          <FaUsers />
          Users
        </h1>
        <Form onSubmit={handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Search by username or full name"
            value={newUser}
            onChange={handleInputChange}
          />

          <SubmitButton>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaSearch color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {loading && users ? (
            <>
              <li>
                <Shimmer>
                  <LoadingLine />
                </Shimmer>
              </li>
            </>
          ) : (
            users.map(user => (
              <li key={user.id}>
                <div>
                  <img src={user.avatar_url} alt={user.login} />
                  <span>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.login}
                    </a>
                  </span>
                </div>

                <Link to={`/users/${user.login}`}>Details</Link>
              </li>
            ))
          )}
        </List>

        <Pagination>
          <button type="button" onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={
              (page !== 1 && reg / 30 <= page) ||
              (page === 1 && users.length < 30) ||
              (q !== '' && reg === 30) ||
              reg === 30
            }
          >
            Next
          </button>
        </Pagination>
      </Container>
    </>
  );
}
