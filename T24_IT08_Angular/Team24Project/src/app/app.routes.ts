import { Routes } from '@angular/router';

//Dashboard Imports
import { LoginComponent } from '../features/authentication/components/login/login.component';
import { RegisterComponent } from '../features/authentication/components/register/register.component';
import { ForgotPasswordComponent } from '../features/authentication/components/forgot-password/forgot-password.component';

//Import Guards
import { AuthGuard } from '../core/guards/auth.guard';

//Register Import
import { GuestRegisterComponent } from '../features/authentication/components/guest-register/guest-register.component';
import { StaffRegisterComponent } from '../features/authentication/components/staff-register/staff-register.component';
import { AdminRegisterComponent } from '../features/authentication/components/admin-register/admin-register.component';

//Dashboard Imports
import { AdminDashboardComponent } from '../features/admin/components/admin-dashboard/admin-dashboard.component';
import { StaffDashboardComponent } from '../features/staff/components/staff-dashboard/staff-dashboard.component';
import { GuestDashboardComponent } from '../features/guest/components/guest-dashboard/guest-dashboard.component';

//Inspection
import { SearchInspectionComponent } from '../features/inspection/search-inspection/search-inspection.component';
import { UpdateInspectionComponent } from '../features/inspection/update-inspection/update-inspection.component';
import { CreateInspectionComponent } from '../features/inspection/create-inspection/create-inspection.component';
//Policies
import { SearchPoliciesAndRegulationsComponent } from '../features/admin/components/admin-dashboard/policies-and-regulations/search-policies-and-regulations/search-policies-and-regulations.component';
import { CreatePAndRComponent } from '../features/admin/components/admin-dashboard/policies-and-regulations/create-p-and-r/create-p-and-r.component';

import { UpdatePAndRComponent } from '../features/admin/components/admin-dashboard/policies-and-regulations/update-p-and-r/update-p-and-r.component';

//Shift-types
import { ViewShiftTypeComponent } from '../features/admin/components/ShiftTypes/view-shift-type/view-shift-type.component';
import { EditShiftTypeComponent } from '../features/admin/components/ShiftTypes/edit-shift-type/edit-shift-type.component';
import { AddShiftTypeComponent } from '../features/admin/components/ShiftTypes/add-shift-type/add-shift-type.component';

//admin/FAQ components
import { AddFaqComponent } from '../features/admin/components/FAQ/add-faq/add-faq.component';
import { EditFaqComponent } from '../features/admin/components/FAQ/edit-faq/edit-faq.component';
import { FaqListComponent } from '../features/admin/components/FAQ/faq-list/faq-list.component';

//FAQ
import { FaqComponent } from '../features/guest/components/faq/faq/faq.component';

//contact
import { ContactComponent } from '../features/guest/components/Contact/contact/contact.component';

//booking
import { GuestBookingListComponent } from '../features/guest/components/Bookings/guest-booking-list/guest-booking-list.component';

//payment
import { StaffShiftComponent } from '../features/admin/components/Staff shifts/staff-shift/staff-shift.component';
import { PaymentComponent } from '../features/guest/components/Payment/payment/payment/payment.component';

//Staff

import { ViewStaffProfilesComponent } from '../features/admin/components/staff/view-staff-profile/view-staff-profiles/view-staff-profiles.component';
import { CreateStaffProfileComponent } from '../features/staff/components/Create staff profile/create-staff-profile/create-staff-profile.component';
import { UpdateStaffProfileComponent } from '../features/staff/components/Update staff profile/update-staff-profile/update-staff-profile.component';
import { ViewMyShiftComponent } from '../features/staff/components/View-my-shift/view-my-shift/view-my-shift.component';
import { ClockInClockOutComponent } from '../features/staff/components/Clock out or clock in file/clock-in-clock-out/clock-in-clock-out.component';
import { UpdateShiftAssignmentComponent } from '../features/admin/components/staff/update-shift-assignment/update-shift-assignment/update-shift-assignment.component';
import { AuditLogComponent } from '../features/guest/components/AuditLog/audit-log/audit-log.component';
import { AdminTimerSettingsComponent } from '../features/admin/timer/admin-timer-settings/admin-timer-settings.component';

//EVENT BOOKINGS
import { CreateEventBookingComponent } from '../features/event/event-booking/create-event-booking/create-event-booking.component';
import { SearchEventBookingComponent } from '../features/event/event-booking/search-event-booking/search-event-booking.component';
import { UpdateEventBookingComponent } from '../features/event/event-booking/update-event-booking/update-event-booking.component';
//EVENTS
import { EventCartPageComponent } from '../features/event/event-cart-page/event-cart-page/event-cart-page.component';
// import { PaymentForEventComponent } from '../features/event/paymentForEvent/payment-for-event/payment-for-event.component';
import { ConfirmComponent } from '../features/event/confirm/confirm/confirm.component';
import { CheckoutComponent } from '../features/event/client/checkout/checkout.component';
import { SearchEventDetailsComponent } from '../features/event/search-event-details/search-event-details/search-event-details.component';
import { UpdateEventDetailsComponent } from '../features/event/update-event-details/update-event-details/update-event-details.component';
import { BookEventComponent } from '../features/event/book-event/book-event/book-event.component';
import { SearchEventTypeComponent } from '../features/event/event type/searching/search-event-type/search-event-type.component';
import { CreateEventTypeComponent } from '../features/event/event type/creating/create-event-type/create-event-type.component';
import { UpdateEventTypeComponent } from '../features/event/event type/updating/update-event-type/update-event-type.component';
import { EventMenuComponent } from '../features/event/event-menu/event-menu/event-menu.component';
import { SearchEventItemsComponent } from '../features/event/event-items/search-event-items/search-event-items.component';
import { CreateEventItemComponent } from '../features/event/event-items/create-event-item/create-event-item.component';
import { UpdateEventItemComponent } from '../features/event/event-items/update-event-item/update-event-item.component';
import { SearchEventCategoriesComponent } from '../features/event/event-category/search-event-categories/search-event-categories.component';
import { CreateEventCategoryComponent } from '../features/event/event-category/create-event-category/create-event-category.component';
import { UpdateEventCategoryComponent } from '../features/event/event-category/update-event-category/update-event-category.component';
import { ViewEventMenusComponent } from '../features/event/event-menu/event-menu(CRUD)/view-event-menus/view-event-menus.component';
import { CreateEventMenuItemComponent } from '../features/event/event-menu/event-menu-items/create-event-menu-item/create-event-menu-item.component';
import { UpdateEventMenuItemComponent } from '../features/event/event-menu/event-menu-items/update-event-menu-item/update-event-menu-item.component';
import { ViewEventMenuItemsComponent } from '../features/event/event-menu/event-menu-items/view-event-menu-items/view-event-menu-items.component';
import { EventDiscountComponent } from '../features/event/event-discount/event-discount/event-discount.component';

//LOST AND FOUND
import { SearchLAndFItemComponent } from '../features/LostAndFound/search-l-and-f-item/search-l-and-f-item.component';
import { UpdateLAndFItemComponent } from '../features/LostAndFound/update-l-and-f-item/update-l-and-f-item.component';
import { CreateLAndFItemComponent } from '../features/staff/create-l-and-f/create-l-and-f-item/create-l-and-f-item.component';
import { LostAndFoundReportComponent } from '../shared/lost-and-found-report/lost-and-found-report/lost-and-found-report.component';

//GUEST
import { ViewGuestProfileComponent } from '../features/guest/components/View guest profile/view-guest-profile/view-guest-profile.component';
import { EditGuestProfileComponent } from '../features/guest/components/Edit guest profile/edit-guest-profile/edit-guest-profile.component';
import { CreateGuestProfileComponent } from '../features/guest/components/Create Guest profile/create-guest-profile/create-guest-profile.component';

import { CreateHallComponent } from '../features/hall/create-hall/create-hall/create-hall.component';
import { SearchHallComponent } from '../features/hall/search-hall/search-hall/search-hall.component';
import { UpdateHallComponent } from '../features/hall/update-hall/update-hall/update-hall.component';
import { HallListComponent } from '../features/hall/hall-list/hall-list/hall-list.component';

//BOOKING
//import { BookRoomComponent } from '../features/booking/book-room/book-room.component';
import { SearchBookingDetailsComponent } from '../features/booking/SEARCH/search-booking-details/search-booking-details/search-booking-details.component';
//import { UpdateBookingDetailsComponent } from '../features/booking/UPDATE/update-booking-details(1)/update-booking-details/update-booking-details.component';
//import { PaymentForBookingComponent } from '../features/booking/paymentForBooking/payment-for-booking/payment-for-booking.component';
import { BookingCartPageComponent } from '../features/booking/booking-cart-page/booking-cart-page/booking-cart-page.component';
//import { CreateRoomBookingComponent } from '../features/booking/CREATE/create-room-booking/create-room-booking.component';
//import { SearchRoomComponent } from '../features/booking/SEARCH/search-room/search-room.component';
//import { UpdateRoomBookingComponent } from '../features/booking/UPDATE/update-room-booking/update-room-booking.component';
//Room Types
//import { CreateRoomTypeComponent } from '../features/booking/CREATE/create-room-type/create-room-type.component';
//import { SearchRoomTypeComponent } from '../features/booking/SEARCH/search-room-type/search-room-type/search-room-type.component';
//port { UpdateRoomTypeComponent } from '../features/booking/UPDATE/update-room-type/update-room-type/update-room-type.component';
//ROOM
//import { CreateRoomComponent } from '../features/booking/CREATE/create-room/create-room/create-room.component';
//import { RoomListComponent } from '../features/booking/room-list/room-list/room-list.component';
//import { SearchRoomsComponent } from '../features/booking/SEARCH/search-rooms/search-rooms/search-rooms.component';
//import { UpdateRoomComponent } from '../features/booking/UPDATE/update-room/update-room/update-room.component';
import { SearchGuestProfileComponent } from '../features/admin/components/search-guest-profile/search-guest-profile.component';
//REPORTS
import { GenerateBookingsReportComponent } from '../features/REPORTS/generate-bookings-report/generate-bookings-report.component';
import { GenerateGuestReportComponent } from '../features/REPORTS/generate-guest-report/generate-guest-report.component';
import { InspectionReportComponent } from '../features/REPORTS/inspection-report/inspection-report.component';
import { EventReportComponent } from '../features/REPORTS/Event Report/event-report/event-report.component';
import { StaffShiftReportComponent } from '../features/REPORTS/Staff Shift Report/staff-shift-report/staff-shift-report.component';
//Landing Page
import { LandingPageComponent } from '../landing/landing-page/landing-page.component';
import { GalleryComponent } from '../landing/gallery/gallery.component';

//Room Management
import { RoomManagementComponent } from '../features/RoomManagement/room-management/room-management.component';
import { InquiriesComponent } from '../features/admin/components/inquiries/inquiries.component';
import { VideoComponent } from '../features/admin/components/video/video.component';

//StaffPerformanceReviews
import { StaffPerformanceReviewComponent } from '../features/admin/components/admin-dashboard/staff-performance-review/staff-performance-review.component';
//23 Aug Booking
import { RoomAvailabilityComponent } from '../BOOKAROOM/room-availability/room-availability.component';
import { QrCodeScannerComponent } from '../features/admin/components/qr-code-scanner/qr-code-scanner.component';
import { FeedbackFormComponent } from '../features/guest/components/feedback-form/feedback-form.component';
import { GuestQrCodeComponent } from '../features/guest/components/guest-qr-code/guest-qr-code.component';
import { BookARoomComponent } from '../BOOKAROOM/book-a-room/book-a-room.component';
import { BookingsummaryComponent } from '../BOOKAROOM/bookingsummary/bookingsummary.component';
import { PaymentForRoomComponent } from '../BOOKAROOM/payment-for-room/payment-for-room.component';

//REFUND
import { RefundComponent } from '../features/refund/refund/refund.component';
import { BookingRefundComponent } from '../BOOKAROOM/booking-refund/booking-refund.component';
//INSTAGRAM
// import { InstagramCallbackComponent } from './instagram-login/instagram-callback/instagram-callback.component';
// import { InstagramLoginComponent } from './instagram-login/instagram-login.component';
import { RoomTypeManagementComponent } from '../features/room-type-management/room-type-management.component';



export const routes: Routes = [

  //landing
  //Home Page
  {
    path: 'home',
    component: LandingPageComponent
  },

  //booking
  {path:'availability', component: RoomAvailabilityComponent},
  {path:'book-a-room/:roomId', component: BookARoomComponent},
  {path:'booking-summary', component: BookingsummaryComponent},

  //authentication
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'register-guest', component: GuestRegisterComponent},
  { path: 'register-staff', component: StaffRegisterComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'register-admin', component: AdminRegisterComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  {
    path: 'gallery',
    component:GalleryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Guest'] },
  },

  //Policies and Regulations
  {
    path: 'search-policies-and-regulations/:email',
    component: SearchPoliciesAndRegulationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff', 'Guest'] },
  },

  {
    path: 'create-p-and-r/:emailaddress',
    component: CreatePAndRComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'update-p-and-r/:id/:emailaddress',
    component: UpdatePAndRComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  //Shift-types
  {
    path: 'view-shift-type',
    component: ViewShiftTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  {
    path: 'add-shift-type',
    component: AddShiftTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  {
    path: 'edit-shift-type/:shift_Type_Id',
    component: EditShiftTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  //Admin/FAQ
  {
    path: 'faq-list',
    component: FaqListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  {
    path: 'add-faq',
    component: AddFaqComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  {
    path: 'edit-faq/:id',
    component: EditFaqComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  //guest routing
 
  {
    path: 'faq',
    component: FaqComponent,
  
  },

  {
    path: 'contact',
    component: ContactComponent,
  },

  {
    path: 'guest-booking-list/:emailaddress',
    component: GuestBookingListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Guest'] },
  },

  {
    path: 'payment/:emailaddress',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Guest'] },
  },

  {
    path: 'view-guest-profile/:Email',
    component: ViewGuestProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Guest'] },
  },

  {
    path: 'edit-guest-profile/:guestId',
    component: EditGuestProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Guest'] },
  },

  {
    path: 'create-guest-profile',
    component: CreateGuestProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Guest'] },
  },

  //Staff shifts

  {
    path: 'staff-shift',
    component: StaffShiftComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  //Audit Log

  {
    path: 'audit-log/:emailaddress',
    component: AuditLogComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },

  //Search Guest Profile
  { path: 'search-guest-profile', component: SearchGuestProfileComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  //dashboards

  {
    path: 'admin-dashboard/:emailaddress',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'staff-dashboard/:email',
    component: StaffDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] },
  },
  {
    path: 'guest-dashboard/:emailaddress',
    component: GuestDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest'] },
  },

  //Inspection
  { path: 'search-inspection', component: SearchInspectionComponent },
  { path: 'update-inspection/:id', component: UpdateInspectionComponent },
  { path: 'create-inspection', component: CreateInspectionComponent },

  {
    path: 'create-p-and-r/:email',
    component: CreatePAndRComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  //STAFF
  {
    path: 'view-staff-profile/:emailaddress',
    component: ViewStaffProfilesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'create-staff-profile/:email',
    component: CreateStaffProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] },
  },

  {
    path: 'update-staff-profile/:id/:email',
    component: UpdateStaffProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] },
  },

  {
    path: 'view-my-shift/:email',
    component: ViewMyShiftComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] },
  },

  {
    path: 'clock-in-clock-out/:staffShiftId/:emailaddress',
    component: ClockInClockOutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] },
  },

  {
    path: 'admin/timer-settings',
    component: AdminTimerSettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },

  {
    path: 'update-shift-assignment/:emailaddress',
    component: UpdateShiftAssignmentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },

  //EventBooking

  { path: 'search-event-booking', component: SearchEventBookingComponent },

  { path: 'update-event-booking/:id', component: UpdateEventBookingComponent },
  { path: 'create-event-booking', component: CreateEventBookingComponent },

  //EVENT
  {
    path: 'event-cart-page/emailaddress',
    component: EventCartPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest'] },
  },
  // {
  //   path: 'payment-for-event/:amount/:event_Id',
  //   component: PaymentForEventComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ['Guest'] },
  // },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'search-event-details',
    component: SearchEventDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest', 'Admin', 'Staff'] },
  },
  {
    path: 'update-event-details/:event_Id',
    component: UpdateEventDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'book-event',
    component: BookEventComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest', 'Admin','Staff'] },
  },
  {
    path: 'search-event-type',
    component: SearchEventTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest', 'Admin', 'Staff'] },
  },

  {
    path: 'create-event-type',
    component: CreateEventTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff', 'Admin'] },
  },
  {
    path: 'update-event-type/:eventTypeId',
    component: UpdateEventTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },

  { path: 'event-menu/:id', component: EventMenuComponent },
  {path:'search-event-items',
    component:SearchEventItemsComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin','Staff']},
  },
  {path:'create-event-item',
    component:CreateEventItemComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']},
  },

  {path:'update-event-item/:id', component:UpdateEventItemComponent, canActivate:[AuthGuard],data:{roles:['Admin']}},

  {path:'search-event-categories',
    component:SearchEventCategoriesComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin','Staff']},
  },
  {path:'create-event-category',
    component:CreateEventCategoryComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']},
  },
  {path:'view-event-menus',
    component :ViewEventMenusComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']},
  },

  {path:'update-event-category/:id', component:UpdateEventCategoryComponent, canActivate:[AuthGuard],data:{roles:['Admin']}},

  // Route for viewing all event menu items
  { path: 'view-event-menu-items', component: ViewEventMenuItemsComponent },

  // Route for creating a new event menu item
  { path: 'create-event-menu-item', component: CreateEventMenuItemComponent },

  // Route for updating an existing event menu item (with the eventMenuItemID as a route parameter)
  { path: 'update-event-menu-item/:id', component: UpdateEventMenuItemComponent },
  {path:'event-discount',
    component :EventDiscountComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']},
  },
  //LOST AND FOUND
  {
    path: 'search-l-and-f-item/:emailaddress',
    component: SearchLAndFItemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },

  {
    path: 'update-l-and-f-item/:lost_And_Found_ID/:emailaddress',
    component: UpdateLAndFItemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'create-l-and-f-item/:emailaddress',
    component: CreateLAndFItemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] },
  },

  { path: 'lost-and-found-report', component: LostAndFoundReportComponent },

  //HALL
  {
    path: 'search-hall',
    component: SearchHallComponent,
  },
  {
    path: 'create-hall',
    component: CreateHallComponent,
  },
  {
    path: 'update-hall/:id',
    component: UpdateHallComponent,
  },
  {
    path: 'hall-list',
    component: HallListComponent,
  },
  //Room Type
/*   {
    path: 'search-room-type',
    component: SearchRoomTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff', 'Admin', 'Guest'] },
  }, */


/*   {
    path: 'update-room-type/:room_Type_ID',
    component: UpdateRoomTypeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  }, */

  //ROOM

 // { path: 'create-room-booking', component: CreateRoomBookingComponent },

  //BOOKING
  {
    path: 'booking-cart-page/emailaddress',
    component: BookingCartPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest', 'Admin'] },
  },

  {path: 'booking-payment', component:PaymentForRoomComponent},
  {path:'booking-refund', component:BookingRefundComponent},
/*   {
    path: 'payment-for-booking/:amount/:roomBookingId/:roomItemsId',
    component: PaymentForBookingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest', 'Admin'] },
  }, */

  //Updated Book Room btn //??how is this the update screen

  // { path: 'confirm', component: ConfirmComponent },
  // { path: 'checkout', component: CheckoutComponent },

  {
    path: 'search-booking-details',
    component: SearchBookingDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Guest', 'Admin'] },
  },
/*   {
    path: 'update-booking-details/:bookingID/:room_Items_ID',
    component: UpdateBookingDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  }, */

  //REPORTS
  {
    path: 'generate-bookings-report/:emailaddress',
    component: GenerateBookingsReportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'generate-guest-report',
    component: GenerateGuestReportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'inspection-report',
    component: InspectionReportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'event-report',
    component: EventReportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'staff-shift-report',
    component: StaffShiftReportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'inquiries',
    component: InquiriesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff'] },
  },
  {
    path: 'qr-code-scanner', 
    component: QrCodeScannerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff','Guest'] },
  },
  {
    path: 'feedback-form', 
    component: FeedbackFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff', 'Guest'] },
  },
  {
    path: 'guest-qr-code', 
    component: GuestQrCodeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Staff', 'Guest'] },
  },


    //Room Management
    { path: 'room-management', component: RoomManagementComponent, 
      canActivate: [AuthGuard], data: { roles: ['Admin'] }},

    //RoomTypeManagement
    {path:'room-type-mgmt', component:RoomTypeManagementComponent,
      canActivate: [AuthGuard], data: { roles: ['Admin'] }},
    

      //Staff Performance Reviews
      {path:'staff-performance-review', component:StaffPerformanceReviewComponent,
        canActivate:[AuthGuard], data:{roles:['Admin']}
      },

      //REFUND
      {path:'refund', component:RefundComponent,
        canActivate:[AuthGuard],data:{roles:['Guest']}
      },
      // { path: 'auth/callback', component: InstagramCallbackComponent },
      // { path: 'instagram-login', component: InstagramLoginComponent },

  //Default route
  { path: '**', redirectTo: 'home' },

    //Root
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full',
    },
];
