const colorMap = {
  'fef2c0': 'fffffff',
  'ededed': 'fffffff',
  'fad8c7': 'fffffff',
  'bfd4f2': 'fffffff',
  'd4c5f9': 'fffffff',
  'bfdadc': 'fffffff',
  'c2e0c6': 'fffffff',
  'ffff00': 'fffffff',
  '02d7e1': 'fffffff',
  'c7def8': 'fffffff',
  'f7c6c7': 'fffffff',
  'fbca04': 'fffffff',
};

function getTextColorForLabel(labelObj) {
  return colorMap[labelObj.color] === undefined || '423d3d';
}

module.exports.getTextColorForLabel = getTextColorForLabel;
