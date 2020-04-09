import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Shimmer from 'react-shimmer-effect';

import { FaFileCode } from 'react-icons/fa';

import Header from '~/components/Header';
import Container from '~/components/Container';
import LoadingLine from '~/components/LoadingLine';

import { DetailsWrapper } from './styles';

import { api } from '~/services/api';

export default function RepositoryDetails() {
  const { owner, repo } = useParams();

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});

  const loadRepositoryDetails = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/repos/${owner}/${repo}`, {
        params: {},
      });

      localStorage.setItem('reposDetails', JSON.stringify(response.data));

      setDetails(response.data);
    } catch (err) {
      toast.error(
        'There was an error when trying to load the details of the repository.'
      );
    } finally {
      setLoading(false);
    }
  }, [owner, repo]);

  useEffect(() => {
    loadRepositoryDetails();
  }, [loadRepositoryDetails]);

  useEffect(() => {
    const repositoryDetails = localStorage.getItem('repositoryDetails');

    if (repositoryDetails) {
      setDetails(JSON.parse(repositoryDetails));
    }
  }, []);

  useEffect(() => {
    document.title = 'Github - Repository Details | Pitang Challenge';
  });

  return (
    <>
      <Header />

      <Container>
        <h1>
          <FaFileCode />
          About
        </h1>

        <DetailsWrapper>
          {loading && details ? (
            <ul>
              <li>
                <Shimmer>
                  <LoadingLine />
                </Shimmer>
              </li>
            </ul>
          ) : (
            <>
              {details.owner ? (
                <div>
                  <img
                    src={details.owner.avatar_url}
                    alt={details.owner.login}
                  />
                  <span>{details.owner.login}</span>
                </div>
              ) : (
                <div>
                  <img
                    src="https://api.adorable.io/avatars/133/abott@adorable.png"
                    alt={details.name}
                  />
                </div>
              )}
              <ul>
                {details.name ? (
                  <li>
                    <strong>Repository name:</strong>
                    <span>{details.name}</span>
                  </li>
                ) : null}

                {details.html_url ? (
                  <li>
                    <strong>Repository URL:</strong>
                    <span>
                      <a
                        href={details.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {details.name}
                      </a>
                    </span>
                  </li>
                ) : null}

                {details.description ? (
                  <li>
                    <strong>Description:</strong>
                    <span>{details.description}</span>
                  </li>
                ) : null}

                {details.language ? (
                  <li>
                    <strong>Language:</strong>
                    <span>{details.language}</span>
                  </li>
                ) : null}

                {details.watchers_count ? (
                  <li>
                    <strong>Watching:</strong>
                    <span>{details.watchers_count}</span>
                  </li>
                ) : null}

                {details.stargazers_count ? (
                  <li>
                    <strong>Star:</strong>
                    <span>{details.stargazers_count}</span>
                  </li>
                ) : null}

                {details.forks_count ? (
                  <li>
                    <strong>Fork:</strong>
                    <span>{details.forks_count}</span>
                  </li>
                ) : null}

                {details.created_at ? (
                  <li>
                    <strong>Created at:</strong>
                    <span>
                      {format(new Date(details.created_at), 'dd/MM/yyyy')}
                    </span>
                  </li>
                ) : null}

                {details.updated_at ? (
                  <li>
                    <strong>Updated at:</strong>
                    <span>
                      {format(new Date(details.updated_at), 'dd/MM/yyyy')}
                    </span>
                  </li>
                ) : null}
              </ul>
            </>
          )}
        </DetailsWrapper>
      </Container>
    </>
  );
}
