import { google } from 'googleapis';
import { authorize, notion, HABITS_DB } from './index.js';
import { HABITS_OBJECT } from './habits.js';

const fetchCompletedTasks = async (service, list) => {
  try {
    const res = await service.tasks.list({
      tasklist: list.id,
      showCompleted: true,
      showHidden: true
    });
    const tasks = res.data.items || [];
    const completedTasks = tasks.filter(task => task.status === 'completed');
    console.log(`📌 Found ${completedTasks.length} completed tasks for today`);
    return completedTasks;
  }
  catch (error) {
    console.error('❌ Failed to fetch completed tasks:', error.message);
    return [];
  }
};

const deleteTaskList = async (service, list) => {
  try {
    await service.tasklists.delete({
      tasklist: list.id
    });
    console.log('✅ Successfully deleted Google Tasks list after sync');
  } catch (error) {
    console.error('❌ Failed to delete Google Tasks list:', error.message);
  }
}

const updateTaskInCalendar = async (calendar, task) => {
  try {
    const calendarId = HABITS_OBJECT[task.title]?.calendarId || 'primary';
    const endTime = new Date(task.completed);
    const startTime = new Date(endTime.getTime() - (HABITS_OBJECT[task.title]?.duration || 30) * 60000);

    console.log(`⏳ Creating event for ${task.title} from ${startTime.toISOString()} to ${endTime.toISOString()}`);

    await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `${task.title}`,
        start: { dateTime: startTime.toISOString(), timeZone: "Asia/Jerusalem" },
        end: { dateTime: endTime.toISOString(), timeZone: "Asia/Jerusalem" },
        description: "Auto-created from habit tracker",
      },
    });
    console.log(`🗓️ Event created: ${task.title} → ${calendarId}`);
  } catch (error) {
    console.error(`❌ Failed to create event for ${task.title}:`, error.message);
  }
};

const syncTaskToNotion = async (task, date) => {
  await notion.pages.create({
    parent: { database_id: HABITS_DB },
    properties: {
      'Date': {
        type: 'date',
        date: {
          start: date,
          end: null
        }
      },
      'Name': {
        type: 'title',
        title: [{
          type: 'text',
          text: { content: task.title }
        }]
      },
      'Habits': {
        type: 'relation',
        relation: [{
          id: HABITS_OBJECT[task.title].notionPage
        }]
      }
    }
  });
  console.log(`📌 Synced ${task.title} to Notion`);
};

const syncCompletedTasks = async (auth) => {
  const service = google.tasks({ version: 'v1', auth });
  const calendar = google.calendar({ version: "v3", auth });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // Fetch today's task list
  const lists = await service.tasklists.list();
  const todaysList = lists?.data?.items?.find(l => l.title.includes(today));
  if (!todaysList) {
    console.log('⚠️ No task list found for today');
    return;
  }

  try {
    const completedTasks = await fetchCompletedTasks(service, todaysList);
    if (!completedTasks || completedTasks.length === 0) {
      console.log('⚠️ No completed tasks to sync for today');
      await deleteTaskList(service, todaysList);
      return;
    }

    for (const task of completedTasks) {
      try {
        await updateTaskInCalendar(calendar, task);
        await syncTaskToNotion(task, today);
      } catch (error) {
        console.error(`Failed to sync task: ${task.title}`, error.message);
      }
    }

    // Delete the task list after successful sync
    await deleteTaskList(service, todaysList);
  } catch (error) {
    console.error('❌ Error during sync process:', error.message);
  }
};

(async () => {
  const auth = await authorize();
  await syncCompletedTasks(auth);
})();
