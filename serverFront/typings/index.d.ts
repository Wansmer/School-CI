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

declare interface BuildInfo {
  commitMessage: string,
  commitHash: string,
  branchName: string,
  authorName: string,
  code?: number
}

declare interface StartBuildInput {
  buildId:	string;
  dateTime:	string;
}

declare interface FinishBuildInput{
  buildId:	string
  duration:	number
  success:	boolean 
  buildLog:	string
}

declare interface RequestHeaders {
  accept: string,
  Authorization: unknown
}

declare interface CancelBuildInput{
  buildId:	string;
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
