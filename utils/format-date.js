export function formatDate(dateString, includeDay = false) {
  const date = new Date(dateString);

  // Use Intl.PluralRules for the day suffix
  // const pluralRules = new Intl.PluralRules("en", { type: "ordinal" });
  // const suffixes = {
  //   one: "st",
  //   two: "nd",
  //   few: "rd",
  //   other: "th",
  // };

  const day = new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(date);
  // const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(
  //   date,
  // );
  const month = new Intl.DateTimeFormat("en-GB", { month: "2-digit" }).format(
    date,
  );
  const year = new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(
    date,
  );

  // const daySuffix = suffixes[pluralRules.select(day)];

  // return `${day}${daySuffix} ${month} ՚${year} `;
  if (includeDay) {
    return `${day} ∕ ${month} ∕ ${year}`;
  }

  return `${month} ∕ ${year}`;
}
