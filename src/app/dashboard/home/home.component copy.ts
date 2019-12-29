// import { Component, OnInit, Inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ApiService } from 'src/app/services/openSky';
// import { NotificationService } from 'src/app/services/notification';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit{
//   beginTime : number;
//   endTime: number;
//   pastTime : number = 1440 ;

//   animal: string;
//   name: string;

//   constructor(
//     public $api : ApiService,
//     public $notify : NotificationService,
//     public dialog: MatDialog
//   ){}

//     airPortMocks  = [
//       {
//         name: "Hartsfield–Jackson International Airport",
//         location: "Atlanta, Georgia",
//         country: "United States",
//         icaoCode : "KATL"
//       },
//       {
//         name: "Los Angeles International Airport",
//         location: "Los Angeles, California",
//         country: "United States",
//         icaoCode: "KLAX"
//       },

//       {
//         name: "Tokyo Haneda Airport",
//         location: "Ōta, Tokyo",
//         country: "Japan",
//         icaoCode: "RJTT"
//       },

//       {
//         name: "Dubai International Airport",
//         location: "Garhoud, Dubai",
//         country: "United Arab Emirates",
//         icaoCode: "OMDB"
//       },

//       {
//         name: "O'Hare International Airport",
//         location: "Chicago, Illinois",
//         country: "United States",
//         icaoCode: "KORD"
//       },

//       {
//         name: "London Heathrow Airport",
//         location: "Hillingdon, London",
//         country: "United Kingdom",
//         icaoCode: "EGLL"
//       },

//       {
//         name: "Hong Kong International Airport",
//         location: "Chek Lap Kok, Islands, New Territories",
//         country: "Hong Kong SAR, China",
//         icaoCode: "VHHH"
//       },

//       {
//         name: "Paris-Charles de Gaulle Airport",
//         location: "Roissy-en-France, Île-de-France",
//         country: "France",
//         icaoCode: "LFPG"
//       },

//       {
//         name: "Dallas/Fort Worth International Airport",
//         location: "Dallas-Fort Worth, Texas",
//         country: "United States",
//         icaoCode: "KDFW"
//       },

//       {
//         name: "Amsterdam Airport Schiphol",
//         location: "Haarlemmermeer, North Holland",
//         country: "The Netherlands",
//         icaoCode: "EHAM"
//       }

//   ]

//   ngOnInit(){
    
//   }

//   getArrivals(airportId){
//       this.formatTime();
//       let airport = this.airPortMocks[airportId];
//       let payload = {
//           begin : this.beginTime,
//           end : this.endTime,
//           airport : airport.icaoCode,
//           limit : 100,
//           offset : 100
//       }

//       console.log(this.pastTime);

//       // this.$api.getArrivalByAirports(payload).subscribe((arrivals)=>{
//       //     console.log(arrivals)
//       //     this.$notify.showSuccess('Fetched successfully', 'Arrivals');
//       // })
//   }
//   getCurrentTimestamp(){
//       let timeStamp = Math.floor(new Date().getTime() / 1000.0);
//       return timeStamp;
//   }


//   formatTime(){
//       this.beginTime = Math.floor(this.pastTime * 60);
//       this.endTime = this.getCurrentTimestamp();
//       this.beginTime = this.endTime - this.beginTime;
//   }


//   openTabDialog(index): void {
//     const dialogRef = this.dialog.open(DialogPanelDialog, {
//       width: '450px',
//        data: { name: this.name, animal: this.animal }
//     });

//     dialogRef.afterClosed().subscribe(time => {
//        this.getArrivals(index);
//        this.pastTime = time;
//     });
//   }
// }


// @Component({
//   selector: 'dialog-panel-dialog',
//   templateUrl: 'dialog-panel-dialog.html',
//   styleUrls: ['./home.component.css']
// })
// export class DialogPanelDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogPanelDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
