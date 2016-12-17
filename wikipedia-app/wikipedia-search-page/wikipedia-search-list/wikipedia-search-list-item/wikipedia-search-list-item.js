
Polymer(
{
  is: "wikipedia-search-list-item",
  properties:
  {
    searchHit:
    {
      type: Object,
      observer: "_onSearchHitChange"
    },
    language:
    {
      type: String,
      notify: true
    }
  },
  behaviors:
  [
    Polymer.AppLocalizeBehavior
  ],
  attached: function()
  {
    this.loadResources(this.resolveUrl('wikipedia-search-list-item-locales.json'));
  },
  ready: function()
  {
    this.$["iron-ajax"].addEventListener("response", (data) =>
    {
      let response = data.detail.response;
      this.$["paper-card"].image = this._getThumbnailSourceFromResponse(response);
    });
  },
  _onSearchHitChange: function(searchHit)
  {
    let language = this.language;
    let name = searchHit.name

    if(name != undefined && language != undefined)
    {
      this.$["iron-ajax"].url = `https://${language}.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&pithumbsize=400`;
      this.$["iron-ajax"].generateRequest();
    }
  },
  _getThumbnailSourceFromResponse: function(response)
  {
    let pages = response.query.pages;
    let propertyNames = Object.getOwnPropertyNames(pages);
    let pageId = propertyNames[0];
    let source = (pages[pageId].thumbnail) ?
      pages[pageId].thumbnail.source :
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png";
    return source;
  },
  _getClassOfPaperIcon(favorited)
  {
    return favorited;
  }
});
