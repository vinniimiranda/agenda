
export type RootState = {
  auth: {
    token: string;
    signed: boolean;
    loading: boolean;
  }
  user: {
    profile: {
      id?: string;
      email: string;
    }
  }

}
