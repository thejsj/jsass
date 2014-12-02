var jsass = {};
var MultiLineComment = require('./classes/MultiLineComment');
var CSSProperty = require('./classes/CSSProperty');
var fs = require('fs');

jsass.render = function (jobObject) {
  if (typeof jobObject.success !== 'function') throw new Error('Success Method Required');
  if (jobObject.file !== undefined) {
    this.loadFile(jobObject.file, this.compileSCSSStringIntoCSS.bind(this, jobObject));
  } else if (jobObject.data !== undefined) {
    this.compileSCSSStringIntoCSS(jobObject, jobObject.data);
  }
};

jsass.compileSCSSStringIntoCSS = function (jobObject, scssString) {
  var scssObjects = this.parseSCSSString(scssString);
  console.log(scssObjects);
  var _resultScssString = this.stringifySCSS(scssObjects, -1);
  jobObject.success(_resultScssString);
};

/**
 * Parse a SCSS String with a selector into a SCSS Object Tree
 *
 * @param <String>
 * @return <Object> An object tree of SCSS Objects
 */
jsass.parseSCSSString = function (str, selector, parent) {
  var result = {};
  result.children = []; // .hello { .hello { } }
  result.properties = []; // .hello { font-size: 12px; }
  result._context = {}; // Variables
  result.parent = parent;
  result.selector = selector;

  var inInlineComment = false;
  var inMultiLineComment = true;
  var object_open = false;
  var object_bracket_count = 0;
  var curr_block = '';
  var curr_property = '';

  for (var i = 0; i < str.length; i += 1) {
    var prevCh = str[i - 1] || '';
    var nextCh = str[i + 1] || '';
    var ch = str[i];

    // If inline comment
    if (inInlineComment && prevCh === "\n") {
      inInlineComment = false;
    } else if (!inInlineComment && ch === '/' && nextCh === '/') {
      // Remove the first char
      inInlineComment = true;
    }

    if (!inInlineComment) {
      if (!inMultiLineComment && ch === '/' && nextCh === '*') {
        inMultiLineComment = true;
        curr_property = '';
      } else if (inMultiLineComment && prevCh === '*' && ch === '/') {
        inMultiLineComment = false;
        result.properties.push(new MultiLineComment(curr_property));
      } else if (inMultiLineComment) {
        curr_property += ch;
      }
      // If finishing statement
      else if (ch === ';' && !object_open) {
        result.properties.push(this.parseProperty(curr_property));
        curr_property = '';
      }
      // Opening/Closing Brackets
      else if (ch === '{') {
        object_bracket_count += 1;
        object_open = true;
        if (object_bracket_count === 0) {
          curr_block = '';
        } else if (object_bracket_count !== 1) {
          curr_block += ch;
        }
      } else if (ch === '}') {
        object_bracket_count -= 1;
        if (object_bracket_count === 0) {
          if (curr_block.trim() !== '') {
            var property_name = curr_property.trim();
            result.children.push(this.parseSCSSString(curr_block, property_name, result));
          }
          curr_block = '';
          curr_property = '';
          object_open = false;
        } else {
          curr_block += ch;
        }
      } else {
        // Appending Chars
        if (object_open) {
          curr_block += ch;
        } else {
          curr_property += ch;
        }
      }
    }
  }
  return result;
};

jsass.stringifySCSS = function (scssTree, indentationLevel) {
  var str = '';
  var first = true;
  var _il = indentationLevel;
  var i = function (level) {
    var indentation = '';
    for (var ii = 0; ii < (level * 2); ii += 1) {
      indentation += ' ';
    }
    return indentation;
  };
  if (scssTree.selector !== null && scssTree.selector !== undefined) {
    str += i(_il) + this.getSelector(scssTree) + ' {';
    for (var z = 0; z < scssTree.properties.length; z += 1) {
      var p = scssTree.properties[z];
      str += '\n' + i(_il) + '  ' + p.key + ': ' + p.value + ';';
    }
    str += ' }\n';
  }
  for (var j = 0; j < scssTree.children.length; j += 1) {
    if (!first && indentationLevel < 0) str += '\n';
    if (first) first = false;
    str += jsass.stringifySCSS(scssTree.children[j], indentationLevel + 1);
  }
  return str;
};

jsass.getSelector = function (scssTree) {
  var selector = '';
  if (scssTree.selector !== null && scssTree.selector !== undefined) {
    if (scssTree.parent.selector !== null && scssTree.parent.selector !== undefined) {
      if (scssTree.selector[0] === '&') {
        selector = this.getSelector(scssTree.parent) + scssTree.selector.slice(1);
      } else {
        selector = this.getSelector(scssTree.parent) + ' ' + scssTree.selector;
      }
    } else {
      selector = scssTree.selector;
    }
  }
  return selector.trim();
};

jsass.loadFile = function (fileName, callback) {
  // This would be different in a browser environment
  fs.readFile(fileName, function (err, buffer) {
    if (err) console.log(err);
    if (callback !== undefined) {
      callback(buffer.toString());
    }
  });
};

try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = jsass;
  }
} catch (err) {}