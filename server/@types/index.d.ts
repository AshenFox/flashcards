declare module "image-search-google" {
  export default class ImageSearch {
    constructor(cseId: string, apiKey: string);

    search(query: string, options?: any): Promise<any>;

    cseId: string;
    apiKey: string;
  }
}
