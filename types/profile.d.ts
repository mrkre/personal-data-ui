export interface AddressType {
  street?: string;
  unit?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface ProfileType {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  address?: AddressType;
  phone?: string;
  encrypted: boolean;
}
