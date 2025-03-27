import { type ExperienceType } from "../components/Experience/types";

export function experiencesForPage(
  arr: [string, ExperienceType][],
  step: number
) {
  const result = [];

  for (let i = 1; i < arr.length; i++) {
    if (i % 2 !== 0) {
      result.push(arr.slice(i, i + step));
    }
  }
  return result;
}
