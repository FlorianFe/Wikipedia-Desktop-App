Polymer(
{
  is: "wikipedia-app",
  properties:
  {
    language:
    {
        type: String,
        value: "de"
    }
  },
  ready: function()
  {
    this.$["language-select"].addEventListener("iron-select", (event) =>
    {
      this.language = event.detail.item.dataset.value;
    });
  }
});
