import { useState } from "react";

  function TaskItem({ task, onToggle, onDelete }) {
    return (
      <li className="flex flex-col gap-3 rounded-2xl border border-[#eadbc8] bg-[#fffaf2] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p
            className={`break-words text-base font-medium ${
              task.done
                ? "text-[#967b66] line-through"
                : "text-[#4b3528]"
            }`}
          >
            {task.text}
          </p>

          <span
            className={`mt-1 inline-block text-xs font-semibold ${
              task.done ? "text-[#7b604d]" : "text-[#a56f45]"
            }`}
          >
            {task.done ? "Done" : "Not Done"}
          </span>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="rounded-xl bg-[#d8b894] px-3 py-2 text-sm font-semibold text-[#4b3528] transition hover:bg-[#cda77e] active:scale-95"
          >
            {task.done ? "Mark Not Done" : "Mark Done"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-xl border border-[#d8c3ac] bg-[#f7eee3] px-3 py-2 text-sm font-semibold text-[#76523d] transition hover:bg-[#ead8c2] active:scale-95"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }

      function Instructions() {
        return (
          <section className="rounded-3xl border border-[#eadbc8] bg-[#fffaf2] p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#5b3e2e]">
              Instructions
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#f7eee3] p-4">
                <p className="font-semibold text-[#5b3e2e]">
                  1. Add a task
                </p>
                <p className="mt-1 text-sm leading-6 text-[#806b5b]">
                  Type a task in the text box, then click Add Task.
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7eee3] p-4">
                <p className="font-semibold text-[#5b3e2e]">
                  2. Change status
                </p>
                <p className="mt-1 text-sm leading-6 text-[#806b5b]">
                  Click Mark as Done if the task is completed/Mark As Not Done if the task is still not done.
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7eee3] p-4">
                <p className="font-semibold text-[#5b3e2e]">
                  3. Delete a task
                </p>
                <p className="mt-1 text-sm leading-6 text-[#806b5b]">
                  Click Delete if you want to delete the task.
                </p>
              </div>
            </div>
          </section>
        );
      }

  export default function App() {
    const [taskText, setTaskText] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask(event) {
      event.preventDefault();

      const text = taskText.trim();

      if (!text) {
        return;
      }

      const newTask = {
        id: Date.now(),
        text,
        done: false,
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
      setTaskText("");
    }

    function toggleTask(id) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id
            ? { ...task, done: !task.done }
            : task
        )
      );
    }

    function deleteTask(id) {
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    }

    const completedCount = tasks.filter((task) => task.done).length;

    return (
      <main className="min-h-screen bg-[#f4eadb] px-4 py-8 text-[#4b3528] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 text-center">

            <h1 className="text-3xl font-extrabold tracking-tight text-[#4b3528] sm:text-4xl">
              Task Manager
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#806b5b] sm:text-base">
              | BALBIN, HANNAH ELIZABETH P. | BSIT 3-1 | 
            </p>
          </header>

          <section className="rounded-3xl border border-[#eadbc8] bg-[#fffdf8] p-5 shadow-md sm:p-7">
            <form
              onSubmit={addTask}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="task" className="sr-only">
                Enter a task
              </label>

              <input
                id="task"
                type="text"
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                placeholder="What needs to be done?"
                className="min-w-0 flex-1 rounded-2xl border border-[#dbc7b0] bg-[#fffaf2] px-4 py-3 text-[#4b3528] outline-none transition placeholder:text-[#aa9380] focus:border-[#9b6d4b] focus:ring-2 focus:ring-[#d8b894]"
              />

              <button
                type="submit"
                className="rounded-2xl bg-[#8b5e3c] px-6 py-3 font-bold text-white transition hover:bg-[#765038] active:scale-95"
              >
                Add Task
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between border-b border-[#eadbc8] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#5b3e2e]">
                  My Tasks
                </h2>

                <p className="mt-1 text-sm text-[#806b5b]">
                  {tasks.length === 0
                    ? "No tasks yet."
                    : `${completedCount} of ${tasks.length} task${
                        tasks.length === 1 ? "" : "s"
                      } completed`}
                </p>
              </div>

              <span className="rounded-full bg-[#f0e0cc] px-3 py-1 text-sm font-bold text-[#76523d]">
                {tasks.length}
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {tasks.length === 0 ? (
                <li className="rounded-2xl border border-dashed border-[#d8c3ac] bg-[#fdf6ec] p-8 text-center text-sm text-[#907968]">
                  Your task list is empty. Add your first task above.
                </li>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </ul>
          </section>

          <div className="mt-6">
            <Instructions />
          </div>

          <footer className="mt-6 text-center text-xs text-[#927b68]">
            DCIT 26 - Laboratory 2 - SY 2026-2027
          </footer>
        </div>
      </main>
  );
}