selection
=========

JavaScript library that reads user-highlighted text

##Uses

This library reads a selection that a user has hilighted on an HTML page.  It returns the selection as text, HTML, or a Range object.  

You can also designate an HTML container from which a valid selection can be read.

##Basic Use

To initialize this library:

	var s = selection();

Optionally, you can designate an HTML container from which a valid selection can be read.  If you do not set a container, the default is to accept any selection as valid.

	var myContainer = document.getElementById("valid");
	s.setContainer(myContainer);

You can clear the container, reverting back to the default:

	s.clearContainer();

To read the selection that the user has hilighted:

	s.readSelection();

This is a setter function; it does not return anything.

You can return the user selection as text, HTML, or a Range object.

	s.getText();
	s.getHtml();
	s.getRange();

If the user has not highlighted a valid selection, these getter funtions will return null.

##Browser Support

This library is designed to work on Mozilla, Safari, Chrome, IE, and Opera.  The container function may not work on older browsers.