export const MY_HABITS = [
  'Meditation',
  'Reading Book',
  'Football',
  'Gym',
  'Practice English',
  'Self Development',
  'Coding',
];

export const HABITS_OBJECT = {
  'Meditation': {
    calendarId: process.env.PRIVATE_CALENDAR_ID,
    duration: 15,
    notionPage: process.env.MEDITATION_PAGE_ID
  },
  'Reading Book': {
    calendarId: process.env.PRIVATE_CALENDAR_ID,
    duration: 30,
    notionPage: process.env.READING_BOOKS_PAGE_ID
  },
  'Football': {
    calendarId: process.env.PRIVATE_CALENDAR_ID,
    duration: 120,
    notionPage: process.env.FOOTBALL_PAGE_ID
  },
  'Gym': {
    calendarId: process.env.PRIVATE_CALENDAR_ID,
    duration: 60,
    notionPage: process.env.GYM_PAGE_ID
  },
  'Practice English': {
    calendarId: process.env.STUDY_CALENDAR_ID,
    duration: 30,
    notionPage: process.env.PRACTICE_ENGLISH_PAGE_ID
  },
  'Self Development': {
    calendarId: process.env.STUDY_CALENDAR_ID,
    duration: 30,
    notionPage: process.env.SELF_DEVELOPMENT_PAGE_ID
  },
  'Coding': {
    calendarId: process.env.STUDY_CALENDAR_ID,
    duration: 30,
    notionPage: process.env.CODING_PAGE_ID
  },
};  