export function createListItemsString(
  items: string,
  type: "skills" | "achievements"
) {
  return items
    .replace(type === "skills" ? /•/g : /[•·]/g, "")
    .split(type === "skills" ? /\s*·\s*|\n\s*/ : /[.;]/)
    .filter((item) => item.length);
}
