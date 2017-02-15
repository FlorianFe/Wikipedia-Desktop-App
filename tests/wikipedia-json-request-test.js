
describe('<wikipedia-json-request>', () =>
{
  let MORE_TIME_THAN_API_RESPONSE_SHOULD_TAKE = 2000; // milliseconds
  let wikipediaJSONRequestFixture;
  let wikipediaJSONRequest;

  beforeAll(() =>
  {
      wikipediaJSONRequestFixture = document.querySelector('#wikipedia-json-request-fixture');
  });

  afterEach(() =>
  {
    wikipediaJSONRequestFixture.restore();
  })

  beforeEach(() =>
  {
    wikipediaJSONRequestFixture.create();
    wikipediaJSONRequest = document.querySelector('#wikipedia-json-request');
  });

  it('should fire a response-Event, when generateRequest-Function was called', (done) =>
  {
    wikipediaJSONRequest.addEventListener("response", () =>
    {
      expect((true)).toBeTruthy();
      done();
    });

    wikipediaJSONRequest.generateRequest();
  });

  it('should not fire a response-Event, when generateRequest-Function was not called', (done) =>
  {
    wikipediaJSONRequest.addEventListener("response", () =>
    {
      done.fail();
    });

    setTimeout(() =>
    {
      done();
    }, MORE_TIME_THAN_API_RESPONSE_SHOULD_TAKE);

    expect(true).toBeTruthy();
  });

  it('should gives an Object on response', (done) =>
  {
    wikipediaJSONRequest.addEventListener("response", (data) =>
    {
      let response = data.detail.response;
      expect(typeof response).toEqual('object');

      done();
    });

    /*
    wikipediaJSONRequest.action = "openSearch";
    wikipediaJSONRequest.options = {
      limit: 10,
      search: "Baum"
    }*/

    wikipediaJSONRequest.generateRequest();
  });

  it('should give an Error-Object on response when action isnt supported by Wikipedia-API', (done) =>
  {
    wikipediaJSONRequest.addEventListener("response", (data) =>
    {
      let response = data.detail.response;
      expect(response.error).not.toBe(undefined);
      done();
    });

    wikipediaJSONRequest.action = "notexistingaction";

    wikipediaJSONRequest.generateRequest();
  });

  it('should give an Error-Object on response when action is supported by Wikipedia-API but required options were not set', (done) =>
  {
    wikipediaJSONRequest.addEventListener("response", (data) =>
    {
      let response = data.detail.response;
      console.log(response);
      expect(response.error).not.toBe(undefined);
      done();
    });

    wikipediaJSONRequest.action = "opensearch";

    wikipediaJSONRequest.generateRequest();
  });

  it('should not give an Error-Object on response when action is supported by Wikipedia-API and required options were set', (done) =>
  {
    wikipediaJSONRequest.addEventListener("response", (data) =>
    {
      let response = data.detail.response;
      expect(response.error).toBe(undefined);
      done();
    });

    wikipediaJSONRequest.options = {search: "Baum"};
    wikipediaJSONRequest.action = "opensearch";

    wikipediaJSONRequest.generateRequest();
  });

  it('should url-encode options correctly', () =>
  {
    let options =
    {
      option1 : "1",
      option2 : "2"
    };

    let urlEncodedOptions = wikipediaJSONRequest._calculateUrlEncodedOptions(options);
    expect(urlEncodedOptions).toEqual("option1=1&option2=2");
  });
});
