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
// Link for the API database
const LINK = "http://localhost:8080"; // To be changed with the Render URL
// Add an event listener to the form
formTask.addEventListener("submit", addnewTask);
