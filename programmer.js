const CH_VID = 0x4348;
const CH_PID = 0x55e0;

const MODE_WRITE_V1 = 0xa8;
const MODE_VERIFY_V1 = 0xa7;
const MODE_WRITE_V2 = 0xa5;
const MODE_VERIFY_V2 = 0xa6;

const DETECT_CHIP_CMD_V1 = new Uint8Array([0xa2, 0x13, 0x55, 0x53, 0x42, 0x20, 0x44, 0x42, 0x47, 0x20, 0x43, 0x48, 0x35, 0x35, 0x39, 0x20, 0x26, 0x20, 0x49, 0x53, 0x50, 0x00]);
const DETECT_CHIP_CMD_V2 = new Uint8Array([0xa1, 0x12, 0x00, 0x52, 0x11, 0x4d, 0x43, 0x55, 0x20, 0x49, 0x53, 0x50, 0x20, 0x26, 0x20, 0x57, 0x43, 0x48, 0x2e, 0x43, 0x4e]);

class Programmer {
    constructor() {
        this.device = null;
        this.interface = null;
        this.endpointOut = null;
        this.endpointIn = null;
    }

    async connect() {
        try {
            this.device = await navigator.usb.requestDevice({
                filters: [{ vendorId: CH_VID, productId: CH_PID }]
            });

            await this.device.open();
            console.log('Device connected:', this.device);

            const config = this.device.configuration;
            this.interface = config.interfaces[0];
            await this.interface.claimInterface();
            this.endpointOut = this.interface.endpointOut;
            this.endpointIn = this.interface.endpointIn;
        } catch (error) {
            console.error('Error connecting to device:', error);
            throw error;
        }
    }

    async detect() {
        try {
            await this.sendCmd(DETECT_CHIP_CMD_V2);
            console.log('Chip detected:', this.chipname);
        } catch (error) {
            console.error('Chip identification failed:', error);
            throw error;
        }
    }

    async erase() {
        try {
            // Implement erase logic here
            console.log('Erased successfully');
        } catch (error) {
            console.error('Erase failed:', error);
            throw error;
        }
    }

    async flashBin(filename) {
        try {
            // Implement flashing logic here
            console.log('Flashed successfully');
        } catch (error) {
            console.error('Flash failed:', error);
            throw error;
        }
    }

    async verifyBin(filename) {
        try {
            // Implement verification logic here
            console.log('Verified successfully');
        } catch (error) {
            console.error('Verification failed:', error);
            throw error;
        }
    }

    async sendCmd(cmd) {
        try {
            await this.device.transferOut(this.endpointOut.endpointNumber, cmd);
            const result = await this.device.transferIn(this.endpointIn.endpointNumber, 64);
            return result;
        } catch (error) {
            console.error('Error sending command:', error);
            throw error;
        }
    }
}

// Example usage:
async function main() {
    const programmer = new Programmer();
    try {
        await programmer.connect();
        await programmer.detect();
        await programmer.erase();
        await programmer.flashBin('filename.bin');
        await programmer.verifyBin('filename.bin');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
