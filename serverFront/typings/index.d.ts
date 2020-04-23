declare interface Config {
  id?:	string;
  repoName:	string;
  buildCommand:	string;
  mainBranch:	string;
  period:	number;
}

declare interface RequestHeaders {
  accept: string,
  Authorization: unknown
}

declare interface CodeSuccess {
  code: number
}

declare interface CommitInfo {
  authorName: string;
  commitMessage: string;
  commitHash: string;
  branchName: string;
}
