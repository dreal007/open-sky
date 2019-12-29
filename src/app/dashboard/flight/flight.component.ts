import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/openSky';
import { NotificationService } from 'src/app/services/notification';
import { airports } from 'src/app/data/airports';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  public showArrivals: boolean = false;
  public showDepartures: boolean = false;
  constructor(
    public $api: ApiService,
    public $notify: NotificationService,
    // public airpots : airports
  ) { }

  displayedColumns: string[] = ['icao24', 'firstSeen', 'lastSeen', 'estArrivalAirport', 'estDepartureAirport' ,'callsign'];
  dataSource = new MatTableDataSource<any>(this.$api.store);
  //dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
     this.dataSource.paginator = this.paginator;
     this.showArrivals = this.$api.showArrivals;
     this.showDepartures = this.$api.showDepartures;
  }

}

