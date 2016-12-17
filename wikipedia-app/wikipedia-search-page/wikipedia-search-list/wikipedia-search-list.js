
Polymer(
{
  is: "wikipedia-search-list",
  properties:
  {
    searchHits:
    {
      value: [],
      type: Array,
      notify: true
    },
    language:
    {
      type: String,
      notify: true
    }
  }
});
