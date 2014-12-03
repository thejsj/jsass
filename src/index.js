var utils = require('./utils');
var MultiLineComment = require('./classes/MultiLineComment');
var CSSProperty = require('./classes/CSSProperty');
var SCSSVariable = require('./classes/SCSSVariable');

var jsass = {};

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
  result.isTree = true;
  result.properties = []; // .hello { font-size: 12px; }
  result._context = {}; // Variables
  result._mixins = (parent !== undefined) ? parent._mixins : {}; // Variables
  result.parent = parent;
  result.selector = selector;

  result.getString = function (indentationLevel, scssTree) {
    return jsass.stringifySCSS(result, indentationLevel);
  };

  var inInlineComment = false;
  var inMultiLineComment = false;
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
        curr_property = '';
      } else if (inMultiLineComment) {
        curr_property += ch;
      }
      // If finishing statement
      else if (ch === ';' && !object_open) {
        if (utils.isInclude(curr_property)) {
          var propertyName = utils.getIncludeName(curr_property);
          if (result._mixins[propertyName] === undefined) {
            throw new Error('included mixin doesn\'t exist');
          }
          var mixin = result._mixins[propertyName];
          result.properties.push(this.parseSCSSString(mixin, '', result));
        } else if (utils.isVariable(curr_property)) {
          var scssVariable = new SCSSVariable(curr_property);
          if (scssVariable.isGlobal()) {
            utils.addToGlobaContext(scssVariable, result);
          } else {
            result._context[scssVariable.key] = scssVariable;
          }
        } else {
          result.properties.push(new CSSProperty(curr_property));
        }
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
            if (utils.isMixin(property_name)) {
              utils.addMixin(property_name, curr_block, result);
            } else {
              result.properties.push(this.parseSCSSString(curr_block, property_name, result));
            }
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

jsass.renderIndentation = function (level) {
  var indentation = '';
  for (var ii = 0; ii < (level * 2); ii += 1) {
    indentation += ' ';
  }
  return indentation;
};
// Shortcut
var i = jsass.renderIndentation;

jsass.stringifySCSS = function (scssTree, indentationLevel) {
  var str = '';
  var first = true;
  var _il = indentationLevel;
  if (scssTree.selector !== null && scssTree.selector !== undefined) {
    str += i(_il) + this.getSelector(scssTree) + ' {';
    str += this.loopThroughProperties(scssTree, _il);
    str += ' }\n';
  } else {
    str += this.loopThroughProperties(scssTree, _il);
  }
  str += this.loopThroughTrees(scssTree, _il);
  return str;
};

jsass.loopThrough = function (isTree, indentation) {
  indentation = indentation || '';
  return function (scssTree, _il) {
    var str = '';
    var first = true;
    var prevTree = false;
    for (var ii = 0; ii < scssTree.properties.length; ii += 1) {
      var _t = scssTree.properties[ii];
      var prevElIsTree = prevTree && (prevTree.isTree || prevTree.isComment);
      if (_t.isTree === isTree) {
        if (_t.isTree) {
          if (!first && (!prevElIsTree || _il === -1)) str += '\n';
          str += _t.getString(_il + 1, scssTree);
        } else {
          if (_il > -1) str += '\n';
          str += i(_il);
          if (_il > -1) str += indentation;
          str += _t.getString(_il + 1, scssTree);
        }
        if (first) first = false;
      }
      prevTree = _t;
    }
    return str;
  };
};
jsass.loopThroughProperties = jsass.loopThrough(false, '  ');
jsass.loopThroughTrees = jsass.loopThrough(true, '');

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
  // var httpRequest;
  // if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
  //   httpRequest = new XMLHttpRequest();
  // } else if (window.ActiveXObject) { // IE 6 and older
  //   httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  // }
  // httpRequest.onreadystatechange = function (response) {
  //   console.log('response');
  //   console.log(response);
  // };
  // httpRequest.open('GET', fileName, true);
  // httpRequest.send(null);
};
try {
  if (window !== undefined) {
    window.jsass = jsass;
  }
} catch (err) {}

try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = jsass;
  }
} catch (err) {}