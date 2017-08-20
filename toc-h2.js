/**
 * Script for dynamic generation of TOC listings
 */

document.addEventListener('DOMContentLoaded', function(){
	var toc = document.createDocumentFragment();
	var headings = document.querySelectorAll('h2,h3,h4:not(.no-toc)');

	var tocList = new Array(12);
	tocList[0] = setol();

	var tocItem = headings[0].textContent;
	setli(headings[0].id, tocItem, tocList[0]);

	for(var i=1; i<headings.length; i++) {
		if (headings[i].id.length>headings[i-1].id.length){
			tocListBefore = tocList[i-1];
			tocList[i] = setol(tocList[i-1]);
			tocItem = headings[i].textContent;
			setli(headings[i].id, tocItem, tocList[i]);
			tocListCur = tocList[i];
		}
		else if(headings[i].id.length==headings[i-1].id.length){
			tocItem = headings[i].textContent;
			setli(headings[i].id, tocItem, tocListCur);
			tocList[i] = tocList[i-1];
		}
		else{
			tocItem = headings[i].textContent;
			setli(headings[i].id, tocItem, tocListBefore);
			tocList[i] = tocList[1];
		}

	}

	createElement({
		tagName: 'h2',
		properties: { id: 'contents', className: 'no-toc' },
		content: 'Table of contents',
		parent: toc
	});

	toc.appendChild(tocList[0]);

	headings[0].parentNode.insertBefore(toc, headings[0]);

}, false);

/**
 * Creates a new DOM element
 * @param options {Object} A set of key/value pairs:
 *						options.tagName: The type of the element to be created (required)
 *						options.properties: Property-value pairs to set on the element
 *						options.content: String, node or document fragment to add as contents of the new element
 *						options.parent: Add it as a child of this node
 *
 * @return The new DOM element
 */
function createElement(options) {
	var element = document.createElement(options.tagName);

	if(options.properties) {
		for(var i in options.properties) {
			element[i] = options.properties[i];
		}
	}

	if(options.content) {
		var content = typeof options.content === 'string'?
							document.createTextNode(options.content)
						  : options.content;

		element.appendChild(content);
	}
	return options.parent? options.parent.appendChild(element) : element;
}

/**
 * Creates a new <li> element
 * @param x: the id of the specified <h> tag
 *				tocItem: the <li> tag
 * 				tocList: the <ol> tag, set as the parent of tocItem
 *
 * @return void
 */
function setli(x, tocItem, tocList){
	if(x) {
		tocItem = createElement({
			tagName: 'a',
			properties: { href: '#' + x },
			content: tocItem
		});
	}
	createElement({
		tagName: 'li',
		content: tocItem,
		parent: tocList
	});
}

/**
 * Creates a new <ol> element
 * @param x: the parent <ol> of the returned tocList
 *
 * @return the newly clreated <ol> element
 */
function setol(x){
	var tocList = createElement({
		tagName: 'ol',
		properties: { className: 'toc' },
		parent: x
	});
	return tocList;
}
