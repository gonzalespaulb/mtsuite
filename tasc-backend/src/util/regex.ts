import { TLocation, TPosition } from '@src/types/misc';

const availability = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const imageFileTypes = /jpeg|jpg|png|webp/;

const location: TLocation[] = ['BOT', 'MID', 'TOP'];

const mailingAddress = /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/;

const phoneNumber = /^\d{10}$/;

const position: TPosition[] = [
  'Administrator',
  'Attendant',
  'Foreman',
  'Manager',
  'Operator',
  'Relief',
  'Supervisor',
  'Superuser',
];

const uniqueCode = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[\]:;.,<>/?]{10}$/;

export { availability, imageFileTypes, location, mailingAddress, phoneNumber, position, uniqueCode };
