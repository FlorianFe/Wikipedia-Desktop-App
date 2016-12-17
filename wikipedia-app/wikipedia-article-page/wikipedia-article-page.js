
Polymer(
{
  is: "wikipedia-article-page",
  properties:
  {
    articleName:
    {
      type: String,
      notify: true
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
    this.loadResources(this.resolveUrl('wikipedia-article-page-locales.json'));
  },
  ready: function()
  {
    this.$["wikipedia-article-request"].addEventListener("response", (event) =>
    {
      let sections = event.detail.sections;
      this.$["wikipedia-article-content"].sections = sections;
    });
  }
});
