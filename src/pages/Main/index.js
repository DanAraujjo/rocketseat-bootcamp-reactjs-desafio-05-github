import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, ErrorMessage } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null, errorMessage: null });
  };

  handleDelete = repository => {
    this.setState({
      repositories: this.state.repositories.filter(r => r.name !== repository),
    });

    console.log(this.state.repositories);
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '')
        throw new Error('Você precisa indicar um repositório');

      //verifica se ja existe um repositorio com o mesmo nome
      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) throw new Error('Repositório duplicado');

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        owner: {
          name: response.data.owner.login,
          avatar_url: response.data.owner.avatar_url,
        },
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (Error) {
      this.setState({
        error: true,
        errorMessage:
          Error.message === 'Request failed with status code 404'
            ? 'Repositório não encontrado'
            : Error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error, errorMessage } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          GithHub Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adcionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
                {repository.name}
              </Link>

              <button
                type="button"
                onClick={() => this.handleDelete(repository.name)}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
