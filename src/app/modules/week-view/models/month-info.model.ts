interface GoalInfoModel {
  id: string;
  title: string;
  perDayData?: number[];
}

interface MonthInfoModel {
  mottoOfMonth: string;
  goals?: GoalInfoModel[];
}

export { GoalInfoModel, MonthInfoModel };
