import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertDialogComponent } from '../modals/dialog/alert-dialog.component';


@Injectable()
export class LoginRouteGuard implements CanActivate {
    fileNameDialogRef: MatDialogRef<AlertDialogComponent>;
    constructor(private dialog: MatDialog) { }

    canActivate() {
        let uid = sessionStorage.getItem('user_uid');
        let myObj = {
            applicants: "",
            application: {
                "message": "Activation blocked for you, Please do login.",
                "response_type": "hard",
                "response_action": "login"
            }
        };
        if (uid !== null)
            return true;
        else {
            this.fileNameDialogRef = this.dialog.open(AlertDialogComponent, {
                hasBackdrop: true,
                height: '316px',
                width: '874px',
                disableClose: true,
                data: myObj
            });
            return false;
        }

    }
}