export const expandClasses = (
  classes: Classes,
  blockName: string,
  elemName: string = "",
  ...addClasses: string[]
) => {
  const block: string = elemName ? `${blockName}-${elemName}` : blockName;
  const object: any =
    classes.elems && classes.elems[elemName]
      ? classes.elems[elemName]
      : classes;
  const result: string[] = elemName ? [] : [blockName];
  for (const modifier in object.mods) {
    let str = `${block}_${modifier}${
      object.mods[modifier] ? "_" + object.mods[modifier] : ""
    }`;
    result.push(str);
  }
  result.push(...addClasses);
  return result.join(" ");
};

export const getHumanDate = (date: string, locale: string = "ru") => {
  const formatDate: Date = new Date(date);

  if (formatDate.toLocaleString() === "Invalid Date") return "-- ___., --:--";
  const settings = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return formatDate.toLocaleString(locale, settings);
};

export const getHumanDuration = (duration: number, locale: string = "ru") => {
  const hourWrapper = locale === "ru" ? "ч" : "h";
  const minutesWrapper = locale === "ru" ? "м" : "m";

  if (!duration) return `0 ${hourWrapper} 0 ${minutesWrapper}`;

  const seconds: number = Math.floor(duration / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);

  return `${hours % 24} ${hourWrapper} ${minutes % 60} ${minutesWrapper}`;
};
