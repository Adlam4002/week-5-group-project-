// Fetch the task from the API database and display them on the page.

// Create a function to fetch the messages from the API
async function fetchTasks() {
  const response = await fetch(`${LINK}/gettasks`);
  const tasks = await response.json();
  return tasks;
}

// Create a function to render the messages on the page
async function renderTasks() {
  const tasks = await fetchTasks();
  console.log(tasks);
  tasks.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.textContent = `Completed: ${task.complete} Category: ${task.category} Task: ${task.task} priority: ${task.priority} Due Date: ${task.complete_by}`;
    taskList.appendChild(taskContainer);
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
