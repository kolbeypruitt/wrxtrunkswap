var carD = {
  // the Edmunds API changed the model name 3 times thru the years
  // this method changes 'wrx' to the correct format to query the API
  formatModel: function (model, year) {
    if (year <= 2012) {
      return 'impreza';
    } else if (year <= 2014) {
      return 'impreza-wrx';
    } else if (year <= 2017) {
      return 'wrx';
    }
  },
  // returns an an array of ids given a list of style matches from edmunds
  loopStyles: function (json) {
    var obj = JSON.parse(json);
    var idList = obj.styles.map(function(style) {
      var id = style.id;
      var trim = style.trim;
      return {'id': id, 'trim': trim}
    });
    return idList;
  },

  getColorNames: function (json) {
    var obj = JSON.parse(json);
    console.log(obj);
    var filteredColors = obj.colors.filter(function (color) {
      return color.category==='Exterior';
    })
    var colors = filteredColors.map(function (color) {
      return {
        'name': color.name,
        'hex': '#'+color.colorChips.primary.hex
        }
    })
    return colors;
  },

  makeTrimList: function (json) {
    var obj = json;
    var tmp = {};
    var filterDupes = obj.filter(function (trimObj) {
      if (!tmp[trimObj.trim]) {
        tmp[trimObj.trim] = trimObj.trim;
        return true;
      } else {
        return false;
      }
    })
    var newTrimList = filterDupes.map(function (trimObj) {
      return trimObj.trim;
    })
    return newTrimList;
  },

  findStyleId: function (trimsAndStyles, trim) {
    for (var i = 0; i < trimsAndStyles.length; i++) {
      if (trimsAndStyles[i].trim === trim) {
        return trimsAndStyles[i].id;
      }
    }
  }
}

module.exports = carD;