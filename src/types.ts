// Media
interface WordpressMediaType {
  width: number
  height: number
}
interface WordpressImageType {
  sourceUrl: string
  mediaDetails?: WordpressMediaType
}
interface WordpressImageNodeType {
  node: WordpressImageType
}



// Taxonomy
export interface TagType {
  name: string
  slug: string
  description?: string
  count?: number
  __typename?: string
}



// Authors - Local
interface AvatarType {
  url?: string
  width?: number
  height?: number
}

// Authors - Wordpress
interface WordpressAuthorType {
  url?: string
  name: string
  avatar: AvatarType
}
export interface AuthorType extends WordpressAuthorType {}



// Comments - Wordpress
export type CommentTypeType = 'mention' | 'comment' | 'like' | 'repost'
export interface WebmentionType {
  source_url: string
  target_url: string
}
export interface WordPressCommentType {
  author: {
    node: WordpressAuthorType
  }
  content: string
  databaseId: number
  replies?: {
    nodes: WordPressCommentType[]
  }
  date: string
  status: 'APPROVE' | 'PENDING'
  type?: CommentTypeType
  parentDatabaseId: number
  webmention: {
    author_avatar?: string
    author_url?: string
    webmention_source_url?: string
    webmention_target_url?: string
  }
}

// Comments - Local
export interface CommentType {
  author: AuthorType
  content: string
  id: number
  date: string
  type: CommentTypeType
  webmention: WebmentionType
  root: boolean
  parentDatabaseId: number
  replies: CommentType[]
}



// Post - Wordpress
export type WordpressPostTypeType = 'episode' | 'post' | 'page'
export interface WordpressContentType {
  id: number
  slug: string
  title: string
  date: string
  featuredImage?: WordpressImageNodeType
  content: string
  project?: string
  guid: string
  comments?: {
    nodes: WordPressCommentType[]
  }
  commentStatus: 'open' | 'closed'
  pingStatus: 'open' | 'closed'
  commentCount?: number
  contentTypeName: WordpressPostTypeType
}
export interface WordpressPostType extends WordpressContentType {
  tags?: {
    nodes: TagType[]
  }
  excerpt: string
}
export interface WordpressEpisodeType extends WordpressContentType {
  tags?: {
    nodes: TagType[]
  }
  excerpt: string
}


// Post - Local
export interface ArticleType {
  id: number
  slug: string
  title: string
  date: string
  url: string
  featuredImage?: WordpressImageType
  allowComments?: boolean
  allowPings?: boolean
  commentCount: number

  content?: string
  excerpt?: string
  tags?: TagType[]
  comments?: CommentType[]
}
export interface EpisodeType extends ArticleType {
  episodeNumber: number
}