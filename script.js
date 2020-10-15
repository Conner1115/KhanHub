var actions = ["Home","About","Editor","Projects","Userguide","Credits"];
var themes = ["monokai","dawn","dracula","ambiance","eclipse","github","nord_dark","solarized_dark","solarized_light","terminal","twilight","xcode"];


var projectNames = [];
if(localStorage.getItem("names")){
  projectNames = JSON.parse(localStorage.getItem("names"));
}
var projectCodes = [];
if(localStorage.getItem("codes")){
  projectCodes = JSON.parse(localStorage.getItem("codes"));
}
var currentProject = -1;
if(localStorage.getItem("current")){
  currentProject = localStorage.getItem("current");
}

for(var i = 0; i < themes.length; i++){
  var s = document.createElement("script");
  s.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-"+themes[i]+".min.js");
  document.body.appendChild(s);
}
var $ = (prop) => document.querySelector(prop);
$("#project-title").innerHTML = projectNames[currentProject];
var editor = $("#editor");
var defaultWebpage = `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>New Webpage</title>
    </head>
    <body>
      
    </body>
  </html>
`;
editor.style.fontSize = "15px";
var e = ace.edit(editor,{
    mode: "ace/mode/html",
    selectionStyle: "text",
  value:defaultWebpage
});
e.setOptions({
    height:400,
    
});

if(currentProject === -1){
e.setValue(`<!--You haven't created any projects yet.
Go to the 'My Projects' section to make one.-->`);
}


$("#theme").addEventListener("change",function(){
  if($("#theme").value !== "default"){
  e.setTheme("ace/theme/"+$("#theme").value);
  }else{
  e.setTheme("none");
  }
});


function closeD(){
$("#code-deploy-parent").style.animation = "slideup 1s 1";
  $("#code-deploy-parent").style.animationFillMode = "forwards";
  $("#shadow-wall").style.display = "none";
}
function deploy(){
  $("#code-deploy-parent").style.animation = "slidedown 1s 1";
  $("#code-deploy-parent").style.animationFillMode = "forwards";
  $("#shadow-wall").style.display = "block";
  $("#code-deploy").innerHTML = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Live Website</title>
    </head>
    <body style = "width:100%;height:100%;position:absolute;top:0;left:0;margin:0;" onclick = "openWindow()">
    <h1 style = "width:400px;height:200px;position:absolute;top:50%;left:50%;margin-left:-200px;margin-top:-100px;text-align:center;">Click the screen please</h1>
      
&lt;script type = "application/javascript">
function openWindow(){
  var w = window.open();
  w.document.open();
  w.document.write(\`${e.getOption("value")}\`);
  w.document.close();
}
&lt;/script>
    </body>
  </html>`;
}
function closeNav(){
$("#nav-links").style.animation = "slideup 1s 1";
  $("#nav-links").style.animationFillMode = "forwards";
}
function openNav(){
  $("#nav-links").style.animation = "slidedown 1s 1";
  $("#nav-links").style.animationFillMode = "forwards";
}
function restart(){
  $("#preview").innerHTML = e.getOption("value");
}
function livePreview() {
  var w = window.open();
  w.document.open();
  w.document.write(e.getOption("value"));
  w.document.close();
}
function dropCreator(){
  $("#project-form").style.animation = "slidedown 1s 1";
  $("#project-form").style.animationFillMode = "forwards";
  $("#shadow-wall").style.display = "block";
}
function closeForm(){
  $("#project-form").style.animation = "slideup 1s 1";
  $("#project-form").style.animationFillMode = "forwards";
  $("#shadow-wall").style.display = "none";
}
function saveProject(){
  projectCodes[currentProject] = e.getOption("value");
  localStorage.setItem("codes",JSON.stringify(projectCodes));
  $("#save-p").innerHTML = "Saving...";
  $("#save-p").disabled = true;
  setTimeout(function(){
    $("#save-p").disabled = false;
    $("#save-p").innerHTML = "Saved!";
  },1000);
  setTimeout(function(){
    $("#save-p").innerHTML = "Save";
  },2000);
}
function openDel(){
  $("#delete-form").style.animation = "slidedown 1s 1";
  $("#delete-form").style.animationFillMode = "forwards";
  $("#shadow-wall").style.display = "block";
}
function closeDel(){
  $("#delete-form").style.animation = "slideup 1s 1";
  $("#delete-form").style.animationFillMode = "forwards";
  $("#shadow-wall").style.display = "none";
}


for(var i = 0; i < projectNames.length; i++){
  if(projectNames[i]){
  $("#project-wrapper").innerHTML+= `<div class = "project Editor-button project-${i}"><div class = "project-name">${projectNames[i]}</div></div>`;
  }
}


function showPage(page) {
  $("#project-title").innerHTML = projectNames[currentProject];
  window.scrollTo(0, 0);
  let pages = document.getElementsByClassName("page");
  for(var i = 0; i < pages.length; i++){
    pages[i].style.display = "none";
  }
  $("#trans-img").style.display = "block";
  $("#trans-img").style.animation = ("switchTrans 2s 1");
  setTimeout(function () {
    $("#" + page).style.display = "block";
    e.setValue(projectCodes[currentProject]);
  }, 1000);
  setTimeout(function () {
    $("#trans-img").style.animation = ("none");
    $("#trans-img").style.display = "none";
  }, 2000);
}
showPage("Home");

var setEditorCode = function(num){
  var I1 = document.querySelector(".project-"+num);
  I1.addEventListener("click",function(){
    e.setValue(projectCodes[num]);
    currentProject = num;
    localStorage.setItem("current",currentProject);
    showPage("Editor");
    
  });
};

for(var i = 0; i < projectNames.length; i++){
  setEditorCode(i);
}

function pushNewProject(){
  closeForm();
  if(projectNames.length < 5){
  projectNames.push($("#project-name").value);
    projectCodes.push(defaultWebpage);
    
    
 localStorage.setItem("codes",JSON.stringify(projectCodes)); localStorage.setItem("names",JSON.stringify(projectNames));
    $("#project-wrapper").innerHTML = "";
    for(var i = 0; i < projectNames.length; i++){
  if(projectNames[i]){
  $("#project-wrapper").innerHTML+= `<div class = "project Editor-button"><div class = "project-name project-${i}">${projectNames[i]}</div></div>`;
    currentProject = i;
  }
}
    for(var i = 0; i < projectNames.length; i++){
  setEditorCode(i);
}
  }else{
    alert("You can only have five projects.");
  }
  
}
function spliceProject(){
  closeDel();
  var prIndex = projectNames.indexOf($("#delete-name").value);
 if(prIndex !== -1){
  projectNames.splice(prIndex);
  projectCodes.splice(prIndex);
  localStorage.setItem("names",JSON.stringify(projectNames));
  localStorage.setItem("codes",JSON.stringify(projectCodes));
   $("#project-wrapper").innerHTML = "";
    for(var i = 0; i < projectNames.length; i++){
  if(projectNames[i]){
  $("#project-wrapper").innerHTML+= `<div class = "project Editor-button"><div class = "project-name project-${i}">${projectNames[i]}</div></div>`;
    currentProject = i;
  }
}
    for(var i = 0; i < projectNames.length; i++){
  setEditorCode(i);
}
 }else{
   alert("That project doesn't seem to exist.  Type the project name exactly character for character.");
 }
  
}

function showOnClick(num) {
  var buttonIndex = document.querySelectorAll("." + actions[num] + "-button");
  for(var i = 0; i < buttonIndex.length; i++){
    buttonIndex[i].addEventListener("click",function(){
    showPage(actions[num]);
    });
  }
}
for (var i = 0; i < actions.length; i++) {
  showOnClick(i);
}


//if(window.innerWidth < 950){
//$("#size-message").style.display = "block";
//}else{
  $("#size-message").style.display = "none";
//}
