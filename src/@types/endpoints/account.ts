export interface Gravatar {
  hash: string;
}

export interface Avatar {
  gravatar: Gravatar;
}

export interface AccountDetails {
  avatar: Avatar;
  id: number;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  username: string;
}
