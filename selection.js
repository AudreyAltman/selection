var selection = function() {

  var self = {};  //public
  var my = {
    "container" : document.body,
    "textString" : null,
    "innerHtml" : null,
    "rangeObject" : null
  };  //private

  self.readSelection = function() {
    my.rangeObject = my.setRange();
    my.innerHtml = my.setHtml();
  };

  self.setContainer = function(domElement) {
    my.container = domElement;
  };

  self.clearContainer = function() {
    my.container = document.body;
  };

  self.getRange = function() {
    return my.rangeObject;
  };

  self.getHtml = function() {
    return my.innerHtml;
  };

  self.getText = function() {
    return my.textString;
  };

  my.selectionToRange = function(selectionObject) {
  //this function takes a Selection object and returns a Range object
    var range;

    if (selectionObject.getRangeAt) {
      range = selectionObject.getRangeAt(0);
    } else {  
    //Safari 1.3
      range = document.createRange();
      range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
      range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
    }
    return range;
  };

	my.setRange = function(){
	//it reads the user hilighted text and returns a Range object	
	//if and only if the user has hilighted at least one character
  //and the hilighted text is within the given DOM element

    var textString, rangeObject;
    my.textString = null;

		if(window.getSelection) {
  	//for Mozilla, Safari, and Opera
  		var selectionObject = window.getSelection();
      textString = selectionObject.toString();

      if (textString.length > 0) {
      //user has hilighted at least one character
        rangeObject = my.selectionToRange(selectionObject);
      }
      
		} else if (document.selection) {
		//older versions of IE, assign a Text Range object to userSelection
  		rangeObject = document.selection.createRange();
  		textString = rangeObject.text;
		}   

    if (textString.length > 0 && my.isContained(rangeObject)) {
    //user has hilighted at least one character from container
      my.textString = textString;
      return rangeObject;
    }
		return null;
	};

  my.setHtml = function() {
  //this function returns the HTML of the user-hilighted text
    rangeObject = my.rangeObject;
    if (rangeObject) {
      var myNode = document.createElement("div");
      myNode.appendChild(rangeObject.cloneContents());
      return myNode.innerHTML;
    }
    return null;
  };

  my.isContained = function(rangeObject) {
	//this function takes a range object 
  //it returns true if and only if the range object is contained within 
  //the specified container
  //this function will always return true with incompatible browsers

    var c = my.container;
    if (c === document.body) {
      return true;
    }

    if (rangeObject && rangeObject.commonAncestorContainer) {
      var parent = rangeObject.commonAncestorContainer;
      while (parent !== document.body) {
        if (c === parent) {
          return true;
        }
        parent = parent.parentNode;
      }
      return false;
    } 
    //failsafe
    return true;
	};

  return self;
};
