import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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
    projectId: "demens-f3a19", //isse link kar diye hm jo firebase ke website pe jo project banaye thee usko jiska id tha "demens-f3a19"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const signup = document.getElementById("submitsignup")
signup.addEventListener('click', (event)=> {
    event.preventDefault()
})
