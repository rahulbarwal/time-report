interface GoalInfoModel {
  id: string;
  title: string;
  perDayData?: (number | null | undefined)[];
}

interface MonthInfoModel {
  mottoOfMonth: string;
  goals?: GoalInfoModel[];
}

export { GoalInfoModel, MonthInfoModel };
