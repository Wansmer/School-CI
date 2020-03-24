export function expandClasses (classes, blockName, elemName = '') {
  const block = elemName ? `${classes.mainClass}-${elemName}` : blockName;
  const object = classes.elems && classes.elems[elemName] ? classes.elems[elemName] : classes;
  const result = [];
  for (const modifier in object.mods) {
    let str = `${block}_${modifier}_${classes.mods[modifier]}`;
    result.push(str);
  }
  return result.join(' ');
}
