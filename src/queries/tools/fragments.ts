export const ToolListFragment = `
fragment ToolListFragment on Tool {
  id: databaseId
  title
  slug
  toolInformation {
    homepage
    language
    npmUrl
    repository
    levels {
      ... on Post {
        id
      }
    }
  }
}
`


export const ToolFragment = `
fragment ToolFragment on Tool {
  id: databaseId
  title
  slug
  toolInformation {
    homepage
    language
    npmUrl
    repository
    levels {
      ... on Post {
        ...PostListFragment
      }
    }
  }
}
`