import { ArticleType, AuthorType, CommentType, PostType, TagType, ToolType, WebmentionType, WordPressCommentType, WordpressContentType, WordpressPostType, WordpressToolType } from "@/types"

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

export const sortByTitleAsc = (a1: ArticleType, a2: ArticleType) => {
  return a1.title.toLocaleLowerCase() < a2.title.toLocaleLowerCase() ? -1 : 1
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

export const parseContent = (content: WordpressContentType): ArticleType => {
  const comments =
  content.comments && content.comments.nodes && content.comments.nodes.length > 0 ? parseComments(content.comments.nodes) : null
  return {
    id: content.id,
    title: content.title,
    slug: content.slug,
    date: new Date(content.date),
    modifedDate: new Date(content.modified),
    featuredImage: content.featuredImage?.node ? content.featuredImage?.node : null,
    content: content.content || null,
    commentCount: comments ? comments.length : content.commentCount || null,
    comments,
    allowComments: content.commentStatus === 'open',
    allowPings: content.pingStatus === 'open',
  } as PostType
}

export const parsePost = (post: WordpressPostType): PostType => {
  const content = parseContent(post)
  const tags = post.tags?.nodes ? parseTags(post.tags.nodes) : undefined

  return {
    ...content,
    excerpt: post.excerpt?.length > 0 ? post.excerpt : null,
    tags,
    url: `/${post.slug}`,
    levelInformation: post.levelInformation
  } as PostType
}

export const parseTool = (tool: WordpressToolType): ToolType => {
  const content = parseContent(tool)
  const tags = tool.tags?.nodes ? parseTags(tool.tags.nodes) : undefined
  const levels = tool.toolInformation.levels ? tool.toolInformation.levels.map((t) => parsePost(t) ) : []

  return {
    ...content,
    excerpt: tool.excerpt?.length > 0 ? tool.excerpt : null,
    tags,
    url: `/tools/${tool.slug}`,
    toolInformation: tool.toolInformation,
    levelsCount: tool.toolInformation.levels ? tool.toolInformation.levels.length : null,
    levels
  } as ToolType
}