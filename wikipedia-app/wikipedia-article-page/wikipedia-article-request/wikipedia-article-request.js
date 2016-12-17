
  Polymer(
  {
    is: "wikipedia-article-request",
    properties:
    {
      articleName:
      {
        type: String,
        notify: true,
        observer: "_updateArticleRequest"
      },
      language:
      {
        type: String,
        notify: true,
        observer: "_updateArticleRequest"
      }
    },
    ready: function()
    {
      this.$["iron-ajax"].addEventListener("response", (data) =>
      {
        let response = data.detail.response;
        let sections = response.parse.sections;
        this.fire("response", {sections: sections});
      });
    },
    _updateArticleRequest: function()
    {
      let language = this.language;
      let articleName = this.articleName;

      if(articleName != undefined && language != undefined)
      {
        this.$["iron-ajax"].url = `https://${language}.wikipedia.org/w/api.php?action=parse&page=${articleName}&prop=sections&format=json`;
        this.$["iron-ajax"].generateRequest();
      }
      else
      {
        this.fire("response", {articleContent: {}});
      }
    }
  });
