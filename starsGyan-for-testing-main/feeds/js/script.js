////////////////////////////////////////////
let eMail = "";
let pName = "";
let uTokken = "";
let pPic = "";
let fId = "";
let dId = "";
let request = "";
///////////////////////////////////////////////
let youAreLogedIn = false;
let dataEnds = false; // to Check log in or Not
let page = 0; //Page Counter For api
let apiId = ""; //apiId
let myproName = ""; //proFile Name
let myProPic = ""; //proFile Pic
let postContant = ""; // for post content
let uid2 = ""; //for making a new id and sending a uniq id
let userArticalId = ""; // For artical id
let imagesArePoster = false;
let popUpisOpen = false;
// for Like //
let likeID = "";
let likeCoun = "";
let GreetingsCountId = "";
// for Like //

// for posting image //
let p = 0;
let multiImgF = [];
let forPost = [];
let i = 0;
let articalId = "";
let popUpId = "";
let showComment = "";
// for posting image //

//for post commet //
let commentValue = "";
let commentArticalId = "";
//for post commet //

// for reply on Comment //
let TextReplyVal = "";
let PostRId = "";
// for reply on Comment //

let imageUpload_id = [];
let mainPost_text = "";
let image_s = [];
// for edit post /////
let multiImgFPop = [];
let forPostPop = "";
let popArticalId = "";
let imageEdit = true;
// for edit post ends /////

let ArticalBlessing = "";
//for comment optinon
let commentOptionShow = true;
let listDataStore = [];
let commentListId = "";

$(".postP").click(() => {
  postContant = document.getElementById("postText").value;
  postContant = "";
});

const functionforBreak = function (stringPass, passNum) {
  stringPass = stringPass.slice(passNum);
  stringPass = parseInt(stringPass);
  return stringPass;
};

/// for scroll and hit api //////////////////////////////////////////////////////////////

window.addEventListener("scroll", () => {
  // setTimeout(() => {
    if (dataEnds == false) {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        page++;
        api();
      }
    } 
  // }, 1000);
});


/// for scroll and hit api //////////////////////////////////////////////////////////////

// api for loading posts ///////////////////////////////////////////////////////////////

async function api() {
  if (youAreLogedIn == true) {
    $.ajax({
      type: "GET",
      url: `http://api.starsgyan.com/StarsGyanAPIQA/api/article/${apiId}/getlist?page=${page}`,
      beforeSend: function () {
        $("#Loader").show();
      },
      success: function (data) {
        $("#Loader").hide();
        if (data.data.length === 0) {
          // alert("no data avelable")
          $(".hideFoot").show();
          dataEnds = true;
        }
        const l = data.data.length; // checking the length of the data
        for (x = 0; x < l; x++) {
          y = x + 1;
          k = "";
          k1 = "";
          imgG = "";
          lCount = "";
          (threeLine = ""),
            (threeLinePop = ""),
            (likeOrNot = data.data[x].user_liked);
          deleteAndEdit = "";
          deleteAndEditPop = "";
          let imageH;
          let imagep = "";
          let imagesArePresent = "";
          let imagesArePresentPop = "";
          if (data.data[x].user_id == apiId) {
            threeLine = `<img src="./image/3line multipal.svg" alt="threeLine" class="threeLineD " id="three_Line${data.data[x].id}" onmouseover="threeLineDrow(this.id)">`;
            threeLinePop = ` <img src="./image/3line multipal.svg"  class="threeLineD " id="three_Line_Pop${data.data[x].id}" onmouseover="threeLineDrowPop(this.id)">`;
          } else {
            threeLine = "";
            threeLinePop = "";
          }
          // condition for like or not ////
          if (likeOrNot == 1) {
            lCount = 1;
          } else {
            lCount = 0;
          }
          // condition for like or not ends ////
          // for Conuting greeting //////////////////
          const GreetingsCountId = "GreetingsCount" + data.data[x].id;
          // for Conuting greeting //////////////////
          // console.log(data.data[x].images.length)
          if (data.data[x].images.length <= 1) {
            imagesArePresen = `<div  id="singleImagesShow${data.data[x].id}"></div>`;
            imagesArePresentPop = `<div  id="singleImagesShowPop${data.data[x].id}"></div>`;
          } else {
            imagesArePresen = ` <div id="carouselExampleIndicators${data.data[x].id}" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators" id="indicatorId${data.data[x].id}"></ol>
          <div class="carousel-inner" id="carouselDataId${data.data[x].id}"></div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators${data.data[x].id}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators${data.data[x].id}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
          </a>
          </div>`;

            imagesArePresentPop = ` <div id="carouselExampleIndicatorsPop${data.data[x].id}" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators" id="indicatorIdPop${data.data[x].id}"></ol>
          <div class="carousel-inner" id="carouselDataIdPop${data.data[x].id}"></div>
          <a class="carousel-control-prev" href="#carouselExampleIndicatorsPop${data.data[x].id}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicatorsPop${data.data[x].id}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
          </a>
          </div>`;
          }

          /////////////for image check ////////////////////////
          if (data.data[x].user_liked == 1) {
            imgG = "./image/Namaste_dark.png";
          } else {
            imgG = "./image/Namaste_light.png";
          }
          /////////////for image check ////////////////////////
          showHideRead = `.readM${data.data[x].id}`;
          textData = data.data[x].content;
          // console.log(textData)
          const counW = textData.length;
          // console.log(counW)
          if (counW >= 160) {
            textData = textData.trim();
            cutno = textData.slice(0, 160);
            cutno = `${cutno}<span id="readMoreShowPOp${data.data[x].id}" class="ReadMoreArt" onclick="ReadMoreClick(this.id)">...ReadMore</span>`;
          } else {
            cutno = data.data[x].content;
          }
          ///////// for image count id /////////////////////
          if (apiId == data.data[x].user_id) {
            for (count2 = 0; count2 < data.data[x].images.length; count2++) {
              deleteAndEdit = `<div class="lineInfo" id="line_Infos${data.data[x].id}" onfocusout="Lineinfo(this.id)">
              <div class="lineP1" id="EditPost${data.data[x].id}"  onclick="editArtical(this.id)" data-toggle="tooltip" data-placement="top" title="Edit Artical"><iconify-icon icon="akar-icons:edit" width="2.5em" height="2.5em"></iconify-icon></div>
              <div class="lineP2 imageID_${data.data[x].images[count2].id}" id="DeleteArticalId${data.data[x].id}" onclick="deleteArtical(this.id,this.className)" data-toggle="tooltip" data-placement="top" title="Delete Artical"><iconify-icon icon="ic:baseline-delete" width="2.5em" height="2.5em"></iconify-icon></div>
              </div>`;

              deleteAndEditPop = `<div class="lineInfoPop" id="line_Infos_pop${data.data[x].id}">
                <div class="linePopP1" id="EditPostPop${data.data[x].id}" onclick="editarticalpop(this.id)" data-toggle="tooltip" data-placement="top" title="Edit Artical"><iconify-icon icon="akar-icons:edit" width="2.5em" height="2.5em"></iconify-icon></div>
                <div class="linePopP2 ImageID_${data.data[x].images[count2].id}" id="DeleteArticalIdPop${data.data[x].id}" onclick="deleteArticalPop(this.id,this.className)" data-toggle="tooltip" data-placement="top" title="delete Artical"><iconify-icon icon="ic:baseline-delete" width="2.5em" height="2.5em"></iconify-icon></div>
                </div>`;
            }
          }
          ///////// for image count id /////////////////////

          document.getElementById("contentAria").innerHTML +=
            document.getElementById("contentAria").innerHTML = `
            <div class="articalB" articalCount="${y}" id="mainArtical${data.data[x].id}">
            <div class="row">
            <img src="${data.data[x].user_info.profilephoto}"  class="usIdIP">
            <p class="pName1">${data.data[x].user_info.name}</p>
            ${threeLine}
            </div>
            ${deleteAndEdit}
            <div class="wall_Img" id="imageChangeOnUpdateId${data.data[x].id}">
           ${imagesArePresen}
            </div> 
            <div>
            <p class="great1" ><span id="${GreetingsCountId}" class="${lCount}">${data.data[x].like_count}</span> Greet</p>
            </div>
            <div class="likeGreet row">
            <div id="art${data.data[x].id}" class="${likeOrNot}" onclick="reply_click(this.className,this.id)" data-toggle="tooltip" data-placement="top" title="Give Greetings">
            <div><img src="${imgG}" alt="likecount" class="namastel likeC${data.data[x].id}" id="namestaiImg${data.data[x].id}"></div>
            <div>
            <p class="likecount likeC${data.data[x].id}">Greet</p>
            </div>
            </div>
            <div id="goTocommentClass${data.data[x].id}" onclick="commentNow(this.id)" class="commentCss" data-toggle="tooltip" data-placement="top" title="Add Comment">
            <div><img src="./image/comment.png"  class="comment-i pop_up "></div>
            <div><p class="comment-p pop_up">Comment</p></div>
            </div>
            </div>
            <div class="feedCon">
            <p><span class="textChangeOnUpdate${data.data[x].id}">${cutno}</span></p>
            </div>
            <div class="viewComm userArtId${data.data[x].user_id}" id="${data.data[x].id} " onclick="openPopUp(this.id,this.className)" data-toggle="tooltip" data-placement="top" title="Click to See all comments and Reply">
            <p>view <span id="countComment${data.data[x].id}">${data.data[x].comment_count}</span> concerns and doubts</p>
            </div>
            <div class="row R-comm">
            <div><img src="${myProPic}"  class="commentPp"></div>
            <p class="c-Post" id="commIdCliCk${data.data[x].id}"   onclick="CommentID(this.id)" class="outerCommentButton">Add</p>
            <div class="commI commentBorder${data.data[x].id}" ><input type="text" class="textC" placeholder="Add Comment" id="commIdCon${data.data[x].id}" onkeyup="showCommentList(this.id)" onclick="commentInputClickec(this.id)"></div>
            <ul id="myCommentsList${data.data[x].id}" class="myUlCommList ">
           
            </ul>
            </div>
            </div>
            </div>
           <div style="margin-top:50px"></div>
            `;
          ////////////////////////////////////////////////////////////////////////////////
          document.getElementById("show_pop").innerHTML +=
            document.getElementById("show_pop").innerHTML = `
           <div class="popUpFeeds  PopUpMe${data.data[x].id} hideIt ">
           <div class="GoBack" onclick="GoBack()"> << Go Back </div>
           <div class = "secondpop">
           <div class="row">
           <img src="${data.data[x].user_info.profilephoto}" alt="profid" class="usIdIP">
           <p class="pName1">${data.data[x].user_info.name}</p>
           ${threeLinePop}
           </div>
           <div class="wall_Img">
          <div class="item">
          ${imagesArePresentPop}
          </div>
          </div>
          ${deleteAndEditPop}
          <div>
          <p class="great1"><span id="plike${GreetingsCountId}" class="${lCount}">${data.data[x].like_count}</span> Greetings</p>
          </div>
          <div class="likeGreet row">
          <div id="Pop${data.data[x].id}" class="${likeOrNot}" onclick="reply_click(this.className,this.id)">
          <div><img src="${imgG}"  class="namastel likeC${data.data[x].id}" id="namestaiImgPop${data.data[x].id}"></div>
          <div>
          <p class="likecount likeC${data.data[x].id}" >Greet</p>
          </div>
          </div>
          <div><img src="./image/comment.png"  class="comment-i commentCssPop" onclick="commentFocus()"></div>
          <div>
          <p class="comment-p commentCssPop" onclick="commentFocus()">Comment</p>
          </div>
          </div>
          <div class="feedCon">
          <p class="textChangeOnUpdate${data.data[x].id}">${data.data[x].content}</p>
          </div>
          <div class="row R-comm" >
          <div><img src="${myProPic}"  class="commentPp"></div>
          <div class="commI comment_select${data.data[x].id}"><input type="text" class="textC" placeholder="Add Comment" id="commIdConPop${data.data[x].id}"></div>
          <div>
          <p class="c-PostPop" id="commIdClickPop${data.data[x].id}" onclick="CommentIDPop(this.id)">Add</p>
          </div>
          </div>
          <div class="commentSec${data.data[x].id}"></div>
          <div style="height: 80px;width: 10px;"></div>
          </div>
          </div> `;
        }
        imageLoadfunctionFromApi();
      },
    });
  }
}
//  loading posts ends ///////////////////////////////////////////////////////////////////////
function imageLoadfunctionFromApi() {
  $.ajax({
    type: "GET",
    url: `http://api.starsgyan.com/StarsGyanAPIQA/api/article/${apiId}/getlist?page=${page}`,
    success: (data) => {
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].images.length == 0) {
          document.getElementById(`singleImagesShow${data.data[i].id}`).innerHTML += 
          document.getElementById(`singleImagesShow${data.data[i].id}`).innerHTML = 
          `<div><img src="./image/favicon.jpeg"  class="postImg1" ></div>`;

          document.getElementById(`singleImagesShowPop${data.data[i].id}`).innerHTML +=
           document.getElementById(`singleImagesShowPop${data.data[i].id}`).innerHTML =
            `<div><img src="./image/favicon.jpeg"  class="postImg1" ></div>`;
        } else {
          if (data.data[i].images.length <= 1) {
            document.getElementById(`singleImagesShow${data.data[i].id}`).innerHTML +=
            document.getElementById(`singleImagesShow${data.data[i].id}`).innerHTML =
             `<div><img src="${data.data[i].images[0].src}"  class="postImg1"></div>`;
            document.getElementById(`singleImagesShowPop${data.data[i].id}`).innerHTML += 
            document.getElementById(`singleImagesShowPop${data.data[i].id}`).innerHTML =
             `<div><img src="${data.data[i].images[0].src}"  class="postImg1"></div>`;
          } else {
            for (let x = 0; x < data.data[i].images.length; x++) {
              Addactiveclass = "";
              if (x == 0) {
                Addactiveclass = "active";
              } else {
                Addactiveclass = "";
              }
              document.getElementById(
                `indicatorId${data.data[i].id}`
              ).innerHTML += document.getElementById(
                `indicatorId${data.data[i].id}`
              ).innerHTML = `<li data-target="#carouselExampleIndicators${data.data[i].id}" data-slide-to="${x}"></li>`;

              document.getElementById(
                `carouselDataId${data.data[i].id}`
              ).innerHTML += document.getElementById(
                `carouselDataId${data.data[i].id}`
              ).innerHTML = `<div class="carousel-item ${Addactiveclass}">
                <img class="d-block w-100 postImg2" src="${data.data[i].images[x].src}" alt="${data.data[i].images[x].caption}">
                </div>`;

              document.getElementById(
                `indicatorIdPop${data.data[i].id}`
              ).innerHTML += document.getElementById(
                `indicatorIdPop${data.data[i].id}`
              ).innerHTML = `<li data-target="#carouselExampleIndicatorsPop${data.data[x].id}" data-slide-to="${x}"></li>`;

              document.getElementById(
                `carouselDataIdPop${data.data[i].id}`
              ).innerHTML += document.getElementById(
                `carouselDataIdPop${data.data[i].id}`
              ).innerHTML = `<div class="carousel-item ${Addactiveclass}">
                <img class="d-block w-100 postImg2" src="${data.data[i].images[x].src}" alt="${data.data[i].images[x].caption}">
                </div>`;

              document.getElementById("allSliderCall").innerHTML +=
                document.getElementById(
                  "allSliderCall"
                ).innerHTML = `$('#carouselExampleIndicators${data.data[i].id}').carousel({
                interval: 5000
              });`;

              document.getElementById("allSliderCallPop").innerHTML +=
                document.getElementById(
                  "allSliderCallPop"
                ).innerHTML = `$('#carouselExampleIndicators${data.data[i].id}').carousel({
                interval: 2000,
                touch:true
              });`;
            }
          }
        }
      }
    },
    error: (error) => {},
  });
}

function ReadMoreClick(elmId) {
  elmId = functionforBreak(elmId, 15);
  showPopUp = `.PopUpMe${elmId}`;
  showComment = `.commentSec${elmId}`;
  popUpId = showPopUp;
  $(showPopUp).show();
  $("body").css({ overflow: "hidden" });
  $(".BackgroundBlurNow").css({ filter: "blur(10px)" });

  $("#toTop").hide();
  articalId = elmId;
  showCommentFun();
}
$(".readM").click(() => {
  $(".readM").hide();
  // document.querySelector(".moreCon").innerHTML = `${cutno} `;
  // $(".readLess").show();
});

$(".UpImg").click(() => {
  $(".uploadImgH").show();
  $(".marginDiv").show();
  document.getElementById("imgInp").click();
});

// for  image show ///////////////////////////////////////////////////////////////////////////////////////
imgInp.onchange = (evt) => {
  const file = imgInp.files;

  if (file) {
    if (2000000 < file.size) {
      sideFireTost.fire({
        icon: "warning",
        title: `file is to big please select another image`,
      });
      document.querySelector("#imgInp").value = "";
    } else {
      for (let i = 0; i < file.length; i++) {
        img22 = URL.createObjectURL(file[i]);
        multiImgF[i] = img22;
        console.log(multiImgF);
        forPost[i] = file[i];
        console.log(forPost);
        document.querySelector(".image-show").innerHTML +=
          document.querySelector(
            ".image-show"
          ).innerHTML = `<img id="blah" src="${multiImgF[i]}" alt="your image" />`;
      }
    }
  }
};
$(".cancelBtn").click(() => {
  $(".uploadImgH").hide();
  multiImgF = [];
  forPost = [];
  document.querySelector(".image-show").innerHTML = "";
  document.querySelector("#imgInp").value = "";
});
// for  image show ////////////////////////////////////////////////////////////////////////////////////////

// for image slide //////////////////////////////////////////////////////////////////////////////////////

$(".UtG").click(() => {
  imageToGallry();
});

/// for ImageUpload in api ////////////////////////////////////////////////////////////////////////////////

async function imageToGallry() {
  // console.log(forPost)

  if (forPost == "") {
    sideFireTost.fire({
      icon: "warning",
      title: `chose the image first`,
    });
    setTimeout(() => {
      document.querySelector("#imgInp").click();
    }, 1000);
  } else {
    var frmdta = new FormData();

    for (let i = 0; i < forPost.length; i++) {
      frmdta.append("images[]", forPost[i]);
    }

    $.ajax({
      type: "POST",
      url: `http://api.starsgyan.com/StarsGyanAPIQA/api/gallery/${apiId}/upload`,
      contentType: "application/JSON",
      data: frmdta,
      cache: false,
      processData: false,
      contentType: false,
      beforeSend: function () {},
      success: function (data) {
        imageUpload_id = data.data;
        sideFireTost.fire({
          icon: "success",
          title: `${data.message}`,
        });
        $(".uploadImgH").hide();
        multiImgF = [];
        forPost = [];
        imagesArePoster = true;
      },
      error: function (error) {},
    });
  }
}

/// for ImageUpload in api /////////////////////////////////////////////////////////////////////////////////
// this for creating a new post ///////////////////////////////////////////////////////////////////////////
function main_post() {
  mainPost_text = document.querySelector("#postText").value;
  checkMail = EmialValidate(mainPost_text);
 valueForValid = phoneNumberParser(mainPost_text);

  image_s = imageUpload_id;
  if(checkMail == true){
    sideFireTost.fire({
      icon: "warning",
      title: `Email is Not allowed in post`,
    });
    // document.getElementById("#postText").value = "";
    document.getElementById("#postText").focus();
  }
else if(valueForValid == true){
  sideFireTost.fire({
    icon: "warning",
    title: `Phone number is Not allowed post`,
  });
  // document.querySelector("#postText").value =""
  document.getElementById("#postText").focus();

  mainPost_tex ="";
}
  else if (imagesArePoster == false) {
    sideFireTost.fire({
      icon: "warning",
      title: `please Upload Image First`,
    });
  } else if (mainPost_text == "") {
    sideFireTost.fire({
      icon: "warning",
      title: `please fill the content box`,
    });
    document.querySelector("#postText").focus();
  } else if (image_s == []) {
    sideFireTost.fire({
      icon: "warning",
      title: `please upload the image first`,
    });
    $(".uploadImgH").show();
  } else {
    creatNewArtical = {
      user: apiId,
      heading: "null",
      content: mainPost_text,
      images: image_s,
    };

    $.ajax({
      url: `http://api.starsgyan.com/StarsGyanAPIQA/api/article/${apiId}/create`,
      type: "POST",
      contentType: "commentReply/json",
      data: JSON.stringify(creatNewArtical),
      beforeSend: function () {
        // console.log("startLoader");
        // startLoader();
      },
      success: function (data) {
        sideFireTost.fire({
          icon: "success",
          title: `${data.message}`,
        });
        // stopLoader();
        location.reload();

      },
      error: function (data) {
        // console.log(data.message);
        sideFireTost.fire({
          icon: "warning",
          title: `Somting went wrong`,
        });
      },
    });
  }
}
const CreatPostDone = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
// this for creating a new post ends here //////////////////////////////////////////////////////////////////
/// on page start alert for logIn//////////////////////////////////////////////////////////////////////////
if(localStorage.OnceLogIn == "false"){
Swal.fire({
  icon: "warning",
  title: "log in First to view feeds ",
  showDenyButton: true,
  confirmButtonText: "okay!",
  denyButtonText: `i dont wont to login`,
}).then((result) => {
  if (result.isConfirmed) {
    document.getElementById("login").click();
  } else if (result.isDenied) {
    location.assign("../index.html");
  }
});
}
/// on page start alert for logIn //////////////////////////////////////////////////////////////////////////////

// api for like count //////////////////////////////////////////////////////////////////////////////////////////

async function likeSendToApi() {
  likeSend = {
    user: apiId,
    id: likeID,
    like: likeCoun,
  };
  $.ajax({
    url: `https://api.starsgyan.com/StarsGyanAPIQA/api/article/${apiId}/like`,
    type: "POST",
    contentType: "like/json",
    data: JSON.stringify(likeSend),

    success: function (data) {
      // console.log(JSON.stringify(data));
    },
    error: function (error) {
      // console.log(error);
    },
  });
}
// api for like count ///////////////////////////////////////////////////////////////////////////////////////////

// function for like ///////////////////////////////////////////////////////////////////////////////////////////

function reply_click(className, clicked_id) {
  clicked_id = functionforBreak(clicked_id, 3);
  GreetingsCountId = "";
  GreetingsCountId = `#GreetingsCount${clicked_id}`;
  lCounts = document.querySelector(GreetingsCountId).className;

  if (className == 0 && lCounts == 0) {
    GreetingsCountId = `#GreetingsCount${clicked_id}`;
    value = document.querySelector(GreetingsCountId).innerHTML;
    value = parseInt(value);
    // alert(value);
    value++;
    document.querySelector(GreetingsCountId).innerHTML = value;
    document.querySelector(`#plikeGreetingsCount${clicked_id}`).innerHTML =
      value;
    likeID = clicked_id;
    likeCoun = 1;
    document.getElementById(`namestaiImg${clicked_id}`).src =
      "./image/Namaste_dark.png";
    document.getElementById(`namestaiImgPop${clicked_id}`).src =
      "./image/Namaste_dark.png";
    document.querySelector(GreetingsCountId).className = 1;
    document.querySelector(`#Pop${clicked_id}`).className = 1;
    likeSendToApi();
  }
}
// function for like ////////////////////////////////////////////////////////////////////////////////////////////

// for generating a unic device number //////////////////////////////////////////////////////////////////////////

function UniqId() {
  var navigator_info = window.navigator;
  var screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  return uid;
}
// for generating a unic device number ///////////////////////////////////////////////////////////////////////////

///comment and comment reply show ///////////////////////////////////////////////////////////////////////////////

async function showCommentFun() {
  $.ajax({
    type: "GET",
    url: `https://api.starsgyan.com/StarsGyanAPIQA/api/comment/${apiId}/getlist/${articalId}`,
    beforeSend: function () {},
    success: function (allComent) {
      
      console.log(allComent)
      for (let c = 0; c < allComent.length; c++) {
        console.log(allComent[c])
    
        if(apiId ==  userArticalId && apiId !== allComent[c].user_id ){
          if(allComent[c].is_blessed == 0){
            ArticalBlessing = `<div id="tochangetheBlessColor${allComent[c].id}"><img src="./image/Aashirvaad-svg-01-01.png" class="blessingImg ForBlessCommentId${allComent[c].id} " id="blessOrNot${allComent[c].is_blessed}"  onclick="blessMe(this.id,this.className)"></img></div>`;
        }else if(allComent[c].is_blessed == 1){
            ArticalBlessing = `<div id="tochangetheBlessColor${allComent[c].id}"><img src="./image/Dark_Ashirvaad-svg-01-01.png  " class="blessingImg ForBlessCommentId${allComent[c].id}"  id="blessOrNot${allComent[c].is_blessed}" onclick="blessMe(this.id,this.className)"></img></div>`;
        }
        }else{
          if(allComent[c].is_blessed == 0){
            ArticalBlessing = "" 
            // `<div id="tochangetheBlessColor${allComent[c].id}"><img src="./image/Aashirvaad-svg-01-01.png" class="blessingImg ForBlessCommentId${allComent[c].id} " id="blessOrNot${allComent[c].is_blessed}"  onclick="blessMe(this.id,this.className)"></img></div>`;
          }else if(allComent[c].is_blessed == 1){
            ArticalBlessing = `<div id="tochangetheBlessColor${allComent[c].id}"><img src="./image/Dark_Ashirvaad-svg-01-01.png  " class="blessingImg ForBlessCommentId${allComent[c].id}"  id="blessOrNot${allComent[c].is_blessed}" onclick="blessMe(this.id,this.className)"></img></div>`;
        }
        }
          
 

        document.querySelector(showComment).innerHTML += document.querySelector(
          showComment
        ).innerHTML = `
          <div><img src="${allComent[c].user_info.profilephoto}"  class="userCommentPp"></div>
          <div class="txtComm">
          <p class="commName">${allComent[c].user_info.name}</p>
          <p >${allComent[c].content}</p>
          ${ArticalBlessing}

          </div>
          <div id="replyForComment${allComent[c].id}" style="display:none">
          <div class="row replyRowSHow">
          <div><img src="${myProPic}" class="replyProPic"></div>
          <div><input type="text" placeholder="Give Reply" id="replycommentTextId${allComent[c].id}" class="replycommentText"></div>
          <div class="replyPostBtn" id="replyPBtn${allComent[c].id}" onclick="ReplyFunc(this.id)">Post</div>
          </div>
          </div>
          <div class="commentReplay" id="replyArrow${allComent[c].id}" onclick="replyArrowFun(this.id)" ">
          <img src="./image/replyArrow.png" alt="replayArrow" style="width:22px" class="showReplBtnOver">
          <span style="color:#72002c;" class="showReplBtnOver">reply</span></div>
          <div onclick="showRFun(this.id)" id="showReplys${allComent[c].id}" class="viewReplyOfComment" ><--View ${allComent[c].reply.length} reply--></div>
          <div id="comment_repls${allComent[c].id}" style="display:none;" >
          </div>
        `;
        if (allComent[c].reply.length == 0) {
          showRpl = `#showReplys${allComent[c].id}`;
          $(showRpl).hide();
        }
        for (let cr = 0; cr < allComent[c].reply.length; cr++) {
          reply_com = `comment_repls${allComent[c].reply[cr].parent_comment_id}`;
          document.getElementById(reply_com).innerHTML +=
            document.getElementById(reply_com).innerHTML = `
          <div class="commentReplys">
          <div><img src="${allComent[c].reply[cr].user_info.profilephoto}" alt="" class="userCommentPp2"></div>
          <div class="txtComm2">
          <p class="commName2">${allComent[c].reply[cr].user_info.name}</p>
          <p>${allComent[c].reply[cr].content}</p>
          </div>
         `;
        }
      }
    },
  });
}
runTimer = 0;
function apihit(elmId) {
  if (commentListId !== elmId) {
    $.ajax({
      url: `https://api.starsgyan.com/StarsGyanAPIQA/api/astro_comment/${apiId}/getlist/1`,
      type: "GET",
      success: (data) => {
        if (data.message === "Comment not Found") {
          Swal.fire({
            icon: "info",
            title: data.message,
            confirmButtonText: "Ok",
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              document.getElementById(`commIdCon${elmId}`).disabled = true;
            }
            commentListId = elmId;
            commentOptionShow = false;
          });
        } else {
          // console.log(data)
          // listOfData = data
          commentOptionShow = false;
          for (let i = 0; i < data.length; i++) {
            listDataStore.unshift(data[i].content);
            // console.log(data[i].id)
            document.getElementById(`myCommentsList${elmId}`).innerHTML +=
              document.getElementById(`myCommentsList${elmId}`).innerHTML = `
         <li><a id="listid${data[i].id}" class="listClass${elmId}" onclick="listShowLi(this.id,this.className)">${data[i].content}</a></li>
        `;
            commentListId = elmId;
          }
          // console.log(listDataStore)
        }
      },
      error: (data) => {
        // console.log(data)
      },
    });
  }
}

function commentInputClickec(elmId) {
  elmId = functionforBreak(elmId, 9);
  apihit(elmId);
}

function showCommentList(elmId) {
  elmId = functionforBreak(elmId, 9);
  numberFinder = elmId;
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById(`commIdCon${elmId}`);
  filter = input.value.toUpperCase();
  ul = document.getElementById(`myCommentsList${elmId}`);
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  if (input == "") {
    commentOptionShow = true;
    apihit(elmId);
  }
}

function listShowLi(elmId, elmClass) {
  elmClass = functionforBreak(elmClass, 9);
  listContent = document.getElementById(elmId).innerHTML;
  document.getElementById(`commIdCon${elmClass}`).value = listContent;
  commentOptionShow = true;
  document.getElementById(`myCommentsList${elmClass}`).innerHTML = "";
}

function openPopUp(myPopId, elmClass) {
  elmClass = functionforBreak(elmClass, 18);
  userArticalId = elmClass;
  popUpId = `.PopUpMe${myPopId}`;
  showComment = `.commentSec${myPopId}`;
  $(popUpId).show();
  $("body").css({ overflow: "hidden" });
  $(".BackgroundBlurNow").css({ filter: "blur(10px)" });
  $("#toTop").hide();
  articalId = myPopId;
  showCommentFun();
  setTimeout(()=>{
    popUpisOpen = true; 
  },200)
}
function GoBack() {
  $(popUpId).hide();
  $("body").css({ overflow: "auto" });
  document.querySelector(showComment).innerHTML = "";
  $(".BackgroundBlurNow").css({ filter: "blur(0px)" });
  popUpisOpen = false; 
}
function showRFun(showReplyResult) {
  reply_result = functionforBreak(showReplyResult, 10);
  comment_repls1 = `#comment_repls${reply_result}`;
  $(comment_repls1).show();
  toHide = `#${showReplyResult}`;
  $(toHide).hide();
}
///comment and comment reply show Ends //////////////////////////////////////////////////////////////////////////////
// function getMobileNumber(text){
//   if(text.match(/\b[\d]{10}\b/g)){
//     return text.match(/\b[\d]{10}\b/g)
//   }
//   if(/\b[\d]{12}\b/g){
//     return text.match(/\+\b[\d]{12}\b/g)
//   }
//   // return text.match(/\+\b[\d]{12}\b/g);
// }
// comment for main screen starts //////////////////////////////////////////////////////////////////////////////////
function CommentID(Comment_Id) {
  Comment_Id = functionforBreak(Comment_Id, 11);
  commentValueId = `commIdCon${Comment_Id}`;
  commentArticalId = Comment_Id;
  showCommetPOp = `.commentSec${Comment_Id}`;
  countComment = `countComment${Comment_Id}`;
  commentValue = document.getElementById(commentValueId).value;

  checkNum = phoneNumberParser(commentValue);
  checkMail = EmialValidate( commentValue);
  // console.log(commentValue)
 
  // let goAhead = "";
  // // checkNumber(commentValue)
  // for (let i = 0; i < listDataStore.length; i++) {
  //   if (commentValue === listDataStore[i]) {
  //     goAhead = true;
  //     break;
  //   } else {
  //     goAhead = false;
  //     commentOptionShow = true;
  //   }
  // }
  if(checkMail == true){
  sideFireTost.fire({
    icon: "warning",
    title: `This comment does not meet community guidelines`,
  });
  document.getElementById(commentValueId).value = "";
  document.getElementById(commentValueId).focus();
}
  else if (checkNum == true) {
    sideFireTost.fire({
      icon: "warning",
      title: `This comment does not meet community guidelines`,
    });
    document.getElementById(commentValueId).value = "";
    document.getElementById(commentValueId).focus();
  } 
  // if (goAhead == false) {
  //   document.getElementById(commentValueId).value = "";
  //   sideFireTost.fire({
  //     icon: "error",
  //     title: "please select Comment",
  //   });
  //   commentOptionShow = true;
  // }
  else if (commentValue == "") {
    sideFireTost.fire({
      icon: "error",
      title: "comment is epmty",
    });
  } else {
    // console.log(commentValue)
    document.getElementById(commentValueId).focus();

    document.getElementById(commentValueId).value = "";
    countCommentText = document.getElementById(countComment).innerHTML;
    countCommentText = parseInt(countCommentText);
    countCommentText++;
    document.getElementById(countComment).innerHTML = countCommentText;
    sendCommetToApi();
  }
}
// comment for main screen ends ///////////////////////////////////////////////////////////////////////////////////

// comment for main pop starts ///////////////////////////////////////////////////////////////////////////////////

function CommentIDPop(Comment_Pop_Id) {
  Comment_Pop_Id = functionforBreak(Comment_Pop_Id, 14);
  commentArticalId = Comment_Pop_Id;
  commentValuePopId = `commIdConPop${Comment_Pop_Id}`;
  showCommetPOp = `.commentSec${Comment_Pop_Id}`;
  commentValue = document.getElementById(commentValuePopId).value;
  countComment = `countComment${Comment_Pop_Id}`;

  checkNum = phoneNumberParser(commentValue);
  checkMail = EmialValidate( commentValue);
  if(checkMail == true){
    sideFireTost.fire({
      icon: "error",
      title: `Email is not allowed in comment`,
    });
    // document.getElementById(commentValuePopId).value = "";
    document.getElementById(commentValuePopId).focus();
  } else if (checkNum == true) {
    sideFireTost.fire({
      icon: "warning",
      title: `Phone number is Not allowed in comment`,
    });
    // document.getElementById(commentValuePopId).value = "";
    document.getElementById(commentValuePopId).focus();
  } 
  else if (commentValue == "") {
    sideFireTost.fire({
      icon: "warning",
      title: `comment is epmty`,
    });
    document.getElementById(commentValuePopId).focus();
    commentOptionShow = true;
  } else {
    document.querySelector(showCommetPOp).innerHTML += document.querySelector(
      showCommetPOp
    ).innerHTML = `
    <div><img src="${myProPic}"  class="userCommentPp"></div>
    <div class="txtComm">
    <p class="commName">${myproName}</p>
    <p >${commentValue}</p>
    </div>
    <div class="commentReplay"><img src="./image/replyArrow.png" alt="replayArrow" style="width:22px">
    <span style="color:#72002c;" >replay</span></div>
    </div>
  `;
    commentOptionShow = true;

    document.getElementById(commentValuePopId).value = "";
    countCommentText = document.getElementById(countComment).innerHTML;
    countCommentText = parseInt(countCommentText);
    countCommentText++;
    document.getElementById(countComment).innerHTML = countCommentText;
    sendCommetToApi();
  }
}
// comment for main pop ends //////////////////////////////////////////////////////////////////////////////////////
// reply for Comments /////////////////////////////////////////////////////////////////////////////////////////////
async function sendCommetToApi() {
  commetCont = {
    user: apiId,
    article_id: commentArticalId,
    content: commentValue,
  };
  $.ajax({
    url: `https://api.starsgyan.com/StarsGyanAPIQA/api/comment/${apiId}/create`,
    type: "POST",
    contentType: "comment/json",
    data: JSON.stringify(commetCont),
    success: function (data) {
      //  console.log(data)
    },
    error: function (error) {
      // console.log(error)
    },
  });
}
function replyArrowFun(ReplyAId) {
  reply_A_id = functionforBreak(ReplyAId, 10);
  replyForCommentId = `#replyForComment${reply_A_id}`;
  $(replyForCommentId).toggle(500);
}
function ReplyFunc(postReplyId) {
  PostRId = functionforBreak(postReplyId, 9);
  rTextId = `replycommentTextId${PostRId}`;
  TextReplyVal = document.getElementById(rTextId).value;
  showRply = `#comment_repls${PostRId}`;
 checkMail = EmialValidate(TextReplyVal);
  checkNum = phoneNumberParser(TextReplyVal);
if(checkMail == true){
  sideFireTost.fire({
    icon: "worning",
    title: `Email is not allowed in comment`,
  });
  // document.getElementById(rTextId).value = "";
  document.getElementById(rTextId).focus();
}
  else if (checkNum == true) {
    sideFireTost.fire({
      icon: "worning",
      title: `Phone number is not allowed in comment`,
    });
    // document.getElementById(rTextId).value = "";
    document.getElementById(rTextId).focus();
  }else if(TextReplyVal == ""){
    sideFireTost.fire({
      icon: "error",
      title: `The comment box epmty`,
    });
    document.getElementById(rTextId).value = "";
    document.getElementById(rTextId).focus();
  } else{
    document.querySelector(showRply).innerHTML +=
    document.querySelector(showRply).innerHTML = 
    `<div class="commentReplys">
    <div><img src="${myProPic}" alt="" class="userCommentPp2"></div>
    <div class="txtComm2">
    <p class="commName2">${myproName}</p>
    <p>${TextReplyVal}</p>
    </div>`;
    $(`#comment_repls${PostRId}`).show();
    sendReplyToComment();
  }

}
async function sendReplyToComment() {
  ReplyCommentS = {
    user: apiId,
    article_id: articalId,
    parent_comment_id: PostRId,
    content: TextReplyVal,
  };
  $.ajax({
    url: `https://api.starsgyan.com/StarsGyanAPIQA/api/comment/${apiId}/reply`,
    type: "POST",
    contentType: "commentReply/json",
    data: JSON.stringify(ReplyCommentS),
    success: function (data) {
      //  console.log(data)
      TextVal = document.getElementById(rTextId).value = "";
      $(`#replyForComment${PostRId}`).hide();
    },
    error: function (error) {
      // console.log(error);
    },
  });
}
// reply for Comments ends  ////////////////////////////////////////////////////////////////////////////////////////
const sideFireTost = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function threeLineDrow(elmId) {
  elmId = functionforBreak(elmId, 10);
  idToShow = `#line_Infos${elmId}`;
  $(idToShow).toggle();
  setTimeout(() => {
    $(idToShow).hide();
  }, 5000);
}
function deleteArtical(deleteArt, elmClass) {
  deleteArt = functionforBreak(deleteArt, 15);
  elmClass = functionforBreak(elmClass, 15);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deletePostArt(deleteArt, elmClass);
      sideFireTost.fire({
        icon: "success",
        title: `Your Post has been deleted.`,
      });
    }
  });
}
async function deletePostArt(deleteArt, elmClass) {
  $.ajax({
    url: `http://api.starsgyan.com/StarsGyanAPIQA/api/article/gallery/${elmClass}/delete`,
    type: "GET",
    contentType: "deleteImage/JSON",
    success: (data) => {
      // console.log(data.message+"postDelete")
    },
  });

  $.ajax({
    url: `http://api.starsgyan.com/StarsGyanAPIQA/api/article/${apiId}/delete/${deleteArt}`,
    type: "GET",
    contentType: "deleteArtical/JSON",
    beforeSend: () => {
      // startLoader();
    },
    success: (data) => {
      // stopLoader();
      mainArtical = `#mainArtical${deleteArt}`;
      document.querySelector(mainArtical).innerHTML = "";
      sideFireTost.fire({
        icon: "success",
        title: `${data.message}`,
      });
    },
    error: (error) => {
      sideFireTost.fire({
        icon: "error",
        title: `somthing went wrong`,
      });
    },
  });
}
function threeLineDrowPop(elmId) {
  elmId = functionforBreak(elmId, 14);
  idToShow2 = `#line_Infos_pop${elmId}`;
  $(idToShow2).toggle();
  setTimeout(() => {
    $(idToShow2).hide();
  }, 5000);
}
function deleteArticalPop(deleteArt, elmClass) {
  deleteArt = functionforBreak(deleteArt, 18);
  elmClass = functionforBreak(elmClass, 15);
  // alert(elmClass)
  $(`.PopUpMe${deleteArt}`).hide();
  $("body").css({ overflow: "auto" });
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deletePostArt(deleteArt, elmClass);
      sideFireTost.fire({
        icon: "success",
        title: `Your Post has been deleted.`,
      });
    }
  });
}
/////////////this is for editing  Artical /////////////////////////////////////////////////////////////////////////
function articalUpdateCancel() {
  $(".PostEdit").hide();
  multiImgFPop = [];
  forPostPop = [];
  document.querySelector("#ImagShowForEdit").innerHTML = "";
  document.getElementById("EditPostCont").value = "";
  $(".PostEdit").hide();
  imageEdit = true;
}
function editArtical(elmId) {
  elmId = functionforBreak(elmId, 8);
  popArticalId = elmId;
  $(".PostEdit").show();
}
function editarticalpop(elmId) {
  popArticalId = functionforBreak(elmId, 11);
  $(".PostEdit").show();
  $(".popUpFeeds").css({ filter: "blur(10px)" });
}
function articalUserUpdat() {
  imageUploadForEdit();
}
imgInpEdit.onchange = (evt) => {
  const file = imgInpEdit.files[0];

  // console.log(file);
  // console.log(file.size);

  if (file) {
    if (2000000 < file.size) {
      sideFireTost.fire({
        icon: "warning",
        title: `file is to big please select another image`,
      });
      document.querySelector("#imgInp").value = "";
    } else {
      img22 = URL.createObjectURL(file);
      multiImgFPop[p] = img22;
      forPostPop[p] = file;
      p++;
      x = 0;
      document.querySelector(
        "#ImagShowForEdit"
      ).innerHTML = `<img class="imageForEditPost" src="${multiImgFPop[i]}" alt="your image" />`;
      i++;
      x++;
    }
  }
};
async function imageUploadForEdit() {
  if (document.getElementById("EditPostCont").value == "") {
    sideFireTost.fire({
      icon: "warning",
      title: `please fill the content`,
    });
  } else if (imageEdit == true) {
    var frmdta = new FormData();
    frmdta.append("images[]", forPostPop);

    $.ajax({
      type: "POST",
      url: `http://api.starsgyan.com/StarsGyanAPIQA/api/gallery/${apiId}/upload`,
      contentType: "application/JSON",
      data: frmdta,
      cache: false,
      processData: false,
      contentType: false,
      beforeSend: function (data) {
        console.log(data);
      },
      success: function (data) {
        imageUpload_id = data.data.images.id;
        sideFireTost.fire({
          icon: "success",
          title: `${data.message}`,
        });
        // stopLoader();
        articalEditUpdate(imageUpload_id);
        imageEdit = false;
      },
      error: function (error) {
        // console.log(error);
        // stopLoader();
      },
    });
  }
}
async function articalEditUpdate(imageId) {
  const contentPop = document.getElementById("EditPostCont").value;
  image_s[0] = imageUpload_id;
  UpdateArtical = {
    id: popArticalId,
    heading: "null",
    content: contentPop,
    images: image_s,
  };
  if (contentPop == "") {
    sideFireTost.fire({
      icon: "warning",
      title: `please fill the content`,
    });
  } else {
    $.ajax({
      type: "post",
      url: `http://api.starsgyan.com/StarsGyanAPIQA/api/article/${apiId}/update`,
      contentType: "articalUpdate/json",
      data: JSON.stringify(UpdateArtical),
      beforeSend: () => {
        // startLoader();
      },
      success: (data) => {
        sideFireTost.fire({
          icon: "success",
          title: `${data.message}`,
        });
        // document.querySelector(`.textChangeOnUpdate${popArticalId}`).innerHTML = contentPop
        // document.querySelector(`.imageChangeOnUpdate${popArticalId}`).src = multiImgFPop[0]
        // document.getElementById(`imageChangeOnUpdateId${popArticalId}`).innerHTML = `<img src="${multiImgFPop[0]}"  class="postImg2" ></img>`
        dataEnds = false;
        page = 0;
        api();
        multiImgFPop = [];
        forPostPop = [];
        document.querySelector("#ImagShowForEdit").innerHTML = "";
        document.getElementById("EditPostCont").value = "";
        $(".PostEdit").hide();
        imageEdit = true;
      },
      error: (error) => {
        sideFireTost.fire({
          icon: "error",
          title: `Somting went Wrong `,
        });
      },
    });
  }
}
/////////////this is for editing  Artical Ends  /////////////////////////////////////////////////////////////////////////
function blessMe(elmId, elmClass) {
  elmId = functionforBreak(elmId, 10);
  elmClass = functionforBreak(elmClass, 29);
  classForBlessChange = `#tochangetheBlessColor${elmClass}`;
  if (userArticalId == apiId) {
    if (elmId == 1) {
       blesed_or_Not = 0;
       document.querySelector(classForBlessChange).innerHTML = 
       `<img src="./image/Aashirvaad-svg-01-01.png" class="blessingImg ForBlessCommentId${elmClass} " id="blessOrNot0"  onclick="blessMe(this.id,this.className)"></img>`;
    //  console.log(0)
   } else if (elmId == 0) {
    blesed_or_Not = 1;
    document.querySelector(classForBlessChange).innerHTML = 
    `<img src="./image/Dark_Ashirvaad-svg-01-01.png" class="blessingImg ForBlessCommentId${elmClass}"  id="blessOrNot1" onclick="blessMe(this.id,this.className)"></img>`;
    // console.log(1)
  }
  SendblessingApi(blesed_or_Not, elmClass);
}
}

function SendblessingApi(blesed_or_Not, commentId) {
  blessingData = {
    id: commentId,
    bless: blesed_or_Not,
  };
  $.ajax({
    type: "POST",
    url: `http://api.starsgyan.com/StarsGyanAPIQA/api/comment/${apiId}/bless`,
    contentType: "blessing/json",
    data: JSON.stringify(blessingData),
    success: function (data) {
      sideFireTost.fire({
        icon: "success",
        title: `${data.message}`,
      });
    },
    error: function (error) {
      sideFireTost.fire({
        icon: "error",
        title: `${error}`,
      });
    },
  });
}
function commentNow(elmId) {
  elmId = functionforBreak(elmId, 16);
  classtoSelect = `#commIdCon${elmId}`;
  document.querySelector(`#commIdCon${elmId}`).focus();
  document.querySelector(`.commentBorder${elmId}`).style.border =
    "2px solid red";
  setTimeout(() => {
    document.querySelector(`.commentBorder${elmId}`).style.border = "";
  }, 3000);
}
function commentFocus() {
  commentBord = `.comment_select${articalId}`;
  commSelct = `#commIdConPop${articalId}`;
  document.querySelector(commSelct).focus();
  document.querySelector(commentBord).style.border = "2px solid red";
  setTimeout(() => {
    document.querySelector(commentBord).style.border = "";
  }, 3000);
}
/// last ends

// Instantiate the Bootstrap carousel
$("#carouselExampleIndicators1").carousel({
  interval: 5000,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
function EmialValidate(ElmVal) {
  EmailValidator = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
if ((ElmVal.match(EmailValidator))) {
  replaceText = ElmVal.match(EmailValidator)
  replaceText = ElmVal.replace(replaceText," ")
  return  true
} else {
  return false
}
}
function clickCheck(){
if(popUpisOpen == true){
  GoBack()
}
}