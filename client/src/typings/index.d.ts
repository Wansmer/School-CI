declare interface Classes {
  mods?: any;
  elems?: any;
}

declare module 'ansi-to-html';

declare interface Dispatch {
  type: string;
  [key: string]: any;
}

declare interface State {
  [key: string]: any;
}

declare interface ConfigurationModel {
  id?:	string;
  repoName:	string;
  buildCommand:	string;
  mainBranch:	string;
  period:	number;
}

declare interface BuildModel {
  id: string;
  configurationId: string;
  buildNumber: string;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: string;
  start?: string;
  duration?: number;
}

