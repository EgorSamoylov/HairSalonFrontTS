import { Roles } from './roles';

export type UserDto = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: Roles;
  logoAttachmentUrl?: string;
};
