const xp_required_tolevel = [0, 100, 250, 500, 1000]; // fill table with the XP required to be at "Level" = index + 1
// XP for level:             1   2    3    4     5
async function getLevel() {
  const xp = await calculateTotalXp();
  //'getLevel' determines players level based on thier (xp), it iterates though the predefined array of XP thresholds and returns the corresponding level
  for (let index = xp_required_tolevel.length - 1; index >= 0; --index) {
    if (xp >= xp_required_tolevel[index]) {
      console.log(index + 1);
      return index + 1; // +1 is needed as the Array's index starts at 0 but levels start at 1
    }
  }
  console.log("XP value can not be negative. The given value was: " + xp);
  return 0;
}

//function to add XP and update the total XP pool, updates the total XP and determines the current level baseod on the updated xp
function addXP(xoToAdd) {
  if (xpToAdd < 0) {
    console.log("xp to add cannot be negative.");
    return;
  }
  const currentLevel = getLevel();
  console.log("Current level is: " + currentLevel);
}

// XP values based on priority
const xpValues = {
  low: 25,
  medium: 50,
  high: 100,
};

// Function to calculate total XP
const calculateTotalXp = async () => {
  try {
    // Connect to the database
    const res = await (
      await fetch("https://week-5-group-project-server.onrender.com")
    ).json();

    let totalXp = 0;

    // Loop through each task and calculate XP
    res.forEach((task) => {
      if (task.complete) {
        switch (task.priority) {
          case "low":
            totalXp += xpValues.low;
            break;
          case "medium":
            totalXp += xpValues.medium;
            break;
          case "high":
            totalXp += xpValues.high;
            break;
          default:
            console.log(`Unknown priority: ${task.priority}`);
        }
      }
    });

    console.log(`Total XP: ${totalXp}`);
    return totalXp;
  } catch (err) {
    console.error("Error querying the database:", err);
  }
  return 0;
};

// Call the function to calculate total XP
getLevel();
