import { type Dayjs } from "dayjs";

const monthsRu = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const monthsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDate(
  lang: string,
  current?: boolean,
  start?: object,
  end?: object
) {
  const months = lang === "ru" ? monthsRu : monthsEn;
  let str = "";

  if (start) {
    const monthIndex = (start as Dayjs).month();
    const year = (start as Dayjs).year();

    str = `${months[monthIndex]} ${year}` + str;
  }

  if (end) {
    const monthIndex = (end as Dayjs).month();
    const year = (end as Dayjs).year();

    str = str + ` - ${months[monthIndex]} ${year}`;
  }

  if (current && start) {
    const monthIndex = (start as Dayjs).month();
    const year = (start as Dayjs).year();

    str = `${months[monthIndex]} ${year} - ${
      lang === "ru" ? "Настоящее время" : "Present time"
    }`;
  }

  return str;
}
