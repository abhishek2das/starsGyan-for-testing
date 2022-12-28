
 import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
 import { getFirestore, collection, getDocs,addDoc,setDoc ,doc,getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
 import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

  var textDesc = document.querySelector("#discText");
  var progress_bar = document.querySelector(".progress-bar");
  var fileText = document.querySelector("#file-input");
  var ShowVideo = document.querySelector(".ShowVideo");
  var videoTitle = document.querySelector("#videoTitle");
  var showVideoCon = document.querySelector(".showAllreels");
  var lengthChange = document.querySelector(".lengthChange");

  const firebaseConfig = {
    apiKey: "AIzaSyApcFNQvrjBjXbAcdI96u5V1xIG8g70wPA",
    authDomain: "starsgyandev.firebaseapp.com",
    databaseURL: "https://starsgyandev-default-rtdb.firebaseio.com",
    projectId: "starsgyandev",
    storageBucket: "starsgyandev.appspot.com",
    messagingSenderId: "492865356732",
    appId: "1:492865356732:web:91770e95b251a3a4e0e1b9",
    measurementId: "G-FCX2B4NXST"
    };
 
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   const auth = getAuth(app);
   const provider = new GoogleAuthProvider(app);

   firebase.app
     window.uploadData = function(){sendDataToDb()}
     getUsersData()
     async function sendDataToDb(){

       try {
        $(".successUploading").hide();
        $(".successUpload").show()
         const UsrRef = doc(db, "Astro","502");
         await addDoc(collection(UsrRef,"data"), {
             user:"502",
             link:localStorage.getItem("URL"),
             video_desc:textDesc.value,
             likeCount:0
           });

           finalSet()
     } catch (e) {console.log("somting went wrong")} 
     }
 
     function finalSet(){
       $(".successUpload").hide()
       $('.modal').modal('hide');
       $(".secondPages").hide()
       $(".thirdPages").hide()
       $(".firstPages").show()
       $(".FourPage ").show() 
       $(".uploadBtn").hide()
       $(".backBtn").hide()
       $(".nextBtn").show()
       progress_bar.style.width = 0;
       progress_bar.innerHTML = ""
       ShowVideo.innerHTML ="";
       videoTitle.innerHTML="";
       fileText.value = "";
       textDesc.value = "";
       localStorage.removeItem("URL");
       lengthChange.innerHTML = 0;
      }
      
      
       async function getUsersData() {
       const userDataDoc =  doc(db, 'Astro',"l6HfhbgGCSbgwt9yfVmq0Zooepx2");
       const userCol =  collection(userDataDoc,"data");
       const userSnapshot = await getDocs(userCol);
       const userList = userSnapshot.docs.map(doc=>doc.data())
        
       userList.forEach(e => {
          
          showVideoCon.innerHTML += showVideoCon.innerHTML = `<div class="row ">
          <video autoplay loop muted style="width: 30%;margin: 0% 35%;">
           <source src="${e.link}" type="video/mp4">
           </video>
          </div>`
         });

       }

      
       
     async function getDocsNow(){
       // const userDataDoc =  collection(db, 'Astro');
       // const userSnapshot = await getDocs(userDataDoc);
       // // const userList = userSnapshot.docs.map(doc=>doc.data())
       // console.log(userSnapshot.length)
       // userSnapshot.forEach((doc)=>{
       // console.log("qwertyu"+doc.id, " => ", doc.data());
       // });
       

     
       var leadsRef = firebase.database;
      
      }
    //   getDocsNow()

    
    // if (typeof (Storage) !== "undefined") {

        // if (localStorage.OnceLogIn == "true") {

          console.log(localStorage.OnceLogIn)
          let dataArray = localStorage.logData
          dataArray = JSON.parse(dataArray)

          eMail = dataArray.Email;
          pName = dataArray.profileName;
          uTokken = dataArray.unicTokken;
          pPic = dataArray.profilePic;
          fId = dataArray.UserId;
          myproName = dataArray.profileName
          youAreLogedIn = true;
          dataSaveRequest()
          sideFireTost.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })

          youAreLogedIn = true;
        // } else {
           function login() {
            // sign in with popup tab

            const logIn = signInWithPopup(auth, provider)

              .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.


                const user = result.user;
                $("#feedsPagehide").slideDown(2000);
                $("#login").hide();
                $("#signOut").show();
                myProPic = user.photoURL;
                document.querySelector(".proImg").innerHTML = `<img src="${user.photoURL}" class="imagePro">`;
                document.querySelector(".profName").innerHTML = `${user.displayName}`;
                document.querySelector(".usId").innerHTML = `<img src="${user.photoURL}" class="usIdI">`;

                eMail = user.email;
                pName = user.displayName;
                uTokken = token;
                pPic = user.photoURL;
                fId = user.uid;
                myproName = user.displayName
                dId = UniqId();
                dataSaveRequest()
                youAreLogedIn = true;
                sideFireTost.fire({
                  icon: 'success',
                  title: 'Signed in successfully'
                })

                let LogInData = {
                  "Email": eMail,
                  "profileName": pName,
                  "unicTokken": uTokken,
                  "profilePic": pPic,
                  "UserId": fId,
                  "dId": dId,
                  "profileName": myproName
                }
                localStorage.setItem("logData", JSON.stringify(LogInData));
                localStorage.setItem("OnceLogIn", true)
                $(".mainHideShow").hide()
                $(".mainHideShow1").fadeIn(200)
                $('.hideFoot').hide()
              })

              .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                Swal.fire({
                  title: 'Somthing Went Wrong',
                  text: errorMessage,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 're Login'
                }).then((result) => {
                  if (result.isConfirmed) {
                    document.getElementById("login").click();
                  } else if (result.isDenied) {
                    location.assign("../index.html");
                  }
                })

                youAreLogedIn = false;

              });
          });
        // }

    //   } else {
        // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";


    //   }

      $("#signOut").click(() => {
        signOut(auth)
          .then(() => {
            // alert('Sign-out successful.')

            localStorage.removeItem("apiId");

            localStorage.setItem("OnceLogIn", false)
            document.querySelector(".proImg").innerHTML = '<img src="./image/favicon.jpeg" class="imagePro">';
            document.querySelector(".profName").innerHTML = `StarsGyan`;
            document.querySelector(".usId").innerHTML = `<img src="./image/favicon.jpeg" class="usIdI">`;
            $("#feedsPagehide").hide()
            $("#login").show();
            $("#signOut").hide();
            document.getElementById("contentAria").innerHTML = "";
            apiId = "";
            page = 0;
            youAreLogedIn = false;
            $('.hideFoot').show()
            setTimeout(() => {
              location.assign("../index.html");
            }, 2000);
          })
          .catch((error) => {
            // An error happened.
          });
      });

      async function dataSaveRequest() {

        request = {
          email: eMail,
          name: pName,
          token: uTokken,
          picture: pPic,
          uId: fId,
          deviceToken: dId,
        };

        // console.log(request)
        $.ajax({

          url: "https://api.starsgyan.com/StarsGyanAPIQA/api/user/login",
          type: "POST",
          contentType: "userLogin/json",
          data: JSON.stringify(request),

          success: function (data) {
            // $("#resultarea").text(data);
            // console.log(JSON.stringify(data));
            if (data.status == "user login") {
              // alert("loged in succesfuly")
              apiId = data.data.user_id
              // console.log(apiId)
              page = 1
              api()
            }
          },
          error: function (error) {
            // alert(`error = ${error} and ${request} `)
            // console.log(error)
          }
        });
      }

      $(document).ready(() => {
        $(`.variable slider`).slick({
          dots: false,
          prevArrow: false,
          nextArrow: false
        });
      });


      // $('#carouselExampleIndicators').carousel({
      //           interval: false

      //         })