document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")
    const todolist = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [] // json.parse : It takes a text string and 
    // converts it back into live JavaScript code (objects or arrays)

    tasks.forEach(kaam => renderTasks(kaam));

    addTaskButton.addEventListener("click", () => {

//-------------------------------------------------------------------------- 

        const tasktest = todoInput.value.trim() //if somebody will 
        //put extra spaces at the end then by trim() we can remove that

        /*HERE whatever the user will type in the input box will be added
        when we will click on Add Task button and tasktest is just a
        variable name in which we are storing the texts entered by user*/
//________________________________________________________________________________

        if (tasktest === "") return; // iske anusaar agar bina input 
        //likhe agar koi directly Add Task wale button pe click kar deta hai to kuch nhi hoga


//-------------------------------------------------------------------------------------------------

        const newTask = {
            id: Date.now(), //time ke sath string change hone keliye
            text: tasktest, //tasktest ke paas jo text hai wo ab newTask ke andar chala gya hai
            completed: false
        }

//-------------------------------------------------------------------------------------------------------

        tasks.push(newTask)
        savetasks(); // ye local storage me save kar rha hai tasks ko kyuki sara texts inputs whi ja rha hai aur isko wha ke input clear karne se phle save kar lenge wrna input save input clear hone ke baad save hoga mtlb kuch nhi save hoga
        todoInput.value = "" //ab jo bhi type kiye thee wo input wale box me wo Add task button pe click karne ke baad nya task banane ke baad jo bhi likhe hai usko uss box se hatana bhi to padega na to isse ho jayega
        console.log(tasks); // ye bass jo bhi text input ho rha hai usko console me dekhne keliye likhe hai
        renderTasks(newTask) //this will immigiately add the new tasks without reloadin.......ye yha par isliye daale hai kyuki agar ye nhi rhega to tasks tb add ho rhe the jab hm page ko reload kar rhe hai thee 
    })

// ______________________________________________________________________________________________________________________________________________________________________________

    // ab data save to ho rha hai lekin wo show nhi ho rha hai hmlogo ko and DOM me to ab dekehenge ki wo kaise karenge

    function renderTasks(kaam) {
        //this will grab the task from the local storage, but at one time
        //it will take one of those task and will try to display that....ab ye task wo jo array hai jisme
        //mai sare task available hai jiska naam "tasks" hai

        //ab wo task lene ka process aise hai ki jaise hi page load hoga for the first time then ye 
        //local storage me khojega (jo ki hm enter kiye honge) then unn sare tasks ko lega and unn sab
        //ko tasks array me bhar dega and phir just uske baad hm ek method call karenge loop me 
        //taki sare task ko paas kar ske one by one and then it can just display it for me

        //summary : 
        /* as soon as the page loads .....i want to read from the local storage......grab all the task..
        ..store the task inside array "tasks".....and then immidiately after that i would love to run
        a loop....inside the loop i will read all the individual task from array "tasks".....and
        i would love to call my method on each of my task in rendertask so that it can acvtually go and render it
        */
// ------------------------------------------------------------------------------------------------------------------------------------

        const li = document.createElement('li')
        li.setAttribute('data-id', kaam.id) //doubt

// ----------------------------------------------------------------------------------------------------------------------------------------------

        if (tasks.completed) { li.classList.add("completed")} //doubt

        li.innerHTML = `<span> ${kaam.text}</span>
        <button>delete</button>
        `
// ----------------------------------------------------------------------------------------------------------------------------------------------

        li.addEventListener("click", (e) => {
            if (e.target.tagName === 'BUTTON') return;
            //now in other cases
            kaam.completed = !kaam.completed //doubt : what is it doing
            li.classList.toggle('completed')
            savetasks()
        })

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

        li.querySelector('button').addEventListener("click", (e) => {
            e.stopPropagation() //doubt
            tasks = tasks.filter(t => t.id !== kaam.id) //iske help se sirf whi element delete hoga jaha hm click kar rhe hai
            li.remove()
            savetasks()
        })

// ----------------------------------------------------------------------------------------------------------------------------------------

        todolist.appendChild(li) //todolist wala jo ul hai usme li ko bhej denge
    }

//_____________________________________________________________________________________________________________________________________________

    function savetasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks)) //json.stringify : It takes a JavaScript object or array and turns it into a generic text string
    }

})