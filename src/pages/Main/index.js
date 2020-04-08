import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  FaPlus,
  FaGithubAlt,
  FaSpinner,
  FaUsers,
  FaSearch,
} from 'react-icons/fa';

import Header from '../../components/Header';
import Container from '../../components/Container';

import { MainWrapper, MainColumns, Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      if (newRepo === '') {
        throw new Error('You need add a repository name.');
      }

      const hasRepo = repositories.some(
        r => r.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (hasRepo) {
        throw new Error('You can not add the same repository.');
      }

      const response = await api.get(`repos/${newRepo}`);

      const data = {
        ...response.data,
        name: response.data.full_name,
      };

      const newRepositories = [...repositories, data];

      localStorage.setItem('repositories', JSON.stringify(newRepositories));

      setRepositories(newRepositories);
      setNewRepo('');
      setError(false);

      toast.success('Repository added successfully!');
    } catch (err) {
      setError(true);

      if (err.response && err.response.status === 404) {
        toast.error('Invalid repository name.');
      } else {
        toast.warn(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storage = localStorage.getItem('repositories');

    if (storage) {
      setRepositories(JSON.parse(storage));
    }
  }, []);

  const loadMostActiveUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/repos/gayanvoice/most-active-github-users-nodejs`
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMostActiveUsers();
  }, [loadMostActiveUsers]);

  return (
    <>
      <Header />

      <MainWrapper>
        <MainColumns>
          <Container>
            <h1>
              <FaSearch />
              Last searches
            </h1>
          </Container>

          <Container>
            <h1>
              <FaUsers />
              Most actived users
            </h1>
          </Container>
        </MainColumns>

        <Container>
          <h1>
            <FaGithubAlt />
            Save favorites repositories
          </h1>
          <Form onSubmit={handleSubmit} error={error}>
            <input
              type="text"
              placeholder="Add the repository name"
              value={newRepo}
              onChange={handleInputChange}
            />

            <SubmitButton>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </Form>

          <List>
            {repositories &&
              repositories.map(repository => (
                <li key={repository.name}>
                  <span>{repository.name}</span>

                  <Link
                    to={{
                      pathname: `/repositories/${repository.full_name}`,
                    }}
                  >
                    Details
                  </Link>
                </li>
              ))}
          </List>
        </Container>
      </MainWrapper>
    </>
  );
}
