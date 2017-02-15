
    Polymer(
    {
      is: "wikipedia-article-image-request",
      properties:
      {
        articleName:
        {
          type: String,
          observer: "_onArticleNameChange"
        },
        language:
        {
          type: String,
          value: "en"
        },
        thumbSize:
        {
          type: Number,
          value: 400
        }
      },
      ready: function()
      {
        this.$["wikipedia-json-request"].addEventListener("response", (data) =>
        {
          let response = data.detail.response;
          let pages = response.query.pages;
          let propertyNames = Object.getOwnPropertyNames(pages);
          let pageId = propertyNames[0];
          let source = (pages[pageId].thumbnail) ?
            pages[pageId].thumbnail.source :
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png";

          console.log(this.articleName);
          console.log(source);

          this.fire("response", {imageURL : source}, {bubbles: false});
        });
      },
      generateRequest: function()
      {
        this.$["wikipedia-json-request"].generateRequest();
      },
      _onArticleNameChange: function()
      {
        this.$["wikipedia-json-request"].options = {
          titles: this.articleName,
          prop: "pageimages",
          pithumbsize: this.thumbSize
        };
      }
    });
