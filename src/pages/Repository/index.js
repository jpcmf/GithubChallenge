import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import { FaGitAlt, FaSpinner, FaSearch, FaGithub } from 'react-icons/fa';

import Header from '~/components/Header';
import Container from '~/components/Container';
import Pagination from '~/components/Pagination';
import LoadingLine from '~/components/LoadingLine';

import { Form, SubmitButton, List } from './styles';

import { api } from '~/services/api';

export default function Repository() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState(''); // eslint-disable-line

  const loadRepositories = useCallback(
    async (search, pageNumber = 1) => {
      try {
        setLoading(true);

        if (newRepo === '') {
          throw new Error('You need add a repository name.');
        }

        const response = await api.get('/search/repositories', {
          params: {
            q: search,
            page: pageNumber,
          },
        });

        const data = response.data.items;

        const newRepositories = data;

        localStorage.setItem(
          'newRepositories',
          JSON.stringify(newRepositories)
        );

        if (search) {
          const lastSearch = search;

          localStorage.setItem(
            'lastRepositorySearch',
            JSON.stringify(lastSearch)
          );
        }

        setRepositories(newRepositories);

        setReg(response.data.total_count);

        setError(false);
      } catch (err) {
        setError(true);

        toast.error('There was an error when trying to load users.');
      } finally {
        setLoading(false);
      }
    },
    [newRepo]
  );

  useEffect(() => {
    document.title = 'Github - Repositories';
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const newRepositories = localStorage.getItem('newRepositories');
    const lastSearch = localStorage.getItem('lastRepositorySearch');

    if (newRepositories) {
      setRepositories(JSON.parse(newRepositories));
    }

    if (lastSearch) {
      setNewRepo(JSON.parse(lastSearch));
    }
  }, []); // eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();

    loadRepositories(newRepo);

    if (newRepo) {
      const maxHistoryLenght = 5;
      const pastSearchesStorage = JSON.parse(
        localStorage.getItem('pastRepositorySearches')
      );
      const history = pastSearchesStorage || [];
      const isHistoryMaxed = history.length === maxHistoryLenght;
      const workingHistory = isHistoryMaxed ? history.slice(1) : history;
      const updatedHistory = workingHistory.concat(newRepo);

      localStorage.setItem(
        'pastRepositorySearches',
        JSON.stringify(updatedHistory)
      );
    }
  }

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  function handleNextPage() {
    setPage(page + 1);
    loadRepositories(newRepo, page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
    loadRepositories(newRepo, page - 1);
  }

  return (
    <>
      <Header />

      <Container>
        <h1>
          <FaGitAlt />
          Repositories
        </h1>
        <Form onSubmit={handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Search by repository or project name"
            value={newRepo}
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
          {loading && repositories ? (
            <>
              <li>
                <Shimmer>
                  <LoadingLine />
                </Shimmer>
              </li>
            </>
          ) : (
            repositories.map(repository => (
              <li key={repository.id}>
                <div>
                  <img
                    src={repository.owner.avatar_url}
                    alt={repository.name}
                  />
                  <Link
                    to={{
                      pathname: `/repository/${repository.full_name}`,
                    }}
                  >
                    {repository.name}
                  </Link>
                </div>

                <span>
                  <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit <FaGithub />
                  </a>
                </span>
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
              (page === 1 && repositories.length < 30) ||
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
