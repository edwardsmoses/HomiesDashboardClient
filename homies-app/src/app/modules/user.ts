export interface IUser {
  UserName: string;
  DisplayName: string;
  Token: string;
  Image?: string;
}

export interface IUserFormValues {
  Email: string;
  DisplayName?: string;
  Username?: string;
  Password: string;
}
