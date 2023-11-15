import { gql } from "graphql-tag";
import EpisodeFragment from "./EpisodeFragment"
import EpisodeListFragment from "./EpisodeListFragment"

export default gql`
${EpisodeFragment}
${EpisodeListFragment}
`;
