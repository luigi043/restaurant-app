// Modelo para reservas
export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
}
