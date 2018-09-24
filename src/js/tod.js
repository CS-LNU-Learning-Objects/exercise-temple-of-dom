/*
 * You can solve this exercise in many ways. You can create a own type
 * that will give you possibility to create instances so you repeat the
 * job with diffrent nodes and templates.
 *
 * You can also do like below and just expose a run-method that could be
 * called over and over for different nodes and templates. I our case we
 * have counter variables as private static (global in the module) that we
 * set to 0 after each running. You could also solve that with an updating result object
 * you toss around in the recursive function.
 */

// variables for this module
var elementNumber = 0
var attributeNumber = 0
var commentNumber = 0
var textNodeNumber = 0

/**
 * Check the node if it is an attribute or Element and update the counter
 * @param node
 */
function updateElementOrAttribute (node) {
  if (node.tagName) {
    elementNumber += 1
  }

  if (node.attributes && node.attributes.length > 0) {
    attributeNumber += node.attributes.length
  }
}

/**
 * recursive function that examinate each nod and updates the counters
 * @param {Element} node
 */
function nodeCount (node) {
  switch (node.nodeType) {
    case 1: updateElementOrAttribute(node); break
    case 3: textNodeNumber += 1; break
    case 8: commentNumber += 1; break
    default: break
  }

  if (!node.childNodes) {
    return
  }

  for (var i = 0; i < node.childNodes.length; i += 1) {
    nodeCount(node.childNodes[i])
  }
}

/**
 * Just print out result in the provided template
 * @param {String} templateID - the ID of the template in the HTML
 */
function UseTemplate (templateID) {
  // Don´t really like the string-stuff here but hey ho, lets go.
  var arr = []
  arr.push({ headline: 'Number of elements', value: elementNumber })
  arr.push({ headline: 'Number of attributes', value: attributeNumber })
  arr.push({ headline: 'Number of comments', value: commentNumber })
  arr.push({ headline: 'Number of text nodes', value: textNodeNumber })

  var template = document.getElementById(templateID)
  for (var i = 0; i < arr.length; i += 1) {
    var clone = document.importNode(template.content, true)
    clone.querySelector('h3').textContent = arr[i].headline
    clone.querySelector('p').textContent = arr[i].value
    document.querySelector('body').appendChild(clone)
  }
}

/**
 * Start the application by running calls to function
 * @param {String} templateID - The id to the template where stuff i spresented
 * @param {Node} node to examinate - optional
 */
function run (templateID, node) {
  node = node || document.children[0]
  nodeCount(node)
  UseTemplate(templateID)

  // must reset after each running
  elementNumber = 0
  attributeNumber = 0
  commentNumber = 0
  textNodeNumber = 0
}

/**
 * Public API - Expose the run method
 * @type {{run: run}}
 */
module.exports = {
  run: run
}
