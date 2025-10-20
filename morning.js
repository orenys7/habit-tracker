import { google } from 'googleapis';
import { authorize } from './index.js';
import { MY_HABITS } from './habits.js';

async function createTodayHabits(auth) {
  const service = google.tasks({ version: 'v1', auth });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  // Create a new task list for today's habits
  const tasklist = await service.tasklists.insert({
    requestBody: { title: `Habits ${today}` },
  });

  const habits = MY_HABITS.reverse();

  for (const habit of habits) {
    await service.tasks.insert({
      tasklist: tasklist.data.id,
      requestBody: { title: habit },
    });
  }

  console.log(`✅ Created tasks for ${today}`);
}

(async () => {
  const auth = await authorize();
  await createTodayHabits(auth);
})();
