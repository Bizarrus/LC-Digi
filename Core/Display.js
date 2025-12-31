import * as Events from 'node:events';

export default class Display extends Events.EventEmitter {
    Temperature = 0;
    RPM         = 0;

    constructor() {
        super();
    }

    getTemperature() {
        return this.Temperature;
    }

    setTemperature(temperature) {
        temperature = Math.max(0, Math.min(99, Math.round(temperature)));

        if(temperature !== this.Temperature) {
            this.Temperature = temperature;
            this.emit('change');
        }
    }

    getRPM() {
        return this.RPM;
    }

    setRPM(rpm) {
        this.RPM = Math.max(0, Math.min(9999, Math.round(rpm)));
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    toJSON() {
        return {
            Temperature:    this.Temperature,
            RPM:            this.RPM
        };
    }
}