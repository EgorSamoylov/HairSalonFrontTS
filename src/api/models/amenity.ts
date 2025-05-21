import { UserDto } from './user';

export type AmenityDto = {
  id?: number;
  serviceName?: string;
  description?: string;
  author?: UserDto;
  price?: number;
  durationMinutes?: number;
};
