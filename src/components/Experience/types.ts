export type ExperienceFormType = {
  id: string;
  position: string;
  teamSize: string;
  project: string;
  isCurrent?: boolean;
  start: Date | undefined;
  end?: Date | undefined;
};
