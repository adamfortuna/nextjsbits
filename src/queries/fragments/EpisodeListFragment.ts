const fragment = `
fragment EpisodeListFragment on Episode {
  id: databaseId
  title
  content
  excerpt(format: RAW)
  date
  slug
  commentStatus
  contentTypeName
  featuredImage {
    node {
      sourceUrl
      mediaDetails {
        width
        height
      }
    }
  }
  tags {
    nodes {
      name
      slug
    }
  }

  commentCount
}
`

export default fragment
