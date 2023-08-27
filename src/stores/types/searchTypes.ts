export interface RepositoriesSearch {
  id: string;
  name: string;
  description: string;
  openGraphImageUrl: string;
  url: string;
  createdAt: string;
  pushedAt: string;
  stargazerCount: number;
  owner: {
    id: string;
    login: string;
    url: string;
    avatarUrl: string;
  };
  primaryLanguage: {
    color: string;
    name: string;
  }
}

export interface SearchRepo {
  repositoryCount: number;
  nodes: Array<RepositoriesSearch>;
}

export interface SearchState {
  searchRepo: SearchRepo | null;
  searchValue: string;
  restart: boolean;
  numCalls: number;
  pageNumberSearch: number;
}