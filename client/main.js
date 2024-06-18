// Fetch the task from the API database and display them on the page.

// Create a function to fetch the messages from the API
async function fetchTasks() {
  const response = await fetch(`${LINK}/gettasks`);
  const tasks = await response.json();
  return tasks;
}

// Create a function to render the messages on the page
async function renderTasks() {
  // Fetch the tasks from the server
  const tasks = await fetchTasks();
  console.log(tasks);
  // Loop through the tasks and create a div for each task
  tasks.forEach((task) => {
    // Create a div for the task
    const taskContainer = document.createElement("div");
    // Set the text content of the taskContainer div
    taskContainer.textContent = `Completed: ${task.complete} Category: ${task.category} Task: ${task.task} priority: ${task.priority} Due Date: ${task.complete_by}`;
    // If the task is complete, append it to the completedTasks div else append it to the taskList div
    if (task.complete) {
      completedTasks.appendChild(taskContainer);
    } else {
      taskList.appendChild(taskContainer);
    }
  });
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
}

// Get the form from the page
const formTask = document.getElementById("form-task");
const taskList = document.getElementById("task-list");
const completedTasks = document.getElementById("completed-tasks");

// Link for the API database
const LINK = "http://localhost:8080"; // To be changed with the Render URL
// Add an event listener to the form
formTask.addEventListener("submit", addnewTask);

// Call the renderTasks function when the page loads
renderTasks();

let time = 0;
let clock = null;
let addClock = document.querySelector("#aclock");

addClock.addEventListener("click", () => {
  let newTimer = document.createElement("div");
  newTimer.id = "tbox";
  newTimer.style = "width: 95px; height: 60px; border: solid gray;";
  newTimer.innerHTML = ` <button id="m5">5</button>
      <button id="m10">10</button>
      <button id="m15">15</button>
      <div id="display-time" style="text-align: center"></div>
      <div id="mins"></div>
      <button id="start">⏯️</button>
      <button id="reset">Reset</button>`;
  document.body.appendChild(newTimer);
  let b5 = document.querySelector("#m5");
  let b10 = document.querySelector("#m10");
  let b15 = document.querySelector("#m15");
  let display = document.querySelector("#display-time");
  let sbut = document.querySelector("#start");
  let rbut = document.querySelector("#reset");
  function showTime() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    display.textContent = `M:${min} S:${sec}`;
  }
  b5.addEventListener("click", () => {
    time += 5;
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
});
