Polymer(
{
  is: "wikipedia-app",
  properties:
  {
    language :
    {
      type: String,
      value: "de"
    }
  },
  behaviors:
  [
    Polymer.AppLocalizeBehavior
  ],
  attached: function()
  {
    this.loadResources(this.resolveUrl('wikipedia-app-locales.json'));
  },
  ready: function()
  {
    this.$["wikipedia-settings-page"].addEventListener("language-changed", (data) =>
    {
      let language = data.detail.language;

      if(language !== undefined)
      {
        this.language = language;
      }
    });

    this.$["wikipedia-settings-page"].addEventListener("search-hit-limit-changed", (data) =>
    {
      let searchHitLimit = data.detail.searchHitLimit;
      if(searchHitLimit !== undefined)
        this.$["wikipedia-search-page"].searchHitLimit = searchHitLimit;
    });

    this.$["tab-menu"].addEventListener("iron-select", () =>
    {
      let selected = this.$["tab-menu"].selected;

      switch(selected)
      {
        case 1:
          this.importHref("src/wikipedia-app/wikipedia-settings-page/wikipedia-settings-page.html", () =>
          {
            this.$["iron-pages"].selected = selected;
          });
          break;
        default:
          this.$["iron-pages"].selected = selected;
      }
    });
  }
});
