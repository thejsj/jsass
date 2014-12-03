var utils = {};

utils.isVariable = function (str) {
  return str.trim()[0] === '$';
};

utils.getVariableName = function (str) {
  var varName = str.trim();
  if (utils.isVariable(varName)) return varName.slice(1);
  return varName;
};

utils.getVariableValue = function (varName, tree) {
  if (tree._context[varName] !== undefined) {
    return tree._context[varName].getValue();
  }
  if (tree.parent !== null && tree.parent !== undefined) {
    return utils.getVariableValue(varName, tree.parent);
  }
  throw new Error('Variable $' + varName + ' not defined');
};

utils.addToGlobaContext = function (scssVar, tree) {
  if (tree.parent === null || tree.parent === undefined) {
    tree._context[scssVar.key] = scssVar;
    return true;
  }
  return utils.addToGlobaContext(scssVar, tree.parent);
};

utils.isMixin = function (str) {
  return str.trim().slice(0, 6) === '@mixin';
};

utils.isInclude = function (str) {
  return str.trim().slice(0, 8) === '@include';
};

utils.getMixinName = function (str) {
  return str.replace('@mixin', '')
    .replace(/\({1}[^/)]*\){1}/g, '')
    .trim();
};

utils.getIncludeName = function (str) {
  return str.replace('@include', '')
    .replace(/\({1}[^/)]*\){1}/g, '')
    .trim();
};

utils.addMixin = function (propertyName, block, tree) {
  var parsedPropertyName = utils.getMixinName(propertyName);
  tree._mixins[parsedPropertyName] = block;
  return true;
};

module.exports = utils;