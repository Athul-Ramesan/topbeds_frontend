import { IProperty } from "./IProperty";
import { IUserSignupData } from "./IUserSignup";

export interface IBooking {
    _id: string;
    startDate: Date;
    endDate: Date;
    property:IProperty,
    bookingStatus:string,
    paymentStatus:string,
    createdAt: Date,
    user:IUserSignupData
  }

  export interface BookingResponse {
    upcomingBookings?: IBooking[];
    completedBookings? : IBooking[];
  }