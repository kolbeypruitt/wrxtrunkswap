var GBL = {
  clickOffer: function () {
    window.location = 'http://www.google.com';
    window.location.reload(true); 
    
    $('#closeSearchBtn').click();
    $('#closeHelpBtn').click();
    $('#closeDashBtn').click();
    $('#offerBtn').click();
  },

  clickSearch: function () {
    $('#closeOfferBtn').click();
    $('#closeHelpBtn').click();
    $('#closeDashBtn').click();
    $('#searchBtn').click();
  },

  clickHelp: function () {
    $('#closeOfferBtn').click();
    $('#closeSearchBtn').click();
    $('#closeDashBtn').click();
    $('#helpBtn').click();
  },

  clickDash: function () {
    $('#closeOfferBtn').click();
    $('#closeSearchBtn').click();
    $('#closeHelpBtn').click();
    $('#dashBtn').click();
  }
}