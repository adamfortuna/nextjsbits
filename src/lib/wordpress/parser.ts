import { ArticleType, AuthorType, CommentType, PostType, TagType, WebmentionType, WordPressCommentType, WordpressPostType } from "@/types"

export const sortByDateDesc = (a1: ArticleType, a2: ArticleType) => {
  const a1d = new Date(a1.date).getTime()
  const a2d = new Date(a2.date).getTime()
  if (a1d === a2d) {
    return 0
  }
  return a1d < a2d ? 1 : -1
}

export const sortByLevelNumberDesc = (a1: PostType, a2: PostType) => {
  if (a1.levelInformation.levelNumber === a2.levelInformation.levelNumber) {
    return 0
  }
  return a1.levelInformation.levelNumber < a2.levelInformation.levelNumber ? 1 : -1
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

export const parsePost = (post: WordpressPostType): PostType => {
  const tags = post.tags?.nodes ? parseTags(post.tags.nodes) : undefined
  const comments =
    post.comments && post.comments.nodes && post.comments.nodes.length > 0 ? parseComments(post.comments.nodes) : null

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: new Date(post.date),
    modifedDate: new Date(post.modified),
    featuredImage: post.featuredImage?.node ? post.featuredImage?.node : null,
    content: post.content || null,
    excerpt: post.excerpt?.length > 0 ? post.excerpt : null,
    tags,
    url: `/${post.slug}`,
    commentCount: comments ? comments.length : post.commentCount || null,
    comments,
    allowComments: post.commentStatus === 'open',
    allowPings: post.pingStatus === 'open',
    levelInformation: post.levelInformation
  } as PostType
}