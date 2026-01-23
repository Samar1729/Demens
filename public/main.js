document.addEventListener('DOMContentLoaded', ()=>{
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const profileImg = document.getElementById('profileImg');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');

    const isloggedin = localStorage.getItem('loggedInUserId');
    const loggedInUserName = localStorage.getItem('loggedInUserName')

    if (isloggedin){
    loginBtn.classList.add('hidden');
    userProfile.classList.remove('hidden')
        if (loggedInUserName && userNameDisplay) {
            userNameDisplay.textContent = loggedInUserName;
        }
    }
    else {
    loginBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
    }

    profileImg.addEventListener('click', (e)=> {
    e.stopPropagation()
    dropdownMenu.classList.toggle('hidden')
    name.classList.add('name')
    })

    logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId')
    localStorage.removeItem('loggedInUserName')
    window.location.reload()
    })
})