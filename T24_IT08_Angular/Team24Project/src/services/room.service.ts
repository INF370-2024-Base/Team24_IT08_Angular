import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* export interface Room {
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  room_ID: number;
  roomTypeName:string;
  roomStatus: number;
  roomNumber: string;
  maxCapacity: number;
  availability: boolean;
  price: number;
  imageUrl: string;
  amenities: string;
  isAvailable:boolean;
  totalPrice:number;
  roomType: string;
  //capacity: number;
  //roomType?: RoomTypes;
} */
  export interface Room {
    name: string;
    description: string;
    dateCreated: Date;
    dateModified: Date;
    isActive: boolean;
    isDeleted: boolean;
    room_ID: number;
    roomTypeName: string;
    roomNumber: string;
    maxCapacity: number;
    price: number;
    imageUrl: string;
    amenities: string;
    roomStatus: number;
    isAvailable: boolean;
    totalPrice: number;
  }
  
  export interface RoomTypes {
    room_Type_ID: number;
    name: string;
    description: string;
    isCatered: boolean;
    standardRate: number;
  }

// in room.service
export interface RoomItem {
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  isActive: boolean;
  isDeleted: boolean;
  room_Items_ID: number;
  price: number;
}
//Includes Room type and Room
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://localhost:7102/api'; // Replace with your actual API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  //Rooms
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/Room/GetRooms`);
  }

  getRoomById(room_ID: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/Room/GetRoomById/${room_ID}`);
  }

  /*   getRoomById(room_ID: number, checkIn: string, checkOut: string, includeBreakfast: boolean, promoCode: string): Observable<Room> {
      const params = {
        checkIn: checkIn,
        checkOut: checkOut,
        includeBreakfast: includeBreakfast.toString(),
        promoCode: promoCode
      };
  
      return this.http.get<Room>(`${this.apiUrl}/Room/GetRoomById/${room_ID}`, { params });
    } */
  
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(
      `${this.apiUrl}/Room/AddRoom`,
      room,
      this.httpOptions
    );
  }

  updateRoom(room: Room): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Room/UpdateRoom/${room.room_ID}`,
      room,
      this.httpOptions
    );
  }

  deleteRoom(room_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Room/DeleteRoom?id=${room_ID}`
    );
  }

  updateAvailability(id: number, availability: boolean): Observable<any> {
    const payload = { availability }; // Payload as an object with "availability" key
    console.log(`PUT to ${this.apiUrl}/Room/${id}/availability`, payload); // Log the endpoint and payload
    return this.http.put(
      `${this.apiUrl}/Room/${id}/availability`,
      payload,
      this.httpOptions
    );
  }

  //check availability
  checkAvailability(checkIn: string, checkOut: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
  }

   // Get all room types
   getRoomTypes(): Observable<RoomTypes[]> {
    return this.http.get<RoomTypes[]>(`${this.apiUrl}/Room/GetAllRoomTypes`); // Adjust the API endpoint as needed
  }

  // Get a room type by ID
  getRoomTypeById(room_Type_ID: number): Observable<RoomTypes> {
    return this.http.get<RoomTypes>(`${this.apiUrl}/Room/GetRoomTypeById/${room_Type_ID}`);
  }

  // Add a new room type
  createRoomType(roomType: RoomTypes): Observable<RoomTypes> {
    return this.http.post<RoomTypes>(`${this.apiUrl}/Room/AddRoomType`, roomType, this.httpOptions);
  }

  // Update an existing room type
  updateRoomType(roomType: RoomTypes): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Room/UpdateRoomType/${roomType.room_Type_ID}`, roomType, this.httpOptions);
  }

  // Delete a room type by ID
  deleteRoomType(room_Type_ID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Room/DeleteRoomType?id=${room_Type_ID}`);
  }
  //Room ITEMS

  getRoomItems(): Observable<RoomItem[]> {
    return this.http.get<RoomItem[]>(`${this.apiUrl}/Booking/GetAllRoomItems`);
  }
  getRoomItemsById(room_Items_ID: number): Observable<RoomItem> {
    return this.http.get<RoomItem>(
      `${this.apiUrl}/Booking/GetRoomItemById/${room_Items_ID}`
    );
  }

  createRoomItem(roomItem: RoomItem): Observable<RoomItem> {
    return this.http.post<RoomItem>(
      `${this.apiUrl}/Booking/AddEventItem`,
      roomItem,
      this.httpOptions
    );
  }

  updateRoomItem(roomItem: RoomItem): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Booking/UpdateRoomItem/${roomItem.room_Items_ID}`,
      roomItem,
      this.httpOptions
    );
  }

  deleteRoomItem(room_Items_ID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Booking/DeleteRoomItem?id=${room_Items_ID}`
    );
  }

   // Search available rooms based on check-in and check-out dates
   searchRooms(searchModel: { checkIn: Date; checkOut: Date }): Observable<Room[]> {
    return this.http.post<Room[]>(`${this.apiUrl}/Room/GetRoomAvailability`, searchModel);
  }
}
