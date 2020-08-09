
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
      customers: [
        { id: string; name: string; }
      ];
      reset: boolean;
      role: string;
    }
    customer?: string;
  }

}
