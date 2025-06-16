import { UserDto } from './user';
import { AmenityDto } from './amenity';

export type AppointmentDto = {
  id?: number;
  client?: UserDto;
  employee?: UserDto;
  service?: AmenityDto;
  clientId: number;
  employeeId: number;
  serviceId: number;
  appointmentDateTime?: Date;
  notes?: string;
};
