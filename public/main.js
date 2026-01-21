document.addEventListener('DOMContentLoaded', ()=>{
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const profileImg = document.getElementById('profileImg');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    const isloggedin = localStorage.getItem('loggedInUserId');

    if (isloggedin){
    loginBtn.classList.add('hidden');
    userProfile.classList.remove('hidden')
    }
    else {
    loginBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
    }

    profileImg.addEventListener('click', (e)=> {
    e.stopPropagation()
    dropdownMenu.classList.toggle('hidden')
    })

    logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId')
    window.location.reload()
    })
})