import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  text: string;
  hasScaned: boolean;

  constructor(public navCtrl: NavController, private qrScanner: QRScanner, public platform: Platform) {
    this.platform.ready().then(() => {
      this.qrScanner.prepare();
    });
    this.hasScaned = false;
  }

  scan() {
    // Request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.text = text;
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.hasScaned = true;
        });
      } else if (status.denied) {
        // camera permission was permanently denied
        alert('Camera permission was permanently denied')
      } else {
        alert('Permission denied')
      }
    })
    .catch((e: any) => alert('Error is' + e));
  }
}
