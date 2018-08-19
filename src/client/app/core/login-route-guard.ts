import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { FirebaseLoginService } from './firebase.login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertDialogComponent } from '../modals/dialog/alert-dialog.component';


@Injectable()
export class LoginRouteGuard implements CanActivate {
    fileNameDialogRef: MatDialogRef<AlertDialogComponent>;
    constructor(private firebaseLoginService: FirebaseLoginService,
        private dialog: MatDialog) { }

    canActivate() {
        let uid = sessionStorage.getItem('user_uid');
        if (uid !== null)
            return true;
        else {
            this.fileNameDialogRef = this.dialog.open(AlertDialogComponent, {
                hasBackdrop: true,
                height: '190px',
                width: '500px',
                disableClose: true,
                data: { message: 'Activation blocked for you, Please do login.' }
            });
            return false;
        }

    }
}