import { gql } from "urql";

export const LOGIN = gql`
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token
    user {
      id
      fullname
      roles
      isActive
    }
  }
}`;