export const weeks = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export class Calendar {
  constructor(
    // 対象日
    public readonly date: Date,
    // 表示する前の月
    public readonly monthsAgo: number = 3,
    // 週の始まり
    public readonly weekStart: number = 0
  ) {}
}
