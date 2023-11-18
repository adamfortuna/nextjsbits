export const PostFragment = `
fragment PostFragment on Post {
  id: databaseId
  title
  excerpt(format: RAW)
  content
  date
  modified
  slug
  commentStatus
  contentTypeName
  commentCount

  tags {
    nodes {
      name
      slug
    }
  }

  levelInformation {
    levelNumber
    demos {
      title
      url
    }
    tools {
      version
      tool {
        ... on Tool {
          title(format: RAW)
          slug
        }
      }
      notes
    }
    youtubeVideo {
      seconds
    }
    links {
      title
      url
    }
    repositories {
      title
      url
    }
    tableOfContents {
      anchor
      title
    }
  }
}
`

export const PostListFragment = `
fragment PostListFragment on Post {
  id: databaseId
  title
  excerpt(format: RAW)
  date
  modified
  slug
  commentStatus
  contentTypeName
  commentCount

  tags {
    nodes {
      name
      slug
    }
  }

  levelInformation {
    levelNumber
    tools {
      version
      tool {
        ... on Tool {
          title(format: RAW)
          slug
        }
      }
      notes
    }
    youtubeVideo {
      seconds
    }
  }
}
`