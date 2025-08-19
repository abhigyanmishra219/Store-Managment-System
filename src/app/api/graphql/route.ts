import { addProduct, createSale, getAllProducts, getProduct } from "@/app/resolver/product";
import { createUser, getAllUsers, Login, UpdateUserProfile, updateUserRole } from "@/app/resolver/user";
import { getUserFromCookies } from "@/app/services/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProduct(id: String!): Product
  }

  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }

  type Mutation {
    createSale(id: String!, quantity: Int!): Boolean
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUser(
      userId: String!
      name: String
      email: String
      username: String
      avatar: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product
  }

  type User {
    id: String
    name: String
    email: String
    username: String
    avatar: String
    role: String
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }
`;


const resolvers = {
  Query: {
   loginUser:Login,
   currentUser:getUserFromCookies,
   getAllUsers,
   getAllProducts,
   getProduct,
  },
  Mutation:{
    createUser,
    updateUserRole,
   updateUser:UpdateUserProfile,
   addProduct,
   createSale
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };
