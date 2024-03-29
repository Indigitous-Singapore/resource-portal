/**
 * Generic interfaces
 */
export interface InterfaceImageSize {
  'ext': string;
  'url': string;
  'hash': string;
  'mime': string
  'name': string;
  'path': string|null;
  'size': number
  'width': number
  'height': number
}
export interface InterfaceImageSizes {
  [key: string]: InterfaceImageSize;
}
export interface InterfaceImage {
  id?: number;
  name?: string;
  alternativeText?: string|null;
  caption?: string|null;
  width?: number;
  height?: number;
  formats?: InterfaceImageSizes,
  'hash'?: string;
  'ext'?: string;
  'mime'?: string;
  'size'?: number;
  'url': string;
  'previewUrl'?: string|null;
  'provider'?: string;
  'provider_metadata'?: null;
  'created_at'?: string;
  'updated_at'?: string;
}

/**
 * Authentication
 */
export interface InterfaceStateAuthenticationLogin {
  email: string|null;
  password: string|null;
  onboarding: boolean;
}

export interface InterfaceLoginResponse {
  jwt: string|null;
  user: InterfaceUser;
}

export interface InterfaceAuthenticationErrors {
  email: string|null;
  password: string|null;
  passwordConfirmation: string|null;
  code: string|null;
  others: string|null;
}
export interface InterfaceSignupErrors {
  firstName: string|null;
  lastName: string|null;
  email: string|null;
  interests: string|null;
  password: string|null;
  passwordconfirm: string|null;
  others: string|null;
}

export interface InterfaceLoginError {
  statusCode: number;
  error: string;
  data: InterfaceLoginErrorData[]
}
export interface InterfaceLoginErrorData {
  messages: InterfaceLoginErrorDataMessage[]
}
export interface InterfaceLoginErrorDataMessage {
  message: string;
  id: string;
}

export interface InterfaceStateSignup {
  firstName: string|null;
  lastName: string|null;
  email: string|null;
  interests: number[]|null;
  password: string|null;
  passwordconfirm: string|null;
}

/**
 * Category
 */
export interface InterfaceCategory {
  id: number;
  title: string|null;
  description: string|null;
  items: InterfaceItem[];
  created_at: string;
  updated_at: string;
  featured_image: InterfaceImage;
}

/**
 * Tag
 */
export interface InterfaceTag {
  id: number;
  title: string|null;
  description: string|null;
  items: InterfaceItem[];
  created_at: string;
  updated_at: string;
}

/**
 * Items
 */
export interface InterfaceStateItems {
  items: InterfaceItem[]
}

export interface InterfaceItem {
  id: number;
  title: string|null;
  description_short: string|null;
  description_long: string|null;
  media: InterfaceItemMedia[];
  featured_image: InterfaceImage;
  link: string[];

  categories: InterfaceCategory[];
  tags: InterfaceTag[];

  //  Meta
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface InterfaceItemMedia {
  id: number;
  name: string|null;
  alternativeText: string|null;
  caption: string|null;
  width: string|null;
  height: string|null;
  format: string|null;
  hash: string|null;
  ext: string|null;
  mime: string|null;
  size: number|null;
  url: string|null;
  previewUrl: string|null;
  provider: string|null;
  provider_metadata: string|null;
  created_at: string;
  updated_at: string;
}
export interface InterfaceItemMediaObject {
  url: string;
}

/**
 * Collections
 */
export interface InterfaceCollection {
  id: number;
  user: number;
  title: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  items: InterfaceItem[]; 
  is_public: boolean;
  featured_image: InterfaceImage;
}

/**
 * Collection Categories
 */
 export interface InterfaceCollectionCategory {
  id: number;
  name: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  collections: InterfaceCollection[];
}

/**
 * SeriesItems
 */
export interface InterfaceSeriesItem {
  id: number;
  title: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  items: InterfaceItem[]; 
}

/**
 * User
 */
export interface InterfaceInterest {
  id: number;
}
export interface InterfaceUser {
  id: number|null;
  username: string|null;
  jwt?: string|null;
  firstName: string|null;
  lastName: string|null;
  email: string|null;
  displayPictureUrl?: InterfaceImage|string|null;
  interests: InterfaceInterest[]|null;
  provider?: string;
  confirmed?: boolean|null;
  blocked?: boolean|null;
  role?: number|null;
  created_at: string|null;
  updated_at: string|null;
  createdAtFormatted: string|null;
}

export interface InterfacePage {
  slug: string;
  title: string;
  content: string;
  banner: InterfaceItemMedia|null;
  banner_caption: string|null;
  banner_header: string|null;
}