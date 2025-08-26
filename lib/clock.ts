const IS_DEV = process.env.NODE_ENV === "development";

export const clock = {
  now: () => {
    return new Date();
  },
  getWeekdayNumber: () => {
    if (IS_DEV) {
      return 3;
    }
    return new Date().getDay();
  },
};
