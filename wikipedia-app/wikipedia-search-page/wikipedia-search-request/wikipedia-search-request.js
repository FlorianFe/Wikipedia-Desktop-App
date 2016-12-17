
    Polymer(
    {
      is: "wikipedia-search-request",
      properties:
      {
        searchToken:
        {
          type: String,
          notify: true,
          observer: "_updateSearchRequest"
        },
        language:
        {
          type: String,
          notify: true,
          observer: "_updateSearchRequest"
        }
      },
      ready: function()
      {
        this.$["iron-ajax"].addEventListener("response", (data) =>
        {
          let response = data.detail.response;

          let hitNames = response[1];
          let hitDescriptions = response[2];
          let hitLinks = response[3];

          let searchHits = [];
          for(let i=0; i<hitNames.length; i++)
          {
            let hitName = hitNames[i];
            let hitDescription = hitDescriptions[i];
            let hitLink = hitLinks[i];

            searchHits.push(new WikipediaSearchHit(hitName, hitDescription, hitLink));
          }

          this.fire("response", {searchHits: searchHits});
        });
      },
      _updateSearchRequest: function()
      {
        if(this._isSearchTokenDefined(this.searchToken) && this.language != undefined)
        {
          let language = this.language;
          this.$["iron-ajax"].url = `https://${language}.wikipedia.org/w/api.php?action=opensearch&search=${this.searchToken}&format=json&limit=200`;
          this.$["iron-ajax"].generateRequest();
        }
        else
        {
          this.fire("response", {searchHits: []});
        }
      },
      _isSearchTokenDefined: function(searchToken)
      {
        if(typeof searchToken !== "string") return false;
        if(searchToken.length <= 0) return false;
        return true;
      }
    });
