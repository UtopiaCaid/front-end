import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService} from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service';
import { AircraftTypeData } from 'src/app/services/admin-aircraftType-service/aircraftType-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminAircraftTypeFormComponent } from '../admin-aircraftType-form/admin-aircraftType-form.component';

@Component({
  selector: 'app-admin-aircraftType',
  templateUrl: './admin-aircraftType.component.html',
  styleUrls: ['./admin-aircraftType.component.css']
})
export class AdminAircraftTypeComponent implements OnInit {

  ELEMENT_DATA!: AircraftTypeData[];
  displayedColumns: string[] = ['aircraftTypeId', 'aircraftTypeName', 'seatMaximum', 'manufacturer', 'action'];
  dataSource = new MatTableDataSource<AircraftTypeData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminAircraftTypeService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.getAllAircraftType();
  }

  public getAllAircraftType() {
    let res = this.service.retrieveAircraftTypes();
    res.subscribe(data => this.dataSource.data = data as AircraftTypeData[]);
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    this.dialog.open(AdminAircraftTypeFormComponent, {
      data: {
        row: row,
      },
    });

  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AdminAircraftTypeFormComponent);
  }
}
