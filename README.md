# Highlighting
Highlighting DOM elements on scrolling

### Usage
```javascript
var mapHighlighting = new MapHighlight()
mapHighlighting.start();
```
If new element was added to DOM or removed, this.sectionsPositions should be updated, so:
```javascript
mapHighlighting.start(); //works as update 
```

## Commands

#### Get Sections
_Select and make array with sections (map_) inside main element selector (by default is body>container)_

```javascript
mapHighlighting.getSections();
this.sectionsMap = [
  "map_applicant1", 
  "map_applicant1_info", 
  "map_applicant1_contact",
  ...
];
```

#### Get Sections Positions
_Make array with sections positions ([offset from top]:[element id])_

```javascript
mapHighlighting.makeSectionsPosition();
this.sectionsPositions = {
  417: "applicant1", 
  446: "applicant1_info", 
  866: "applicant1_contact", 
  ... 
};
```

#### Choose Element which should be highlight
_Check Array With Section`s positions and choose one which should be highlight_

```javascript
mapHighlighting.check();
sectionsYCoordinate = [446, 866, 1062, 1091, 1384, 1445, 1485, 1745]; //DOM elements cordinates
```

#### Highlight the element
_Adding or removing class from element which should be highlight_
```javascript
mapHighlighting.highlite();
```
