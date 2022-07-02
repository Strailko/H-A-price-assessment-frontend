import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  toggleSnackbar() {
    this.openSnackBar("Share", "Copy url").onAction().subscribe(() => {
      this.copyToClipboard(window.location);
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    let config = new MatSnackBarConfig();
    config.horizontalPosition = this.horizontalPosition;
    return this.snackBar.open(message, action, {
    });
  }

  copyToClipboard(item: any) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      if(e.clipboardData) {
        e.clipboardData.setData('text/plain', (item));
        e.preventDefault();
      }
    });
    document.execCommand('copy');
  }

}
