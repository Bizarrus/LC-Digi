import HID from 'node-hid';
import Display from './Display.js';

export class Device {
    Vendor     = null;
    Product    = null;
    Path       = null;
    Socket     = null;
    Display = new Display();

    constructor(resource) {
        this.Vendor     = resource.vendorId;
        this.Product    = resource.productId;
        this.Path       = resource.path;

        this.connect();
    }

    connect() {
        this.Socket = new HID.HID(this.Vendor, this.Product);

        if(this.Socket === null) {
            this.Socket = new HID.HID(this.Path);
        }

        this.Display.on('change', () => {
            console.log("Display changed:", this.Display.toJSON());
            this.#update(this.Display);
        });


        let i = 0;
        let j = 0;

        setInterval(() => {
            if(i > 99) {
                i = 0;
            }

            this.Display.setTemperature(i++);
        }, 500);

        setInterval(() => {
            if(j > 9999) {
                j = 0;
            }

            this.Display.setRPM(j++);
        }, 1000);
    }

    #update(display) {
        const rpm = display.getRPM();

        this.Socket.write([
            0x27,        // Command
            0x01,        // Mode
            display.getTemperature(),
            0x01,        // Unbekannt (oft Helligkeit oder Farbe)
            0x01,        // Unbekannt
            0x01,        // Unbekannt
            ((rpm >> 8) & 0xFF),
            (rpm & 0xFF)
        ]);
    }
}