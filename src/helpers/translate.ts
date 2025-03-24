export function translate<T extends Record<string, string>>(
  value: string & keyof T,
  data: T,
  lang: "ru" | "en"
): string {
  if (lang === "en") {
    return data[value] || value;
  } else {
    const reverseMapping = Object.entries(data).reduce((acc, [ru, en]) => {
      acc[en] = ru;
      return acc;
    }, {} as Record<string, string>);
    return reverseMapping[value] || value;
  }
}
