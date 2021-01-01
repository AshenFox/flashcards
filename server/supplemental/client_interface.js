const imageSearch = require('image-search-google');
// const options = { page: 1 };

const cse_id = '***REMOVED***';
const keyArr = [
  '***REMOVED***',
  '***REMOVED***',
  '***REMOVED***',
  '***REMOVED***',
  '***REMOVED***',
];

let client_interface = {
  clientArr: [],

  async search(inquiry) {
    for (let client of this.clientArr) {
      this.errCheck(client);

      if (!client.error) {
        try {
          let response = await client.search(`${inquiry}`, {
            page: 1,
            size: 'medium',
          });

          // throw new Error("Some error");
          return response;
        } catch (err) {
          if (!client.error) client.createError();
          console.log(err);
        }
      }
    }

    return null;
  },

  errCheck(client) {
    if (client.error && new Date() - client.errorDate > 88200000) {
      client.error = false;
      client.errorDate = null;
    }
  },
};

class Client extends imageSearch {
  constructor(id, key) {
    super(id, key);
    this.error = false;
  }

  createError() {
    this.error = true;
    this.errorDate = new Date();
  }
}

keyArr.forEach((key) => {
  client_interface.clientArr.push(new Client(cse_id, key));
});

module.exports = client_interface;
