import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import {
  FaPlus,
  FaGitAlt,
  FaSpinner,
  FaUsers,
  FaSearch,
  FaStar,
} from 'react-icons/fa';

import Header from '../../components/Header';
import Container from '../../components/Container';
import LoadingLine from '~/components/LoadingLine';

import { MainWrapper, MainColumns, Form, SubmitButton, List } from './styles';

import { api, api2 } from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [activedUsers, setActivedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMostActiveUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api2.get();

      setActivedUsers(response.data);
    } catch (err) {
      toast.error(
        'There was an error when trying to load the most actived users'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMostActiveUsers();
  }, [loadMostActiveUsers]);

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

  function handleDelete(item) {
    const storage = localStorage.getItem('repositories');
    const storageArr = JSON.parse(storage);
    const index = storageArr.findIndex(s => s.id === item.id);

    storageArr.splice(index, 1);
    localStorage.setItem('repositories', JSON.stringify(storageArr));
    setRepositories(storageArr);
  }

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
            <List className="most-actived">
              {loading ? (
                <li>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </li>
              ) : (
                activedUsers.slice(0, 5).map(item => (
                  <li key={item.name}>
                    <div className="most-actived__user">
                      <img src={item.avatar} alt={item.name} />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.author}
                      </a>
                    </div>
                    {item.language ? (
                      <div className="most-actived__repo-name">
                        <small>{item.language}</small>
                      </div>
                    ) : null}
                    <div className="most-actived__star">
                      <FaStar size={14} />
                      <span>{item.stars}</span>
                    </div>
                  </li>
                ))
              )}
            </List>
          </Container>
        </MainColumns>

        <Container>
          <h1>
            <FaGitAlt />
            Save favorites repositories
          </h1>
          <h5>
            You need specify the full name of repository including the owner,
            for eg. <small>jpcmf/GoBarber</small>
          </h5>
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
                  <div>
                    <Link
                      to={{
                        pathname: `/repositories/${repository.full_name}`,
                      }}
                    >
                      Details
                    </Link>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleDelete(repository)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
          </List>
        </Container>
      </MainWrapper>
    </>
  );
}
