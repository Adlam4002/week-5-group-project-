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
export const calculateTotalXp = async () => {
  try {
    // Connect to the database
    const res = await (
      await fetch("https://week-5-group-project-server.onrender.com/gettasks")
    ).json();

    let totalXp = 0;
    let userLevel = 1;
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
    let xpBar = document.querySelector("#xp-to-lvl");

    function setXpBoundary() {
      if (totalXp >= 0 && totalXp <= 99) {
        xpBar.min = 0;
        xpBar.max = 100;
        xpBar.value = totalXp;
      } else if (totalXp >= 100 && totalXp <= 249) {
        xpBar.min = 100;
        xpBar.max = 250;
        xpBar.value = totalXp;
      } else if (totalXp >= 250 && totalXp <= 499) {
        xpBar.min = 250;
        xpBar.max = 500;
        xpBar.value = totalXp;
      } else if (totalXp >= 500 && totalXp <= 999) {
        xpBar.min = 500;
        xpBar.max = 1000;
        xpBar.value = totalXp;
      } else if (totalXp >= 1000) {
        xpBar.min = 1000;
        xpBar.max = 100000;
        xpBar.value = totalXp;
      }
    }
    let lvlDisplay = document.querySelector(".progress-bar");
    function setLevel() {
      if (totalXp >= 0 && totalXp <= 99) {
        lvlDisplay.textContent = "Level: 1";
      } else if (totalXp >= 100 && totalXp <= 249) {
        lvlDisplay.textContent = "Level: 2";
      } else if (totalXp >= 250 && totalXp <= 499) {
        lvlDisplay.textContent = "Level: 3";
      } else if (totalXp >= 500 && totalXp <= 999) {
        lvlDisplay.textContent = "Level: 4";
      } else if (totalXp >= 1000) {
        lvlDisplay.textContent = "Level: 5";
      }
    }
    let playerIcon = document.querySelector("#player-icon");
    function setIcon() {
      if (totalXp >= 0 && totalXp <= 99) {
        playerIcon.style.width = "75px";
        playerIcon.style.height = "75px";
        playerIcon.style.backgroundImage = "url('./assets/Level-1.png')";
      } else if (totalXp >= 100 && totalXp <= 249) {
        playerIcon.style.width = "75px";
        playerIcon.style.height = "75px";
        playerIcon.style.backgroundImage = "url('./assets/level-2.png')";
      } else if (totalXp >= 250 && totalXp <= 499) {
        playerIcon.style.width = "75px";
        playerIcon.style.height = "75px";
        playerIcon.style.backgroundImage = "url('./assets/level-3.png')";
      } else if (totalXp >= 500 && totalXp <= 999) {
        playerIcon.style.width = "75px";
        playerIcon.style.height = "75px";
        playerIcon.style.backgroundImage = "url('./assets/level-4.png')";
      } else if (totalXp >= 1000) {
        playerIcon.style.width = "75px";
        playerIcon.style.height = "75px";
        playerIcon.style.backgroundImage = "url('./assets/level-5.png')";
      }
    }
    setIcon();
    setLevel();
    setXpBoundary();
    return totalXp;
  } catch (err) {
    console.error("Error querying the database:", err);
  }
  return 0;
};
// Call the function to calculate total XP
getLevel();
