import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import DummyJsonAPI from './dummyJsonAPI';

const resolvers = {
  Query: {
    users: async(parent: any, { limit, offset }: any, { dataSources }: any) => {
      return await dataSources.dummyJsonAPI.getUsers(limit, offset);
    },
    user: async(parent: any, { id }: any, { dataSources }: any) => {
      return await dataSources.dummyJsonAPI.getUser(id);
    },
    posts: async(parent: any, { limit, offset }: any, { dataSources }: any) => {
      return await dataSources.dummyJsonAPI.getPosts(limit, offset);
    },
    post: async(parent: any, { id }: any, { dataSources }: any) => {
      return await dataSources.dummyJsonAPI.getPost(id);
    }
  },
  Post: {
    user: async(parent: any, args: any, { dataSources }: any) => {
      console.log('parent',parent)
      return await dataSources.dummyJsonAPI.getUser(parent.userId);
    }
  }
};

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    image: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    tags: [String]
  }

  type Query {
    users(limit: Int, offset: Int): [User]
    user(id: ID!): User
    posts(limit: Int, offset: Int): [Post]
    post(id: ID!): Post
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({
    dataSources: {
      dummyJsonAPI: new DummyJsonAPI()
    }
  })
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
