Polymer(
{
  is: "wikipedia-json-request",
  properties:
  {
    auto:
    {
      type: Boolean,
      value: false
    },
    action:
    {
      type: String,
      value: "parse"
    },
    options:
    {
      type: Array,
      value: []
    },
    language:
    {
      type: String,
      value: "en"
    }
  },
  ready: function()
  {
    if(this.auto)
      this.generateRequest();
  },
  generateRequest: function()
  {
    if(jQuery !== undefined)
    {
      let language = this.language;
      let action = this.action;
      let urlEncodedOptions = this._calculateUrlEncodedOptions(this.options);
      let url = `http://${language}.wikipedia.org/w/api.php?action=${action}&format=json&${urlEncodedOptions}&callback=?`;

      jQuery.getJSON(url, (response) => this.fire("response", {response : JSON.parse(JSON.stringify(response))}, {bubbles: false}));
    }
  },
  _calculateUrlEncodedOptions: function(options)
  {
    let result = Object.keys(options).map((key) =>
    {
      return encodeURIComponent(key) + '=' + encodeURIComponent(options[key])
    }).join('&');

    return result;
  }
});
