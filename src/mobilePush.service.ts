import * as request from "request-promise";

export class MobilePushService {

    private static readonly BASE_URL = 'https://api.pushbullet.com/v2';
    private static readonly API_KEY = 'o.1mOLBoSFPCBjoCbQIrOdQnNwFOgcfxGR';
    private static readonly NOKIA_DEVICE_ID = 'ujEJ1LNd60isjvqSNdjZaS';

    static async sendText(formattedMessage: string): Promise<void> {
        let options = this.buildRequestOptions(formattedMessage);

        await request.post(`${this.BASE_URL}/texts`, options)
            .catch((error) => {
                throw new Error(`Mobile Push error: ${error}`);
            });
    }

    private static buildRequestOptions(formattedMessage: string): object {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': this.API_KEY
            },
            body: {
                data: {
                    target_device_iden: this.NOKIA_DEVICE_ID,
                    addresses: ["+12039154679"],
                    message: formattedMessage
                }
            },
            json: true
        }
    }
}