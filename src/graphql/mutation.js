const { gql } = require("@apollo/client");

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $role: String!
    $password: String!
  ) {
    register(name: $name, email: $email, role: $role, password: $password) {
      id
      name
      email
      role
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
