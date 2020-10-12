
window.onload = function(){
    
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var video = document.getElementById("video");
    var background = document.getElementById("container");
    var W = window.innerWidth;
    var H = window.innerHeight;
    var currentVideo = 100;
    
    var heading = document.getElementById("heading");
    
    //changes container background color to match video (since video rendering changes color slightly) -- should run everytime aspect ratio changes
    function run(){
        //gets the first frame of the video
        ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
        var frame = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
        //gets the color of the first pixel
        var color = "rgb("+ frame.data[0] +","+ frame.data[1]+","+frame.data[2]+")";
        background.style.backgroundColor = color;
    }
    
    function resizeCanvas(){
        W = window.innerWidth;
		H = window.innerHeight;
        var aspectRatio = W/H;
        console.log(aspectRatio);
        //changes to 2.4 by 1 aspect ratio
        if(aspectRatio >= 2.1 && currentVideo <= 16/9){
           video.src = "2.4-1.mp4";
            currentVideo = 2.1;
            heading.style.fontSize = "65px";
            console.log("changed to 2.4-1");
            run();
        }
        else if(aspectRatio >= 1.65 && aspectRatio < 2.1 && 
                (currentVideo <=1.65 || currentVideo >= 2.1)){
            video.src = "16-9.mp4";
            currentVideo = 16/9;
            heading.style.fontSize = "58px";
            console.log("changed to 16-9");
            run()
        }
        else if(aspectRatio >= 1.55 && aspectRatio < 1.65 &&
               (currentVideo <=1.55 || currentVideo >= 1.65)){
            video.src = "8-5.mp4";
            currentVideo = 8/5;
            heading.style.fontSize = "45px";
            console.log("changed to 8-5");
            run();
        }
        else if(aspectRatio >= 1.4 && aspectRatio < 1.55 &&
               (currentVideo <=1.4 || currentVideo >= 1.55)){
            video.src = "3-2.mp4";
            currentVideo = 3/2;
            heading.style.fontSize = "38px";
            console.log("changed to 3-2");
            run();
        }
        else if(aspectRatio >= 1.2 && aspectRatio < 1.4 &&
               (currentVideo <=1.2 || currentVideo >= 1.4)){
            video.src = "4-3.mp4";
            currentVideo = 4/3;
            heading.style.fontSize = "45px";
            console.log("changed to 4-3");
            run();
        }
        else if(aspectRatio >= 1 && aspectRatio < 1.2 &&
               (currentVideo <=1 || currentVideo >= 1.2)){
            video.src = "1-1.mp4";
            currentVideo = 1.1;
            heading.style.fontSize = "35px";
            console.log("changed to 1-1");
            run();
        }
        else if(aspectRatio <1 && currentVideo >= 1){
            video.src = "";
            currentVideo = 0;
            heading.style.fontSize = "11vw";
            console.log("got rid of video");
            run();
        }
    }
    
   // window.addEventListener("resize",resizeCanvas);
    
    
    
    
    
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    var textChange = document.getElementsByClassName("cycleText");
    var allWords = [];
    var allIntervals = [];
    var allCounters = [];
    var allCurrentWords = [];
    var allNextWords = [];
    var numChanges = 20;
    var changeSpeed = 20;
    var changeInterval = 2500;
    
    
    function cycleText(){
        //loops through all cycleText classes
        for(var i = 0; i < textChange.length; i++){
            allCurrentWords[i] = textChange[i].innerHTML; 
            var nextIndex = (allWords[i].indexOf(allCurrentWords[i]) + 1) % allWords[i].length;
            allNextWords[i] = allWords[i][nextIndex];  
        }
        
        //changes all elements of words that need to be changed
        var interval = setInterval(function(){
            for(var i=0; i < textChange.length;i++){
                var newRandString = "";
                //stops the cycle after certain amount of changes
                if(allCounters[i] >= numChanges){
                    clearInterval(interval);
                    textChange[i].innerHTML = allNextWords[i];
                    allCounters[i] = 0;
                    continue;
                }
                
                //ease into word appearing (letter by letter)
                else if(allCounters[i] >= numChanges - allNextWords[i].length){
                    var correctLetters = allCounters[i] - 
                                        (numChanges - allNextWords[i].length)
                    //fills in the correct letters
                    for(var j = 0; j<correctLetters; j++){
                        newRandString += allNextWords[i].charAt(j);
                    }
                    //fills in the rest of the text
                    for(var k = 0; k < allNextWords[i].length - correctLetters; k++ ){
                        newRandString += randomLetter();
                    }
                }
                
                //gets all random letters
                else{
                    for(var j =0; j < allCurrentWords[i].length; j++){
                        newRandString += randomLetter();
                    }
                }
                
                //changes the HTML
                textChange[i].innerHTML = newRandString;
                allCounters[i]++;
            }
        },1000/changeSpeed);
        
    }
       
    //creates an array of all words to cycle through for each class instance
    //then sets the display text to the first word
    function prepWords(){
        for(var i = 0; i < textChange.length; i++){
            allWords[i] = prepText(textChange[i]);
            textChange[i].innerHTML = allWords[i][0];
            allCounters[i] = 0;
        }
        console.log(allWords);
    }
    
    //takes a p tag with the wordss to cycle
    function prepText(element){
        var text = element.innerHTML;
        var words = text.split(",");
        for(var i = 0; i < words.length; i++){
            words[i] = words[i].trim();
        }
        return words;
    }
    
    //gets a random letter
    function randomLetter(){
        return alphabet.charAt(Math.floor(Math.random() * 26));
    }

    
    function centerCycle(){
        if (window.innerWidth <= 768 ) {
            console.log("changed")
            heading.setAttribute("text-anchor", "middle") ;
            heading.setAttribute("x","50%") ;
        }
        else {
            heading.setAttribute("text-anchor", "start") ;
            heading.setAttribute("x","0%") ;
        }
    }

    centerCycle();
    window.addEventListener("resize", centerCycle);
          
    
    
    
    

    let timeTilStart = 1200
    var leftDoor = document.getElementById("leftDoor");
    var rightDoor = document.getElementById("rightDoor");
    var loader = document.getElementById("loader");
    
    function finishLoad(){
        window.scrollTo(0,0);
        leftDoor.style.left = "-50%";
        rightDoor.style.right = "-50%";
        loader.style.left = "-0%";
        leftDoor.style.opacity = "0";
        rightDoor.style.opacity = "0";
        loader.style.opacity = "0";
        setTimeout(function(){loader.style.webkitAnimationPlayState = "paused"},2000)
    }
    
    setTimeout(finishLoad, timeTilStart);
    
    


    
    //typing text
    let typingText = document.getElementsByClassName("typingText")[0];
    const sentence = typingText.innerText;
    let count = 0;
    function typeLetter (sentence) {
        let words = sentence.substring(0, count)
        typingText.innerText = words+"|";
        count++;
        if (count > sentence.length) {
            clearInterval(typeText);
            count = sentence.length;
        }
    }
    

    let typeText; 
    function startTyping(){
        typeText = setInterval(function(){
            typeLetter(sentence)
        }, 70);
    }
    
    //starts the typing after a few seconds
    setTimeout(startTyping, timeTilStart);

    //makes the | character blink
    setInterval(function(){
        if (count == sentence.length) {
            const newLocal = "\u00a0";
            if (typingText.innerText.charAt(typingText.innerText.length-1) == "|") {
                typingText.innerText = typingText.innerText.replace("|", newLocal);
            }
            else{
                typingText.innerText = typingText.innerText.replace(newLocal, "|");
            }
        }
    },800)
    
    
    

    let bubbles = document.getElementsByClassName("bubble");
    let language = document.getElementsByClassName("language");
    let framework = document.getElementsByClassName("framework");

    //sets the sizes of the bubbles
    function resizeBubble() {
        for (let i = 0; i < language.length; i++) {
            language[i].style.height = `${language[i].clientWidth}px`;
        }
        for (let i = 0; i < framework.length; i++) {
            framework[i].style.height = `${framework[i].clientWidth}px`;
        }
    }
    

    resizeBubble();
    window.addEventListener("resize", resizeBubble);


    let moreExperience = document.getElementById("moreExperience");

    let currentRotation = 0;
    function rotateCard(){
        let newRotation = (currentRotation==180) ? currentRotation -= 180 : currentRotation += 180;
        moreExperience.style.transform=`rotateY(${newRotation}deg)`;
    }

    moreExperience.addEventListener("click", rotateCard);


    let selection = document.getElementById("selection");
    let projectContainer = document.getElementById("projectContainer");
    let experienceContainer = document.getElementById("experienceContainer");
    let experienceCopy = document.getElementById("experienceCopy");
    let projectCopy = document.getElementById("projectCopy")

    let currentSelection = "experience";

    function changeSelection () {
        if (window.innerWidth < 816) {
            if (currentSelection == "experience") {
                selection.style.clipPath = "inset(50% 10% 0% 10% round 15px)"
                currentSelection = "project"
                projectContainer.style.opacity = "1"
                experienceContainer.style.opacity = "0"

                projectContainer.style.top = "300px"
                experienceContainer.style.top = "400px"

                projectContainer.style.zIndex = "10"
                experienceContainer.style.zIndex = "-1"

            }
            else{
                selection.style.clipPath = "inset(0% 10% 50% 10% round 15px)"
                currentSelection = "experience"
                projectContainer.style.opacity = "0"
                experienceContainer.style.opacity = "1"

                projectContainer.style.top = "400px"
                experienceContainer.style.top = "300px"

                projectContainer.style.zIndex = "-1"
                experienceContainer.style.zIndex = "10"
            }
            return
        }
        if (currentSelection == "experience") {
            selection.style.clipPath = "inset(0% 0% 0% 45% round 15px)"
            currentSelection = "project"
            projectContainer.style.opacity = "1"
            experienceContainer.style.opacity = "0"

            projectContainer.style.top = "300px"
            experienceContainer.style.top = "400px"

            projectContainer.style.zIndex = "10"
            experienceContainer.style.zIndex = "-1"
        }
        else{
            selection.style.clipPath = "inset(0% 60% 0% 0% round 15px)"
            currentSelection = "experience"
            projectContainer.style.opacity = "0"
            experienceContainer.style.opacity = "1"

            projectContainer.style.top = "400px"
            experienceContainer.style.top = "300px"

            projectContainer.style.zIndex = "-1"
            experienceContainer.style.zIndex = "10"
        }
    }

    function resizeSelection () {
        if (window.innerWidth < 816) {
            if (currentSelection == "experience") {
                selection.style.clipPath = "inset(0% 10% 50% 10% round 15px)"
            }
            else{
                selection.style.clipPath = "inset(50% 10% 0% 10% round 15px)"
            }
            return
        }
        if (currentSelection == "experience") {
            selection.style.clipPath = "inset(0% 60% 0% 0% round 15px)"
        }
        else{
            selection.style.clipPath = "inset(0% 0% 0% 45% round 15px)"
        }
    }
    window.addEventListener("resize", resizeSelection)
    experienceCopy.addEventListener("click", changeSelection);
    projectCopy.addEventListener("click", changeSelection);



    let email = document.getElementById("email");

    function changeEmail () {
        if (window.innerWidth <= 510) {
            email.innerText = "bensonvuong275"
        }
        else{
            email.innerText = "bensonvuong275@gmail.com"
        }
    }

    window.addEventListener("resize", changeEmail)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // run();
    // resizeCanvas();
    prepWords();
    setInterval(cycleText, changeInterval)
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //TEST
    
//    canvas.width = W;
//    canvas.height = H;
//    
//    ctx.fillStyle="rgba(101,124,142,1)";
//    ctx.fillRect(0,0,W,H);
//    
//    //count number of frames mousemove skipped
//    var counter = 0;
//    var counterAutoDraw = 1;
//    
//    //create gradient at mouse
//    function drawGradient(x1,y1,r1,x2,y2,r2){
//        
//        var gradient = ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);
//        
//        var energyColor = "rgba(66,201,255,";
//        
//        gradient.addColorStop(0.25, energyColor + "0.25)");
//        gradient.addColorStop(0.75, energyColor + "1)");
//        gradient.addColorStop(1, 'rgba(101,124,142,1)');
//        
//        ctx.fillStyle = gradient;
//        ctx.fillRect(x1-r2,y1-r2,2*r2,2*r2);
//    };
//    
//    
//    //keeps clearing canvas
//    
//    var increasing = true;
//       setInterval(function(){
//           ctx.fillStyle="rgba(101,124,142,0.05)";
//            ctx.fillRect(0,0,W,H);
//           if(increasing){
//              counterAutoDraw+=2;
//            }
//           else if(!increasing){
//                counterAutoDraw-=2;
//            }
//
//           drawGradient(0,H/2,1,0,H/2,counterAutoDraw);
//           drawGradient(W,H/2,1,W,H/2,counterAutoDraw);
//           
//           if(counterAutoDraw > W/1.8){
//              increasing = false;
//              }
//           if(counterAutoDraw < 2){
//              increasing = true;
//              }
//
//           console.log("R")
//       }, 1000/50);
    
    
    
}