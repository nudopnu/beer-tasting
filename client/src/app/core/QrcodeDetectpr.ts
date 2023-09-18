import { Html5Qrcode } from "html5-qrcode";


export class QrcodeDetector {
    constructor() { }

    initi(cameraId: string) {
        const html5QrCode = new Html5Qrcode(/* element id */ "reader");
        html5QrCode.start(
            cameraId,
            {
                fps: 10,    // Optional, frame per seconds for qr code scanning
                qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
            },
            (decodedText, decodedResult) => {
                console.log(decodedText, decodedResult);
                // do something when code is read
            },
            (errorMessage) => {
                // parse error, ignore it.
            })
            .catch((err) => {
                // Start failed, handle it.
            });
    }
}