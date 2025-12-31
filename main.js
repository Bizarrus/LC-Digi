import HID from 'node-hid';
import {Device} from "./Core/Device.js";

(new class Main {
    Vendor        = 0x5131;      // Company: LC-Power
    Products     = [ 0x2007 ];  // 2007 = LC-CC-120-DB6
    Devices = new Map();

    constructor() {
        HID.devicesAsync().then((devices) => {
            devices.forEach((resource) => {
               /* Check the Vendor-ID (LC-Power.com) */
               if(resource.vendorId === this.Vendor) {
                   this.init(resource);
               }
            });
        });
    }

    init(resource) {
        /* Check if product is supported */
        if(this.Products.indexOf(resource.productId) === -1) {
            console.error('Unsupported device:', resource.path);
            return;
        }

        // Create Device
        this.Devices.set(resource.path, new Device(resource));
    }
}());