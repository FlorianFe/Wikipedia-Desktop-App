
describe('<wikipedia-search-request>', () =>
{
  let MORE_TIME_THAN_API_RESPONSE_SHOULD_TAKE = 2000; // milliseconds
  let wikipediaSearchRequestFixture;
  let wikipediaSearchRequest;

  beforeAll(() =>
  {
    wikipediaSearchRequestFixture = document.querySelector('#wikipedia-search-request-fixture');
  });

  afterEach(() =>
  {
    wikipediaSearchRequestFixture.restore();
  })

  beforeEach(() =>
  {
    wikipediaSearchRequestFixture.create();
    wikipediaSearchRequest = document.querySelector('#wikipedia-search-request');
  });

  it('should fire a response-Event, when search Token changes', (done) =>
  {
    wikipediaSearchRequest.addEventListener("response", () =>
    {
      expect(true).toBeTruthy();
      done();
    });

    wikipediaSearchRequest.searchToken = "Baum";
  });

  it('should not fire a response-Event, when search Token is an empty String', (done) =>
  {
    wikipediaSearchRequest.addEventListener("response", () =>
    {
      done.fail();
    });

    setTimeout(() =>
    {
      expect(true).toBeTruthy();
      done();
    }, MORE_TIME_THAN_API_RESPONSE_SHOULD_TAKE);

    wikipediaSearchRequest.searchToken = "";
  });

  it('should respond in the correct order', (done) =>
  {
    let lastSearchToken;

    wikipediaSearchRequest.addEventListener("response", (data) =>
    {
      lastSearchToken = data.detail.searchToken;
    });

    setTimeout(() =>
    {
      expect(lastSearchToken).toBe("Birne");
      done();
    }, MORE_TIME_THAN_API_RESPONSE_SHOULD_TAKE);

    wikipediaSearchRequest.searchToken = "Baum";
    wikipediaSearchRequest.searchToken = "Blatt";
    wikipediaSearchRequest.searchToken = "Gurke";
    wikipediaSearchRequest.searchToken = "Apfel";
    wikipediaSearchRequest.searchToken = "Birne";
  });

  it('should just respond once on multiple requests at a short period of time', (done) =>
  {
    let numberOfResponds = 0;

    wikipediaSearchRequest.addEventListener("response", () =>
    {
      numberOfResponds ++;
    });

    setTimeout(() =>
    {
      console.log(numberOfResponds);
      expect(numberOfResponds).toBe(1);
      done();
    }, MORE_TIME_THAN_API_RESPONSE_SHOULD_TAKE);

    wikipediaSearchRequest.searchToken = "Baum";
    wikipediaSearchRequest.searchToken = "Blatt";
    wikipediaSearchRequest.searchToken = "Gurke";
    wikipediaSearchRequest.searchToken = "Apfel";
    wikipediaSearchRequest.searchToken = "Birne";
  });

  it('should respond with an Array of WikipediaSearchHits', (done) =>
  {
    wikipediaSearchRequest.addEventListener("response", (data) =>
    {
      let searchHits = data.detail.searchHits;

      expect(searchHits instanceof Array).toBeTruthy();
      expect(searchHits[0] instanceof WikipediaSearchHit).toBeTruthy();

      done();
    });

    wikipediaSearchRequest.searchToken = "Baum";
  });
});
