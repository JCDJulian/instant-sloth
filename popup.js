// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, sloths!
 *
 * @type {string}
 */
var QUERY = 'cute sloth';

var slothGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=d4e40192c9b290fdd520fb3fc931676a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=20',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of sloths. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestSloths: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our sloth XHR request, generated in
   * 'requestSloths', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var sloths = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < sloths.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructSlothURL(sloths[i]);
      img.setAttribute('alt', sloths[i].getAttribute('title'));
      document.getElementById("tab2").appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at

   *
   * @param {DOMElement} A sloth.
   * @return {string} The sloth's URL.
   * @private
   */
  constructSlothURL: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our sloth generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  slothGenerator.requestSloths();
});
