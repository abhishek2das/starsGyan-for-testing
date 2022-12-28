

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
  
  firebase.initializeApp(firebaseConfig)
  
   
  var fileText = document.querySelector("#file-input");
  var progress_bar = document.querySelector(".progress-bar");
  var showVideoCon = document.querySelector(".showAllreels");
  var videoTitle = document.querySelector("#videoTitle");
  var textTitle = document.querySelector("#captionText");
  var textDesc = document.querySelector("#discText");
  var ShowVideo = document.querySelector(".ShowVideo");
  var uploadData = document.querySelector("#uploadDatas");
  var lengthChange = document.querySelector(".lengthChange");
  var lengthIsOk = true;
  var fileName;
  var fileItem;
  
  function getFile(e){
    
    fileItem = e.target.files[0] 
    fileName = fileItem.name;
    videoTitle.innerHTML = "File Name:-" + fileName
  
  }


  function onNextClick(){
    if(lengthIsOk == true){
      try {
        let url =  URL.createObjectURL(fileItem)
        ShowVideo.innerHTML = `<video autoplay muted loop style="width: 50%;margin: 0% 25%;" >
        <source src="${url}" type="video/mp4">
     </video>
     <div class="videoDisc" >
    <p>${textDesc.value}</p></div>`
        $(".firstPages").hide()
        $(".secondPages").show()
        $(".backBtn").show()
       $(".nextBtn").hide()
       $(".uploadBtn").show()
      } catch (e) {
        if(textDesc.value ==""){
          alert("add the Video Discriton");
        }else{
          alert("attach the file")
        }
        
      }
    }else{
      alert("you exceed the word limit")
    }
  }
  function onGoBack(){
    $(".firstPages").show()
    $(".secondPages").hide()
    $(".backBtn").hide()
    $(".nextBtn").show()
    $(".uploadBtn").hide()
    lengthChange.innerHTML = 0
  }
 function onCancel(){
    let text = "Are sure you wont to cancel"
    if(confirm(text)== true){
      $('.modal').modal('hide');
      setTimeout(()=>{
        onGoBack()
        fileText.value = "";
        textDesc.value = "";
        ShowVideo.innerHTML ="";
        videoTitle.innerHTML="";
      },200)
    }
  }




$(document).ready(()=>{
new bootstrap.Modal('#firstModal', {
    backdrop: 'static',
    keyboard: false
  })
})

 function onUpload(){
  ShowVideo.innerHTML =""
  $(".successUploading").show();
  $(".thirdPages").show();
  $(".FourPage").hide()
  
  let storageRef = firebase.storage().ref("video/"+fileName);
  let uploadTask = storageRef.put(fileItem);
  uploadTask.on("State_changed",(snapshot)=>{
      percentValue = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
      progress_bar.innerHTML =  percentValue + "%"
      progress_bar.style.width =  percentValue +"%"
      
  },(error)=>{
     alert(error)
  },()=>{
  
      uploadTask.snapshot.ref.getDownloadURL().then((url)=>{

        if(url != ""){
            localStorage.setItem("URL",url);
            document.querySelector("#uploadDatas").click()
              showVideoCon.innerHTML += showVideoCon.innerHTML =`<div class="row ">
            <video autoplay loop controls style="width: 30%;margin: 0% 35%;">
                   <source src="${url}" type="video/mp4">
                </video>
            </div>`

          }
          
      })
  })
  
}

function lengthCheck(){
  lengthChange.innerHTML = textDesc.value.length
  if(textDesc.value.length > 200){
    lengthChange.style.color = "red";
    lengthIsOk = false;
  }else{
    lengthChange.style.color = "#130202bf";
    lengthIsOk = true;

  }
}
// var video = document.getElementById('video');

// function toggleMute(){
//   video.muted = !video.muted;
// }

// function selectAllData(){
//   firebase.database().ref('Astro').once('value',(e)=>{
//     console.log(e)
//   })
// }
// selectAllData()