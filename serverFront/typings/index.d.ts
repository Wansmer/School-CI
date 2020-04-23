declare interface Config {
  id:	string;
  repoName:	string;
  buildCommand:	string;
  mainBranch:	string;
  period:	number;
}

declare interface RequestHeaders {
  accept: string,
  Authorization: unknown
}
