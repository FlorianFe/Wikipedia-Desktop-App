
Polymer(
{
  is: "wikipedia-settings-page",
  properties:
  {
    language:
    {
      type: String,
      notify: true,
      value: "de"
    },
    searchHitLimit:
    {
      type: Number,
      notify: true,
      value: 100
    },
  },
  behaviors:
  [
    Polymer.AppLocalizeBehavior
  ],
  attached: function()
  {
    this.loadResources(this.resolveUrl('wikipedia-settings-page-locales.json'));
  },
  ready: function()
  {
    this.$["language-select"].addEventListener("iron-select", (data) =>
    {
      this.language = data.detail.item.dataset.value;
      console.log(data.detail.item.dataset.value);
      this.fire("language-changed", {language: this.language});
    });

    this.$["search-hit-limit-slider"].addEventListener('value-change', () =>
    {
      let value = this.$["search-hit-limit-slider"].value;
      this.searchHitLimit = value;
      this.fire("search-hit-limit-changed", {searchHitLimit: this.searchHitLimit});
    });
  }
});
