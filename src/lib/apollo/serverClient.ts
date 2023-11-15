/* eslint-disable import/no-unresolved */
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { makeClient } from "./client"

// Manages server client state
export const { getClient } = registerApolloClient(makeClient)
