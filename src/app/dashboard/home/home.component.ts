import { Component, OnInit, Inject, Input, EventEmitter, Output, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/openSky';
import { NotificationService } from 'src/app/services/notification';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  beginTime : number;
  endTime: number;
  pastTime : number = 1440 ;
  airPortIndex : number ;

  animal: string;
  name: string;

  constructor(
    public $api : ApiService,
    public $notify : NotificationService,
    public dialog: MatDialog,
    public router : Router
  ){}

    airPortMocks = []; 
      

  ngOnInit(){
      this.airPortMocks = this.$api.getAirport();
  }

  openTabDialog(index): void {
    const dialogRef = this.dialog.open(DialogPanelDialog, {
      width: '450px',
       data: { airportIndex : index }
    });
    this.airPortIndex = index;
    console.log(this.airPortIndex);
    // dialogRef.afterClosed().subscribe(time => {
    //    this.getArrivals(index);
    //    this.pastTime = time;
    // });
  }
}


@Component({
  selector: 'dialog-panel-dialog',
  templateUrl: 'dialog-panel-dialog.html',
  styleUrls: ['./home.component.css']
})
export class DialogPanelDialog  implements OnInit {

  pastTime : 1440;
  beginTime: number;
  endTime: number;
  airPortIndex: number;
  airPortMocks : any;
  showProgress: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogPanelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public $api: ApiService,
    public $notify: NotificationService,
    public router: Router) { }

    @Output() event = new EventEmitter;

    onNoClick(): void {
        this.dialogRef.close();
    }

    getCurrentTimestamp() {
      let timeStamp = Math.floor(new Date().getTime() / 1000.0);
      return timeStamp;
    }


  formatTime() {
    this.beginTime = Math.floor(this.pastTime * 60);
    this.endTime = this.getCurrentTimestamp();
    this.beginTime = this.endTime - this.beginTime;
  }

  getArrivals(airportId){
      if (this.pastTime >= 10080){
        this.$notify.showInfo('Cannot fetch later than 7 days', 'Time error');
        return null;
      }

      if (this.pastTime === null || this.pastTime === undefined) {
        this.$notify.showInfo('Time value cannot be empty', 'Time error');
        return null;
      }
      
      this.formatTime();
      let airport = this.airPortMocks[airportId];
      let payload = {
          begin : this.beginTime,
          end : this.endTime,
          airport : airport.icaoCode,
          //limit : 100,
          //offset : 100
      }

      console.log(this.pastTime);
      console.log(payload);
      this.showProgress = true;
      this.$api.getArrivalByAirports(payload).subscribe((arrivals)=>{
          console.log(arrivals)
          this.$api.store = arrivals;
          this.$notify.showSuccess('Fetched successfully', 'Arrivals');
          this.dialogRef.close();
          this.showProgress = false;
          this.$api.showArrivals = true;
          this.$api.showDepartures = false;
          this.router.navigateByUrl('/dashboard/flight')
      },
      error => {
        console.log(error)
        this.$notify.showWarning('An error occured', 'Arrivals');
        this.dialogRef.close();
      })
  }

  getDepartures(airportId){
      this.formatTime();
      let airport = this.airPortMocks[airportId];
      let payload = {
          begin : this.beginTime,
          end : this.endTime,
          airport : airport.icaoCode,
      }

      console.log(this.pastTime);
      console.log(payload);

      this.showProgress = true;
      this.$api.getDepartureByAirports(payload).subscribe((departures)=>{
          this.$api.store = departures;
          this.$notify.showSuccess('Fetched successfully', 'Departures');
          this.dialogRef.close();
          this.showProgress = false;
          this.$api.showArrivals = false;
          this.$api.showDepartures = true;
          this.router.navigateByUrl('/dashboard/flight')
      },
      error => {
        console.log(error)
        this.$notify.showWarning('An error occured', 'Departures');
        this.dialogRef.close();
      })
  }

  ngOnInit(){
      this.airPortMocks = this.$api.getAirport()
  }

}
