// Fetch the task from the API database and display them on the page.

// Create a function to fetch the messages from the API
async function fetchTasks() {
  const response = await fetch(`${LINK}/gettasks`);
  const tasks = await response.json();
  return tasks;
}

// Create a function to add a button to the task
async function createTaskButton(isComplete, taskID) {
  // Add a button to mark the task as complete
  const button = document.createElement("button");
  button.textContent = isComplete ? "Undo" : "Finished";
  button.className = "complete-button";
  // Add an event listener to the complete button
  button.addEventListener("click", async () => {
    // Update the task as complete in the database
    try {
      await fetch(`${LINK}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskID,
          // Set the task to the opposite of the current state
          setTo: !isComplete,
        }),
      });
      // Render the tasks after updating a task
      renderTasks();
    } catch (error) {
      // Error handling
      console.error("Error completing task!", error);
    }
  });
  return button;
}

// Create a function to render the messages on the page
async function renderTasks() {
  // Check if the tasks have already been rendered if so delete them
  if (isTasksRendered) {
    taskList.innerHTML = "";
    completedTasks.innerHTML = "";
  }

  // Fetch the tasks from the server
  const tasks = await fetchTasks();
  console.log(tasks);
  // Loop through the tasks and create a div for each task
  for (const task of tasks) {
    // Create a div for the task
    const taskContainer = document.createElement("div");
    // Set the text content of the taskContainer div
    taskContainer.textContent = `Task: ${task.task} Category: ${task.category} Priority: ${task.priority} Due Date: ${task.to_char}`;
    // Create the right button for the task
    const button = await createTaskButton(task.complete, task.id);
    // If the task is complete, append it to the completedTasks div else append it to the taskList div
    if (task.complete) {
      // and filter for priority
      if (
        task.priority === completedTasksFilter.value ||
        completedTasksFilter.value === "all"
      ) {
        // Append the button to the taskContainer div
        taskContainer.appendChild(button);
        // Append the taskContainer div to the completedTasks div
        completedTasks.appendChild(taskContainer);
      }
    } else {
      if (
        task.priority === taskListFilter.value ||
        taskListFilter.value === "all"
      ) {
        // Append the button to the taskContainer div
        taskContainer.appendChild(button);
        // Append the taskContainer div to the taskList div
        taskList.appendChild(taskContainer);
      }
    }
  }
  isTasksRendered = true;
}
// Function to add a task and fetch the data to the server
async function addnewTask(event) {
  event.preventDefault();
  console.log("Task submitted!");
  // Get the form data and convert it to an object to be sent to the server
  const formData = Object.fromEntries(new FormData(formTask));
  console.log(formData);
  // Send the data to the server
  try {
    // Fetch the data from the server
    await fetch(`${LINK}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    // Error handling
    console.error("Error submitting task!", error);
  }
  // Reset the form values
  formTask.reset();
  // Render the tasks after adding a new task
  renderTasks();
  setTimeout(() => {
    taskList.scrollTop = taskList.scrollHeight;
  }, 100);
}

// Get the form from the page
const formTask = document.getElementById("form-task");
const taskList = document.getElementById("task-list");
const completedTasks = document.getElementById("completed-tasks");
const taskListFilter = document.getElementById("leftPriorityFilter");
const completedTasksFilter = document.getElementById("rightPriorityFilter");

// Link for the API database
const LINK = "http://localhost:8080"; // To be changed with the Render URL
// Add an event listener to the form
formTask.addEventListener("submit", addnewTask);

let isTasksRendered = false;
// Call the renderTasks function when the page loads
renderTasks();
taskListFilter.addEventListener("change", renderTasks);
completedTasksFilter.addEventListener("change", renderTasks);

// Function to create and then toggle timer
let time = 0;
let clock = null;
let addClock = document.querySelector("#aclock");
let timerContainer = document.querySelector("#timer-container");
let timerExist = false;
let newTimer = document.createElement("div");
addClock.addEventListener("click", () => {
  if (timerExist === false) {
    timerExist = true;

    newTimer.id = "tbox";
    // newTimer.style = "border: solid gray;";
    newTimer.innerHTML = ` <button id="m5">5</button>
      <button id="m10">10</button>
      <button id="m15">15</button>
      <div id="display-time" style="text-align: center"></div>
      <div id="mins"></div>
      <button id="start">⏯️</button>
      <button id="reset">Reset</button>`;
    timerContainer.appendChild(newTimer);
    let b5 = document.querySelector("#m5");
    let b10 = document.querySelector("#m10");
    let b15 = document.querySelector("#m15");
    let display = document.querySelector("#display-time");
    let sbut = document.querySelector("#start");
    let rbut = document.querySelector("#reset");
    function showTime() {
      let hour = Math.floor(time / 3600);
      let min = Math.floor((time / 60) % 60);
      let sec = time % 60;
      display.textContent = `${hour}:${min}:${sec}`;
    }
    b5.addEventListener("click", () => {
      time += 300;
      showTime();
    });
    b10.addEventListener("click", () => {
      time += 600;
      showTime();
    });
    b15.addEventListener("click", () => {
      time += 900;
      showTime();
    });
    rbut.addEventListener("click", () => {
      time = 0;
      if (clock) {
        clearInterval(clock);
        clock = null;
      }
      showTime();
    });
    sbut.addEventListener("click", () => {
      if (clock) {
        clearInterval(clock);
        clock = null;
        showTime();
      } else if (time > 0) {
        clock = setInterval(() => {
          time -= 1;
          showTime();
          if (time == 0) {
            clearInterval(clock);
            clock = null;
            alert("Time is up!");
          }
        }, 1000);
      }
    });
    showTime();
  } else {
    if (newTimer.style.display !== "none") newTimer.style.display = "none";
    else {
      newTimer.style.display = "grid";
    }
  }
});
