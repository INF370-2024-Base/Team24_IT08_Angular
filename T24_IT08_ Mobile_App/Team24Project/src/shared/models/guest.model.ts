export interface Guest {
  phoneNo: any;
  surname: any;
  userId: any;
  dob: any;
  guest_Email: any;
  guest_Surname: string;
  guest_PhoneNo: any;
  guestId?(guestId?: any, arg1?: { id: number; phonenumber: string; name: string; email: string; password: string; country: string; }): unknown;
  id: number;
  phonenumber?: string;
  name?: string;
  email?: string;
  password?: string;
  country?: string;
}

