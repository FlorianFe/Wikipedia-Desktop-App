
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
    this._onSearchHitChange(this.searchHit);
    this.$["wikipedia-article-image-request"].addEventListener("response", (data) =>
    {
      let imageURL = data.detail.imageURL;
      this.$["paper-card"].image = imageURL;
    });
  },
  _onSearchHitChange: function(searchHit)
  {
    if(searchHit)
    {
      let language = this.language;
      let name = searchHit.name

      if(name != undefined && language != undefined)
      {
        this.$["wikipedia-article-image-request"].generateRequest();
      }
    }
  }
});
