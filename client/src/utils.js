export function expandClasses(classes, blockName, elemName = '', ...addClasses) {
  const block = elemName ? `${blockName}-${elemName}` : blockName;
  const object = classes.elems && classes.elems[elemName] ? classes.elems[elemName] : classes;
  const result = elemName ? [] : [blockName];
  for (const modifier in object.mods) {
    let str = `${block}_${modifier}${object.mods[modifier] ? '_' + object.mods[modifier] : '' }`;
    result.push(str);
  }
  result.push(...addClasses);
  return result.join(' ');
}
