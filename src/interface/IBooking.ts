import { IProperty } from "./IProperty";

export interface IBooking {
    _id: string;
    startDate: Date;
    endDate: Date;
    property:IProperty,
    bookingStatus:string,
    paymentStatus:string,
    createdAt: Date
  }

  export interface BookingResponse {
    upcomingBookings?: IBooking[];
    completedBookings? : IBooking[];
  }