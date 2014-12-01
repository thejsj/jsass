var jsass = {};
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
  var _resultScssString = this.stringifySCSS(scssObjects);
  jobObject.success(_resultScssString);
};

/**
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

  var object_open = false;
  var object_bracket_count = 0;
  var curr_block = '';
  var curr_property = '';
  for (var i = 0; i < str.length; i += 1) {
    var ch = str[i];
    // If finishing statement
    if (ch === ';' && !object_open) {
      result.properties.push(this.parseProperty(curr_property));
      curr_property = '';
    }
    // Opening/Closing Brackets
    else if (ch === '{') {
      object_bracket_count += 1;
      curr_block = '';
      object_open = true;
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
  return result;
};

jsass.parseProperty = function (str) {
  var _property = str.split(":");
  var key = _property[0].trim();
  var value = _property[1].trim();
  return {
    key: key,
    value: value
  };
};

jsass.stringifySCSS = function (scssTree) {
  var str = '';
  var first = true;
  if (scssTree.selector !== null && scssTree.selector !== undefined) {
    str += scssTree.selector + ' {';
    for (var i = 0; i < scssTree.properties.length; i += 1) {
      var p = scssTree.properties[i];
      str += '\n  ' + p.key + ': ' + p.value + ';';
    }
    str += ' }\n';
  }
  for (var j = 0; j < scssTree.children.length; j += 1) {
    if (!first) str += '\n';
    if (first) first = false;
    str += jsass.stringifySCSS(scssTree.children[j]);
  }
  return str;
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