import config from "config";
import ImageSearch from "image-search-google";

declare global {
  namespace ImageSearchGoogle {
    export class ImageSearch {
      constructor(cseId: string, apiKey: string);

      search(query: string, options?: any): Promise<any>;

      cseId: string;
      apiKey: string;
    }
  }
}

const cse_id: string = config.get("cse_id");
const keyArr: string[] = config.get("keyArr");

interface IClientInterface {
  clientArr: Client[];
  search(inquiry: string): Promise<any>;
  errCheck(client: Client): void;
}

class Client extends ImageSearch {
  errorDate: Date | null;
  error: boolean;

  constructor(id: string, key: string) {
    super(id, key);
    this.error = false;
    this.errorDate = null;
  }

  createError() {
    this.error = true;
    this.errorDate = new Date();
  }
}

const client_interface: IClientInterface = {
  clientArr: [],

  async search(inquiry: string) {
    for (let client of this.clientArr as Client[]) {
      this.errCheck(client);

      if (!client.error) {
        try {
          let response = await client.search(`${inquiry}`, {
            page: 1,
            size: "medium",
          });

          return response;
        } catch (err) {
          if (!client.error) client.createError();
          console.log(err);
        }
      }
    }

    return null;
  },

  errCheck(client: Client) {
    const { error, errorDate } = client;

    if (
      error &&
      errorDate &&
      new Date().getTime() - errorDate.getTime() > 88200000
    ) {
      client.error = false;
      client.errorDate = null;
    }
  },
};

keyArr.forEach(key => {
  client_interface.clientArr.push(new Client(cse_id, key));
});

export default client_interface;
