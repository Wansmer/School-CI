export const expandClasses = (classes, blockName, elemName = '', ...addClasses) => {
  const block = elemName ? `${blockName}-${elemName}` : blockName;
  const object = classes.elems && classes.elems[elemName] ? classes.elems[elemName] : classes;
  const result = elemName ? [] : [blockName];
  for (const modifier in object.mods) {
    let str = `${block}_${modifier}${object.mods[modifier] ? '_' + object.mods[modifier] : '' }`;
    result.push(str);
  }
  result.push(...addClasses);
  return result.join(' ');
};

export const getHumanDate = (date) => {
  date = new Date(date);
  if (date == 'Invalid Date') return '-- ___., --:--';
  const settings = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString('ru', settings);
};

export const getHumanDuration = (duration) => {
  if (!duration) return '-- ч -- мин';
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours % 24} ч ${minutes % 60} мин`;
};
