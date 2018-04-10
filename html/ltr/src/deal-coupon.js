/*============================================================================================
  File Name: form-typeahead.js
  Description: The Typeahead plugin from Twitter's Bootstrap 2 ready to use with Bootstrap 4
  ------------------------------------------------------------------------------------------
  Item Name: Stack - Responsive Admin Theme
  Version: 1.1
  Author: GeeksLabs
  Author URL: http://www.themeforest.net/user/geekslabs
==============================================================================================*/
(function(window, document, $) { 'use strict';
    $(document).ready(function(){

      ///
  var config = {
    apiKey: "AIzaSyAAGopUQDY2GE0T1f_c0dYHrlaywDLqayM",
    authDomain: "my-mart-10d9a.firebaseapp.com",
    databaseURL: "https://my-mart-10d9a.firebaseio.com",
    projectId: "my-mart-10d9a",
    storageBucket: "my-mart-10d9a.appspot.com",
    messagingSenderId: "1012373943902"
    };
  firebase.initializeApp(config);

  var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda"];
  // constructs the suggestion engine
  var my_Suggestion_class = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit:4,
    local: $.map(country_list, function(filtered_items) { return { value: filtered_items }; })
  // local: country_list
  });

// kicks off the loading/processing of `local` and `prefetch`
  my_Suggestion_class.initialize();
  var img_url = "https://raw.githubusercontent.com/cristiroma/countries/master/data/flags/";
  var typeahead_elem = $('.typeahead');
  typeahead_elem.typeahead({
    hint: false,
    highlight: true,
    minLength: 1
  },
  {
    // `ttAdapter` wraps the suggestion engine in an adapter that
    // is compatible with the typeahead jQuery plugin
      name: 'states',
      displayKey: '',
      source: my_Suggestion_class.ttAdapter()
  });

});})(window, document, jQuery);
