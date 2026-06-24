import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_PAYLOAD_URL + '/api/graphql'
)

export default client
