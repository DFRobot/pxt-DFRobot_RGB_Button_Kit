
enum DFR0991I2CADDR {
    //% block="0x2A"
    A = 0x2A,
    //% block="0x23"
    B = 0x23,
    //% block="0x24"
    C = 0x24,
    //% block="0x25"
    D = 0x25,
    //% block="0x26"
    E = 0x26,
    //% block="0x27"
    F = 0x27,
    //% block="0x28"
    G = 0x28,
    //% block="0x29"
    H = 0x29
}

/**
 * rgbButton blocks
 */
//% weight=100 color=#0fbc11 icon="\uf063"
namespace rgbButton {

    let _deviceAddr: number = 0x2A;

    /**
     * TODO: 
     * @param address , eg: 0x2A
     */
    //% block="Initialize the I2C RGB light button module and wait until successful %address"
    //% weight=90
    export function begin(address: DFR0991I2CADDR): void {

        _deviceAddr = address;
        let data = readReg(0x09, 2);
    }

    /**
     * TODO: 
     * @param r , eg: 5
     * @param g , eg: 5
     * @param b , eg: 5
     */
    //% block="set display color red %r green %g blue %b"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    //% weight=80
    export function setRGBColor1(r: number, g: number, b: number): void {

        let data: number[] = [0x01, 0, 0, 0]
        data[1] = r;
        data[2] = g;
        data[3] = b;
        writeReg(data, 4);
    }

    /**
     * TODO: 
     * @param color , eg: 5
     */
    //% block="set display color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=70
    export function setRGBColor2(color: number): void {

        let data: number[] = [0x01, 0, 0, 0]
        data[1] = (color >> 16) & 0xFF;
        data[2] = (color >> 8) & 0xFF;
        data[3] = color & 0xFF;
        writeReg(data, 4);
    }

    /**
     * TODO: 
     */
    //% block="key press ?"
    //% weight=60
    export function getButtonStatus(): boolean {

        let data: Buffer = readReg(0x04, 1)
        return data[0] ? true : false;
    }

    function writeReg(data: number[], length: number): void {

        let cmd = pins.createBufferFromArray(data.slice(0, length));
        pins.i2cWriteBuffer(_deviceAddr, cmd, false);
    }

    function readReg(reg: number, size: number): Buffer {

        let cmd = pins.createBufferFromArray([reg]);
        pins.i2cWriteBuffer(_deviceAddr, cmd, false);
        return pins.i2cReadBuffer(_deviceAddr, size);
    }
}
