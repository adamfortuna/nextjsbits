import { ArticleType, AuthorType, CommentType, EpisodeType, TagType, WebmentionType, WordPressCommentType, WordpressEpisodeType } from "@/types"

export const sortByDateDesc = (a1: ArticleType, a2: ArticleType) => {
  const a1d = new Date(a1.date).getTime()
  const a2d = new Date(a2.date).getTime()
  if (a1d === a2d) {
    return 0
  }
  return a1d < a2d ? 1 : -1
}

export const sortByEpisodesNumberDesc = (a1: EpisodeType, a2: EpisodeType) => {
  if (a1.episodeNumber === a2.episodeNumber) {
    return 0
  }
  return a1.episodeNumber < a2.episodeNumber ? 1 : -1
}

export const parseTags = (tags: TagType[]) => {
  return tags.map((t) => {
    return {
      name: t.name,
      slug: t.slug,
      description: t.description,
      count: t.count,
    } as TagType
  })
}

const parseCommentAuthor = (wpComment: WordPressCommentType) => {
  const authorNode = wpComment.author.node
  let url
  if (wpComment.type === 'mention') {
    const { webmention } = wpComment
    url = webmention.author_avatar
  } else if (wpComment.type === 'comment') {
    url = authorNode?.avatar?.url
  }
  const author = {
    url: authorNode.url,
    name: authorNode.name,
    avatar: { url },
  } as AuthorType

  return author
}

const parseWebmention = (wpComment: WordPressCommentType) => {
  if (!wpComment.webmention) {
    return null
  }
  return {
    source_url: wpComment.webmention.webmention_source_url,
    target_url: wpComment.webmention.webmention_target_url,
  } as WebmentionType
}

const parseReplies = (parentCommentDatadatabseId: number, comments: WordPressCommentType[]) => {
  const replies = comments.filter((c) => c.parentDatabaseId === parentCommentDatadatabseId)
  return replies
    .map((comment) => parseComment(comment, comments))
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
}


const parseComment = (wpComment: WordPressCommentType, comments: WordPressCommentType[]) => {
  const hasChildren = comments.filter((c) => c.parentDatabaseId === wpComment.databaseId).length > 0

  const webmention = parseWebmention(wpComment)
  const comment = {
    id: wpComment.databaseId,
    author: parseCommentAuthor(wpComment),
    content: wpComment.content,
    date: wpComment.date,
    type: wpComment.type,
    root: wpComment.parentDatabaseId === 0,
    parentDatabaseId: wpComment.parentDatabaseId,
    replies: hasChildren ? parseReplies(wpComment.databaseId, comments) : [],
    webmention,
  } as CommentType
  return comment
}

const parseComments = (comments: WordPressCommentType[]) => {
  return comments
    .filter((c) => c.status === 'APPROVE')
    .map((comment) => parseComment(comment, comments))
    .filter((c) => c.root)
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
}

export const parseEpisode = (episode: WordpressEpisodeType): EpisodeType => {
  const tags = episode.tags?.nodes ? parseTags(episode.tags.nodes) : undefined
  const comments =
    episode.comments && episode.comments.nodes && episode.comments.nodes.length > 0 ? parseComments(episode.comments.nodes) : null

  return {
    id: episode.id,
    title: episode.title,
    slug: episode.slug,
    date: episode.date,
    featuredImage: episode.featuredImage?.node ? episode.featuredImage?.node : null,
    content: episode.content || null,
    excerpt: episode.excerpt?.length > 0 ? episode.excerpt : null,
    tags,
    url: `${String(process.env.HOST)}/episode/1`,
    commentCount: comments ? comments.length : episode.commentCount || null,
    comments,
    allowComments: episode.commentStatus === 'open',
    allowPings: episode.pingStatus === 'open',
  } as EpisodeType
}