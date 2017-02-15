
    Polymer(
    {
      is: "wikipedia-search-request",
      properties:
      {
        searchToken:
        {
          type: String,
          observer: "_updateSearchRequest",
          value: ""
        },
        language:
        {
          type: String,
          observer: "_updateSearchRequest",
          value: "de"
        },
        searchHitLimit:
        {
          type: Number,
          value: 10
        }
      },
      ready: function()
      {
        this.$["wikipedia-json-request"].addEventListener("response", (data) =>
        {
          let response = data.detail.response;

          let searchToken = response[0];

          if(searchToken === this.searchToken)
          {
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

            this.fire("response", {searchHits: searchHits, searchToken : searchToken}, {bubbles: false});
          }
        });
      },
      _updateSearchRequest: function()
      {
        if(this._isSearchTokenDefined(this.searchToken) &&
          this.language != undefined &&
          this.searchHitLimit != undefined)
        {
          this.$["wikipedia-json-request"].options = {
            limit: this.searchHitLimit,
            search: this.searchToken
          };

          this.$["wikipedia-json-request"].generateRequest();
        }
        else
        {
          this.fire("response", {searchHits: [], searchToken : this.searchToken}, {bubbles: false});
        }
      },
      _isSearchTokenDefined: function(searchToken)
      {
        if(typeof searchToken !== "string") return false;
        if(searchToken.length <= 0) return false;
        return true;
      }
    });
