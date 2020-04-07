import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import { FaUsers, FaStar, FaGitAlt } from 'react-icons/fa';

import Header from '~/components/Header';
import Container from '~/components/Container';
import LoadingLine from '~/components/LoadingLine';

import { DetailsWrapper, RepositoriesWrapper, EmptyWrapper } from './styles';

import api from '~/services/api';

export default function UserDetails({ match }) {
  const userName = match.params.id;

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [sort, setSort] = useState();

  const loadUserDetails = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/users/${userName}`, {
        params: {
          // client_id: api.defaults.client_id,
          // client_secret: api.defaults.client_secret,
        },
      });

      setDetails(response.data);
    } catch (err) {
      toast.error(
        'There was an error when trying to load the details of the user.'
      );
    } finally {
      setLoading(false);
    }
  }, [userName]);

  const loadRepositories = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/users/${userName}/repos`, {
        params: {
          // client_id: api.defaults.client_id,
          // client_secret: api.defaults.client_secret,
          sort,
          direction: 'desc',
        },
      });

      setRepositories(response.data);
    } catch (err) {
      toast.error(
        'There was an error when trying to load the repositories of the user.'
      );
    } finally {
      setLoading(false);
    }
  }, [sort, userName]);

  useEffect(() => {
    loadUserDetails();
    loadRepositories();
  }, [loadRepositories, loadUserDetails]);

  function handleOrder(value) {
    setSort(value);
  }

  return (
    <>
      <Header />

      <Container>
        <h1>
          <FaUsers />
          Details
        </h1>

        <DetailsWrapper>
          <div>
            <img src={details.avatar_url} alt={details.name} />
          </div>
          <ul>
            <li>
              <strong>Name:</strong>
              <span>{details.name}</span>
            </li>
            <li>
              <strong>Username:</strong>
              <span>{details.login}</span>
            </li>
            {details.location ? (
              <li>
                <strong>Location:</strong>
                <span>{details.location}</span>
              </li>
            ) : null}
            {details.bio ? (
              <li>
                <strong>Bio:</strong>
                <span>{details.bio}</span>
              </li>
            ) : null}
          </ul>
        </DetailsWrapper>
      </Container>

      <Container>
        <div className="title-group">
          <h1>
            <FaGitAlt />
            Repositories
          </h1>
          <div className="filter">
            <span>Order:</span>
            <div>
              <button type="button" onClick={() => handleOrder('updated')}>
                Last updated
              </button>
              <button type="button" onClick={() => handleOrder('created')}>
                Last created
              </button>
            </div>
          </div>
        </div>

        <RepositoriesWrapper>
          <ul>
            {loading && repositories ? (
              <>
                <li>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </li>
                <li>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </li>
                <li>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </li>
              </>
            ) : (
              repositories.map(item => (
                <li key={item.id}>
                  <div className="repository">
                    <div className="repository__header">
                      <a
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                      <span>{item.description}</span>
                    </div>
                    <div className="repository__footer">
                      <span>
                        <FaStar />
                        <span>{item.stargazers_count}</span>
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
            {!repositories.length && !loading && <li>No repository found.</li>}
          </ul>
        </RepositoriesWrapper>
      </Container>
    </>
  );
}
