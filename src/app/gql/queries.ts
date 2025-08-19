import { gql } from "graphql-request";



export const Login_USER=gql`
query Query($userCred: String!, $password: String!) {
  loginUser(userCred: $userCred, password: $password)
}


`
export const GET_USER=gql`query Query {
  getAllUsers {
    name
    email
    username
    avatar
    role
    
  }
}`
export const GET_PRODUCT=gql`

query Query {
  getAllProducts {
    title
    category
    description
    price
    stock
    imageUrl
    id
  }
}


`
export const GET_PRO_DETAILS=gql`
query Query($id: String!) {
  getProduct(id: $id) {
    id
    title
    description
    category
    price
    stock
    imageUrl
  }
}


`

export const CREATE_SALE=gql`
mutation Mutation($id: String!, $quantity: Int!) {
  createSale(id: $id, quantity: $quantity)
}

`