export interface RepositoriesNodes {
  id: string;
  name: string;
  description: string;
  openGraphImageUrl: string;
  url: string;
  createdAt: string;
  pushedAt: string;
  stargazerCount: number;
  primaryLanguage: {
    color: string;
    name: string;
  };
  owner: {
    id: string;
    login: string;
    url: string;
    avatarUrl: string;
  };
}

export interface Repositories {
  totalCount: number;
  totalDiskUsage: number;
  nodes: Array<RepositoriesNodes>;
}

export interface SearchRepo {
  repositoryCount: number;
  nodes: Array<RepositoriesNodes>;
}

export interface RepositoriesState {
  repositories: Repositories | null;
  searchRepo: SearchRepo | null;
  searchValue: string;
  pageNumberRepositories: number;
}