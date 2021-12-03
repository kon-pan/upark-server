/**
 *
 */
export interface IDriver {
  firstName?: string | null;
  lastName?: string | null;
  displayName: string;
  email: string;
  password?: string | null;
  phoneNumber?: string | null;
  balance: number;
  registeredOn: string;
  registeredWith: string;
  googleId?: string | null;
}

export interface IPostgresDriver {
  first_name?: string | null;
  last_name?: string | null;
  display_name: string;
  email: string;
  password?: string | null;
  phone_number?: string | null;
  balance: number;
  registered_on: string;
  registered_with: string;
  google_id?: string | null;
}
