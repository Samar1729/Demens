import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc,getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

//solving : error_msg : "Failed to resolve module specifier "firebase/app""

//cdn method use kar rha hu kar rha hu taaki simple rhe and bundler tool ka jhanjhat na rhe....and
// taaki live server me easily work kre without installing anything so rather than using firebase/app we are using this method
// aur mujhe abhi wo bundler tools and node modules se link karna nhi aata isliye

//done here

//solving : error_msg : "found two elements with non-uniques id "

//ye isliye aa rha tha kyuki 2 input fields ka id blank chhora hua tha html me jisko unique id naam de ke ye error remove ho gya

//done here

const firebaseConfig = {
    apiKey: "AIzaSyAPnHdq1yfptJH5YnC5jYbAAnn4-IzLsLk",
    authDomain: "demens-f3a19.firebaseapp.com",
    projectId: "demens-f3a19",
    storageBucket: "demens-f3a19.firebasestorage.app",
    messagingSenderId: "568440569915",
    appId: "1:568440569915:web:bc63994978e01078981c1e",
    measurementId: "G-5X5RVGQ7P3"
    // projectId: "demens-f3a19", //isse link kar diye hm jo firebase ke website pe jo project banaye thee usko jiska id tha "demens-f3a19"
};


const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId)
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0
    }, 5000)
}

const signup = document.getElementById("btn-create-account")
signup.addEventListener('click', (event) => {
    event.preventDefault()
    const name = document.getElementById("name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const userData = {
                email: email,
                name: name,
            }
            // const userName = userData.name 
            showMessage("account created successfully ", 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "login.html"
                })
                .catch((error) => {
                    console.error("error writing document", error);
                })
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address already exists !!!', 'signUpMessage')
            }
            else {
                showMessage('unable to create user', 'signUpMessage')
            }
        })
})


const signin = document.getElementById("submitSignIn")
signin.addEventListener('click', (event)=>{
    event.preventDefault()
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const auth = getAuth()

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is successfull', 'signInMessage')
        const user= userCredential.user
        localStorage.setItem('loggedInUserId', user.uid)
        // localStorage.setItem('loggedInUserName', userName)
        window.location.href='../../public/index.html'
    })
    .catch((error)=>{
        const errorCode = error.code
        console.log("Login error:",errorCode);
        
        if (errorCode==='auth/invalid-credential') {
            showMessage('Incorrect email/password', 'signInMessage');
        }
        else{
            showMessage('Account does not exist', 'signInMessage')
        }
    })
    
})
