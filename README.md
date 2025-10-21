# 🧘 habit-tracker

A command-line tool built with Node.js to help you track your daily habits and maintain consistency.

## 🌟 Features

* **Daily Check-in**: Log your habits as completed or missed.
* **Time-Based Routines**: Separate scripts for focusing on Morning and Evening routines.
* **Simple CLI Interface**: Easily interact with your habit list from your terminal.

## 🛠️ Technologies

* **Language**: JavaScript
* **Runtime**: Node.js
* **Package Manager**: npm

## 🚀 Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)
* Git

### Steps

1. Clone the repository:

```bash
git clone https://github.com/orenys7/habit-tracker.git
cd habit-tracker
```

2. Install dependencies:

```bash
npm install
```

## 📖 Usage

The project appears to use different scripts for different times of the day, likely reading and updating habit data stored in `habits.js` (or a database/file managed by it).

### 1. Run the Main Tracker

Use `index.js` to perform the main action, which could be listing habits, checking status, or prompting for a general update.

```bash
node index.js
```

### 2. Check-in on Morning Habits

Run the `morning.js` script to specifically log completion for habits scheduled in the morning.

```bash
node morning.js
```

### 3. Check-in on Evening Habits

Run the `evening.js` script to specifically log completion for habits scheduled in the evening.

```bash
node evening.js
```

## 📂 Project Structure

| File/Folder | Description |
|-------------|-------------|
| `index.js` | The main entry point for the application. |
| `habits.js` | Contains the core logic for habit management (defining, reading, and updating habit data). |
| `morning.js` | A dedicated script for tracking morning-specific habits. |
| `evening.js` | A dedicated script for tracking evening-specific habits. |
| `package.json` | Defines project metadata and dependencies. |
| `.github/workflows` | Contains CI/CD configuration files for GitHub Actions (e.g., testing or automated deployment). |

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Contact

**orenys7** – [GitHub Profile](https://github.com/orenys7)
