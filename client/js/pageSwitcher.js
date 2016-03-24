var GBL = {
  clickOffer: function () {
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