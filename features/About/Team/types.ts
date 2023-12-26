export interface ITeamPerson {
  name: string;
  role: string;
  photo: string;
  link?: string;
}

export type ITeam = ITeamPerson[];
