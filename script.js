class MapHighlight {
  constructor(mainSelector = "container", selectByElement = "section", selectByElementWithId = "applicant") {
    this.sections = [];
    this.sectionsMap = [];
    this.sectionsPositions = new Object();

    this.mainSelector = mainSelector;
    this.selectByElement = selectByElement;
    this.selectByElementWithId = selectByElementWithId;
  }
  set mainSelector(value) {
    if (value.length < 1) {
      console.log("%c Main element selector id is too short. Default parametr will be added.", "color: tomato");
      return;
    }
    this._mainSelector = value;
  }
  get mainSelector() {
    return this._mainSelector;
  }
  set selectByElement(value) {
    if (value.length < 1) {
      console.log("%c Element tag selector is too short. Default parametr will be added.", "color: tomato");
      return;
    }
    this._selectByElement = value;
  }
  get selectByElement() {
    return this._selectByElement;
  }
  set selectByElementWithId(value) {
    if (value.length < 1) {
      console.log("%c Element tag selector by id is too short. Default parametr will be added.", "color: tomato");
      return;
    }
    this._selectByElementWithId = value;
  }
  get selectByElementWithId() {
    return this._selectByElementWithId;
  }

  start() {
    this.getSections();
    this.makeSectionsPosition();
    console.log("MEOW");
  }
  getSections() {
    let main = [],
      inner = [];
    $(`#${this._mainSelector}`).children(`${this._selectByElement}[id^="${this._selectByElementWithId}"]`).each(function() {
      main.push(this.id);
    });
    for (var section of main) {
      inner.push(section);
      $("#" + section).find(`${this._selectByElement}[id^="${this._selectByElementWithId}"]`).each(function() {
        inner.push(this.id);
      });
    }
    this.sectionsMap = inner.map(function(sectionId) {
      return "map_" + sectionId;
    });
    return this.sections = inner;
  }
  makeSectionsPosition() {
    let sections = this.sections;
    let positions = {};
    for (let section of sections) {
      if ($("#" + section).length) {
        positions[parseInt($("#" + section).offset().top)] = section;
      }
    }
    return this.sectionsPositions = positions;
  }
  highlite(sectionToHide) {
    let sections = this.sectionsMap;
    for (let section of sections) {
      if (section == sectionToHide) {
        $("#" + section + ">span:last-of-type").addClass("highlight");
      } else {
        $("#" + section + ">span:last-of-type").removeClass("highlight");
      }
    }
    return true;
  }
  check(offset) {
    let sectionsYCoordinate = Object.keys(this.makeSectionsPosition()).map(function(sectionYCoordinate) {
      return parseInt(sectionYCoordinate);
    });
    for (let coordinate = 0; coordinate <= sectionsYCoordinate.length; coordinate++) {
      if (sectionsYCoordinate[coordinate] >= offset) {
        this.sectionsMap[coordinate - 1] ? this.highlite(this.sectionsMap[coordinate - 1]) : this.highlite(this.sectionsMap[coordinate]);
        break;
      } else if (offset >= sectionsYCoordinate[sectionsYCoordinate.length - 1]) {
        this.highlite(this.sectionsMap[this.sectionsMap.length - 1])
      }
    }
    return true;
  }
}

var mapHighlighting = new MapHighlight()
mapHighlighting.start();

$(window).on("scroll", function(e) {
  let scrollFromTop = window.pageYOffset || document.documentElement.scrollTop;
  mapHighlighting.check(scrollFromTop);
});
