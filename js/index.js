let npt = document.querySelectorAll("input");
let box=document.getElementById("box");
let signUp = document.getElementById("sign-up");
let signIn = document.getElementById("sign-in");
let inputName = document.getElementById("div-txt");
let nam = document.getElementById("text");
let ema = document.getElementById("email");
let pass = document.getElementById("pass");
let btnLogin = document.getElementById("login");
let btnSignUp = document.getElementById("signUp");
let ico = document.querySelectorAll(".parent-input i")
let req=document.getElementById("requored")
let exis=document.getElementById("exists")
let succ=document.getElementById("success")
let incorr = document.getElementById("incorrect")
let mess = document.querySelectorAll(".mes")
let logout=document.getElementById("logout")
let home = document.getElementById("home")
let spanName=document.getElementById("spanName")
let arrInput = Array.from(npt);
let lab = document.querySelectorAll("label");
let arrOfUsers = [];
for (let i = 0; i < arrInput.length; i++){
  arrInput[i].setAttribute("idx", i);
  arrInput[i].addEventListener("focus", function (e) {
    let idx = e.target.getAttribute("idx");
    lab[idx].style.cssText = `
    top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
  transition:0.3s`
    
  });
  arrInput[i].addEventListener("blur", function (e) {
    let idx = e.target.getAttribute("idx");
    if (e.target.value == "") {
      lab[idx].style.cssText = `
    top: 0;
    color:#fff;
    font-size: 16px;
    transition:0.3s;
    `;
    }

  });
  
}
//validation
function validName(nam) {
  return /^[a-zA-Z\s]{3,100}$/gm.test(nam);
}
function validEmail(eml) {
return /^[\w]+\@[a-zA-Z]+\.[a-zA-Z]+$/gm.test(eml);
}
function clearInp() {
  nam.value = "";
  ema.value = "";
  pass.value = "";
}
signUp.addEventListener("click", function () {
  signUp.classList.add("none");
  signIn.classList.remove("none");
  inputName.classList.remove("none");
  btnLogin.classList.add("none");
  btnSignUp.classList.remove("none");
  clearInp();
  messClear();
  for (let i = 0; i < arrInput.length; i++) {
    lab[i].style.cssText = `
    top: 0;
    color:#fff;
    font-size: 16px;
    `
  }
  nam.addEventListener("input", function () {
    if (validName(nam.value)) {
      ico[0].classList.remove("none");
      ico[1].classList.add("none");
    }
    else {
      ico[0].classList.add("none");
      ico[1].classList.remove("none");
    }
    if (nam.value == "") {
      ico[1].classList.add("none");
      ico[0].classList.add("none");
    }
  });
ema.addEventListener("input", function () {
        if (validEmail(ema.value)) {
          ico[2].classList.remove("none");
          ico[3].classList.add("none");
        }
        else {
          ico[2].classList.add("none");
          ico[3].classList.remove("none");
        }
        if (ema.value == "") {
          ico[2].classList.add("none");
          ico[3].classList.add("none");
        }
  });
})
btnSignUp.addEventListener("click", function () {
    if (nam.value == "" || ema.value == "" || pass.value == "") {
      messClear();
      req.classList.remove("none");
      return;
    }
    if (!validEmail(ema.value) || !validName(nam.value)) {
      messClear();
      incorr.classList.remove("none");
      return;
    } else {
      if (localStorage.getItem("users") == null) {
          succ.classList.remove("none");
          addArr();
          clearInp();
          icoClear();
          blureInput();
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 1500
          });
        return;
      }
      else {
        arrOfUsers=JSON.parse(localStorage.getItem("users"));
        let ch = 0;
        for (let i = 0; i < arrOfUsers.length; i++) {
          if (arrOfUsers[i].email == ema.value) {
            ch = 1;
            break;
          }
        }
        if (ch) {
          messClear();
          exis.classList.remove("none");
          return;
        } else {
          addArr();
          messClear();
          succ.classList.remove("none");
          clearInp();
          icoClear();
          blureInput();
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 1500
          });
          return;
        }
      }
    }
  })
signIn.addEventListener("click", function () {
  signUp.classList.remove("none");
  signIn.classList.add("none");
  inputName.classList.add("none");
  btnLogin.classList.remove("none");
  btnSignUp.classList.add("none");
  for (let i = 0; i < arrInput.length; i++) {
    lab[i].style.cssText = `
    top: 0;
    color:#fff;
    font-size: 16px;
    `
   }
   messClear();
  icoClear();
  clearInp();
    ema.addEventListener("input", function () {
      icoClear(); 
  });
})
function messClear() {
  mess.forEach(function (e) {
        e.classList.add("none");
   })
}
function icoClear() {
  ico.forEach(function (e) {
    e.classList.add("none");
   })
}
function addArr() {
  let obj = {
      name: nam.value,
      email: ema.value,
      password: pass.value
        }
        arrOfUsers.push(obj);
        localStorage.setItem("users",JSON.stringify(arrOfUsers));
}
function blureInput() {
  lab.forEach(function (e) {
    e.style.cssText = `
    top: 0;
    color:#fff;
    font-size: 16px;
    `
  })
}
btnLogin.addEventListener("click", function () {
  if (ema.value == "" || pass.value == "") {
    messClear();
    req.classList.remove("none");
  }
  else {
    if (localStorage.getItem("users") == null) {
      messClear();
      incorr.classList.remove("none")
    }
    else {
      arrOfUsers = JSON.parse(localStorage.getItem("users"));
    let ch = 0;
    let use = "";
    for (let i = 0; i < arrOfUsers.length; i++) {
      if (ema.value == arrOfUsers[i].email && pass.value == arrOfUsers[i].password) {
        ch = 1;
        use = arrOfUsers[i].name;
        break;
      }
    }
    if (ch) {
      spanName.innerHTML = use;
      box.classList.add("none");
      home.classList.remove("none");
    } else {
      messClear();
      incorr.classList.remove("none")
    }
    }
  }
})
logout.addEventListener("click", function () {
  box.classList.remove("none");
  home.classList.add("none");
  clearInp();
  blureInput();
  messClear();
});
