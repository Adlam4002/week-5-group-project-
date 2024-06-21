# week-5-group-project

Alex, Daniel and Josh as a team will be creating a to-do-list app.

# Project name: TaskScape

## Render links: https://week-5-group-project-client.onrender.com

## Repo link: https://github.com/Adlam4002/week-5-group-project-

Team members: Alex , Daniel , Josh

# Project description:

A fun and interactive To-Do list app with RPG elements. In a charming pixelated style, this app turns your daily tasks into an adventure. Completing tasks earns you experience points (XP) and levels up your character. Each level unlocks new player icons, making your avatar cooler. This app helps you stay organized while adding a fun twist, making every task feel like an achievement in your RPG journey.

# Problem domain:

People often struggle to manage and prioritize their daily tasks effectively, and remembering all tasks without a systematic approach can lead to stress and missed deadlines. Balancing work, personal life, and other responsibilities can be challenging without a clear and organized way to visualize and update tasks as priorities change.

# User stories:

As a user I want to be able to a see a list of my pending tasks and completed tasks.
As a user I want to set a timer to have my task done by.
As a user I want to filter my tasks by category.
As a user i want to press a button to mark a task complete.

# Wireframe:

![](https://github.com/Adlam4002/week-5-group-project-/blob/main/client/assets/wireframe.jpg)

A list of any libraries, frameworks, or packages that your application requires in order to properly function:

- vite
- cors
- dotenv
- express
- pg

# Lighthouse report:

![](https://github.com/Adlam4002/week-5-group-project-/blob/main/client/assets/Lighthouse.PNG)

# Reflections

Our app demonstrates the use of both client-side and server-side code. Our client was initially created using Vite but we removed all content from the basic client it creates. We used HTML to craft a basic skeleton for our web client. This involved creating sections and div with IDs and classes that could be referred to in our JavaScript and CSS. We used CSS to further develop the skeleton and to produce a user-friendly and easily readable front end. Where possible we used darker background colours and images to ensure that our lightly coloured fonts stand out and are easy to read. Within the CSS we used media queries to ensure that the layout of our app is easy to use on a mobile device or a device with a large, wider screen. We then set up our server, we used the express packages express, cors, dotenv and pg. Using these packages enabled us to create a server that can access our database without issue. On our server, we created many endpoints each with its purpose. One was used to receive task data from our database so that we could display it on screen for the users. We made a post route so that when we collect data from our users in a form, we could then send that information to our database using SQL queries. We also created a patch route that allowed us to update the completion status of the tasks on the database, to change data in our database we once again used SQL queries, this was useful as we planned to allow the user to mark a task as complete and that data would change on our database for future use. We also allowed our users to change the completion status of the tasks back to incomplete to allow for users mistakenly marking their tasks as complete.
Ensure the application is fully responsive and works across modern browsers. The database we used was a Postgresql database created using Supabase. We set up the database using a seed file, in this file we accessed our database and, using SQL queries, created a table to store our data as well as some initial data to populate the database. In our client-side JavaScript, we used many asynchronous functions as we are utilising an external database and the data being sent/ received requires time to travel. Without using these functions our client would not work as our functions would try to run without the necessary data.

On the first day of the project, we sorted ourselves into teams and brainstormed ideas for our project. During this time, we created a discord server to act as a hub for our communications. We quickly settled on our app being a to-do list with an RPG style/theme. We then made a wireframe using Draw.io (this can be found on our repo) which showed a basic layout for our app and helped us to develop ideas for features we intended to include. As a team we defined a rough scope, at its heart, our app is a time-management tool that lets a user list and track tasks they want to complete and set a timeline for each task. We also outlined our idea of a minimum viable product. Our MVP needed to have two lists of tasks, one incomplete and one complete, which the user could see on the screen. We wanted the user to have access to a timer that would allow them to make sure they’re keeping on schedule while completing a task or, to set a time to begin a task. We wanted the user to be able to filter their tasks by the priority value they assigned to them. Finally, we wanted the users to be able to mark their tasks as complete by clicking a button located within each task. This MVP was created using user stories we created for the app. We then set up a Trello board to organise our tasks and help us to manage our time effectively.

As we had some time to start working on day 1, Alex set up the client, server, database, initial endpoints, tables, and created the function to create a working timer on the page. Daniel wrote a function to fetch task data from the database, then for each task that exists to create elements that allowed them to be displayed on screen for the users. He also created the function that would take data inputted by the user (in a form) and send that to the database to create a new element on our tasklist table. Josh styled our entire client, he created an accessible, well-structured layout that would allow us to easily separate our completed and incomplete tasks. He added borders and background images that helped to lock in our RPG theme. He also wrote CSS for virtually every element that would exist over the rest of the project.

Tuesday started with a brief team meeting discussing what we each achieved the day before and what task we would like to start working on for the rest of the day. After our stand-up meeting with Joe, we jumped back into our tasks I detailed exactly who did what on Monday but I will not continue to do this for the rest of this section as I believe that Monday demonstrated we all had a willingness to work together and contribute to the project collaboratively. As we worked we implemented new code for the timer as we needed to add a clearInterval to the reset button. We added the ability for users to filter their tasks by priority (the users assign this value when they create the task). Initially, we added only one filter but added a filter to the completed tasks too. Now we had the tasks being rendered on screen we added some more styling to the task boxes. We also continued to work on the styling for our app as we developed a better understanding of what we wanted as we continued to develop the app. We finished the day by discussing what we had completed, amending our Trello board and making sure we all had our local repos up to date. By the end of Tuesday, we were essentially done with an MVP.

Wednesday also started with a morning meeting followed by a stand-up with Joe. Then spent the morning working on the tasks we had been assigned. We added an automatic scroll to the bottom of the task div when a new task was created. We made certain aspects of the form required so that our tasks would be created with all necessary data. We created a new endpoint that would be used when we mark a task as completed, this allowed us to send a patch request to our server and change on value in a row (completion status). This allowed us to have separate lists rendered on screen for completed and incomplete tasks. Each task had a button that could be pressed to send a request to the database to mark it as complete. When this was done the task would be removed from the on-screen pending task list and would be generated on the completed list. We then added media queries to our styling so that users would have a good experience on both mobile devices and computers. As we now had more elements on screen than the day before we decided to change the format of our client to make using it feel more natural. We also changed what data would be fetched from the server and displayed as our desired format had changed over time. We formatted the date to be easily read by British users. We styled our form and all the buttons on the page. As our app was functioning as we intended we deployed it on render. Both the server and the client. We once again discussed what we had achieved during the day and made sure our local repo and the Trello board were up to date. We were very happy with our progress and discussed what we wanted to achieve the next day.

Thursday started the same as the previous days but this time the tasks were all stretch goals we wanted to implement in our app. We finalised all of our formatting ensuring our app looked exactly how we wanted it to. We also added a huge amount of Javascript to implement an xp value for each task, depending on their priority. We also added a level feature for the user so the more tasks they have completed the more xp, and therefore levels, they gained. We then decided to implement an xp bar to show the user how much progress they have made towards the next level. We also added a user icon that changes depending on the level of the user. At level 1 the user is a goblin, at level 2 they are a ranger, at level 3 they are a knight, at level 4 they are a king, and at level 5 they are a wizard. We settled on the final positioning for the timer, form and XP-related elements and implemented a small easter egg: when a small gif of a cat is clicked the background of the task boxes changes to an animated image. By around 3 o’clock we had pushed and merged our code into our final product and decided to spend the rest of the afternoon working on our presentation and README.

I found creating the timer fun. I decided to create it all using JS and add all content and styling to the elements as they were created by the function attached to the button. When I first created the timer pressing the button another time would create a new timer alongside the first one. This is what I expected but as they were created with the same IDs etc it broke the functionality of the timer. I decided that when the button was pressed again the timer should become hidden, but not deleted as we wanted the timer to continue running. I ended up achieving this by creating the timer on the first click and then all following clicks would swap the timer between display: grid and display: none. This resulted in a toggleable timer for the user.

I enjoyed styling css elements, Especially the easter egg i included for the user to find that swaps the background img of the task list Div. I also enjoyed learning about box-border img and playing with the values to adjust the border exactly how i wanted it. .Js was my biggest struggle, I managed to create and implement a working leveling system and with the help of pair programming me and my team managed to implement stretched features ontop including a scaling level bar. Overall I feel this project went really well due to my fantastic team, We all got on well and with our respective tasks and any hurdles we had we over came together helping each other reach our desired output 1 task at a time.

## References

icon images 2,3,4,5 from : https://x.com/LuizGdeMelo
icon image 1 from: https://itch.io/profile/chiwawa-games
flyingisland.gif - https://pixel-owl.itch.io  
app-background.png -https://edermunizz.itch.io/free-pixel-art-forest
logo.Png - Joshua Day - source me  
Dragonbun-itemBorder3.png - https://marimo.itch.io/
Dragonbun-ItemBorder36.png - https://marimo.itch.io/
fullbackground.jpg - https://brullov.itch.io/oak-woods
cat.gif - https://ninris.itch.io/cat-pixel-animation
