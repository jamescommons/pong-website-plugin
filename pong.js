document.body.innerHTML += '<div><p style="font-size: 1000px;">&nbsp;</p></div><h1>pong lol</h1><div id="game-div"><p id="pong-prelude" class="tooltip"><span class="tooltiptext">Use "w" and "s" to move your paddle, and escape to pause</span></p><canvas id="pong-canvas" width="800" height="500"></canvas><style>.tooltip{position:relative;display:inline-block;border-bottom:1px dotted #000}.tooltip .tooltiptext{width:300px;background-color:#000;color:#fff;text-align:center;padding:5px 0;border-radius:6px;position:absolute;z-index:1;bottom:100%;left:50%;margin-left:-150px}.tooltip:hover .tooltiptext{visibility:visible}#game-div{display:grid;grid-template-columns:auto;justify-items:center;align-items:center;padding-bottom:45px;}#pong-prelude{grid-row:1;text-align:center;font-weight:400;cursor:pointer;padding-top: 20px}#pong-canvas{grid-row:2;border:1px solid #000;background-color:#000}#mute-button{cursor:pointer;text-decoration:underline;}</style><script>var playerScore=0,aiScore=0;const FPS=60,PLAYER_V=400/FPS,AI_V=340/FPS,BALL_V=450/FPS;var ballX=400,ballY=250,ballSlope=0,ballDirection=-1,playerY=225,aiY=225,running=!1,paused=!1,movingUp=!1,movingDown=!1,timer=null,frameCountdown=0,canvas=document.getElementById("pong-canvas"),pen=canvas.getContext("2d"),hitSound=new Audio("../audio/hit.wav"),missSound=new Audio("../audio/miss.wav"),mute=!1;function startScreen(){running=!1,canvas.addEventListener("click",(function e(l){l.offsetX>=325&&l.offsetX<=477&&l.offsetY>=220&&l.offsetY<=265&&(console.log("start"),canvas.removeEventListener("click",e),startGame())})),pen.clearRect(0,0,800,500),pen.fillStyle="#FFFFFF";for(let e=2;e<=500;e+=21)pen.fillRect(395,e,10,10);pen.fillRect(20,225,10,50),pen.fillRect(770,225,10,50),pen.font="30px Roboto Mono",pen.fillText(playerScore,185,50,100),pen.fillText(aiScore,575,50,100),pen.font="50px Roboto Mono",pen.fillStyle="#000000",pen.fillRect(340,217,200,50),pen.strokeStyle="#FFFFFF",pen.strokeRect(325,220,152,45),pen.fillStyle="#FFFFFF",pen.fillText("START",325,260,200)}function redrawGame(){pen.clearRect(0,0,800,500),pen.fillStyle="#FFFFFF";for(let e=2;e<=500;e+=21)pen.fillRect(395,e,10,10);pen.fillRect(20,playerY,10,50),pen.fillRect(770,aiY,10,50),pen.font="30px Roboto Mono",pen.fillText(playerScore,185,50,100),pen.fillText(aiScore,575,50,100),pen.beginPath(),pen.arc(ballX,ballY,10,0,2*Math.PI,!1),pen.fill()}function pauseScreen(){pen.clearRect(0,0,800,500),pen.fillStyle="#FFFFFF";for(let e=2;e<=500;e+=21)pen.fillRect(395,e,10,10);pen.fillRect(20,playerY,10,50),pen.fillRect(770,aiY,10,50),pen.font="30px Roboto Mono",pen.fillText(playerScore,185,50,100),pen.fillText(aiScore,575,50,100),pen.beginPath(),pen.arc(ballX,ballY,10,0,2*Math.PI,!1),pen.fill(),pen.font="50px Roboto Mono",pen.fillStyle="#000000",pen.fillRect(100,217,200,50),pen.strokeStyle="#FFFFFF",pen.strokeRect(100,220,182,45),pen.fillStyle="#FFFFFF",pen.fillText("RESUME",100,260,200),pen.font="50px Roboto Mono",pen.fillStyle="#000000",pen.fillRect(500,217,200,50),pen.strokeStyle="#FFFFFF",pen.strokeRect(500,220,202,45),pen.fillStyle="#FFFFFF",pen.fillText("END GAME",500,260,200),canvas.addEventListener("click",(function e(l){l.offsetX>=100&&l.offsetX<=282&&l.offsetY>=220&&l.offsetY<=265&&(console.log("resume"),canvas.removeEventListener("click",e),paused=!1,timer=setInterval(tick,1e3/FPS)),l.offsetX>=500&&l.offsetX<=702&&l.offsetY>=220&&l.offsetY<=265&&(console.log("end"),canvas.removeEventListener("click",e),paused=!1,document.removeEventListener("keydown",handleKeydown),document.removeEventListener("keyup",handleKeyup),startScreen())}))}function tick(){running||(clearInterval(timer),startScreen()),paused?(clearInterval(timer),pauseScreen()):(movingUp&&playerY>0&&(playerY-=PLAYER_V),movingDown&&playerY<450&&(playerY+=PLAYER_V),moveBall(),moveAI(),getCollisions(),ballX<-10&&(aiScore++,clearInterval(timer),initBall(),setTimeout((function(){timer=setInterval(tick,1e3/FPS)}),3e3),missSound.readyState!=HTMLMediaElement.HAVE_ENOUGH_DATA||mute||missSound.play()),ballX>810&&(playerScore++,clearInterval(timer),initBall(),setTimeout((function(){timer=setInterval(tick,1e3/FPS)}),3e3),missSound.readyState!=HTMLMediaElement.HAVE_ENOUGH_DATA||mute||missSound.play()),frameCountdown>0?frameCountdown--:(missSound.currentTime=0,hitSound.currentTime=0),redrawGame())}function initBall(){playerY=225,aiY=225,ballX=400,ballY=250,(ballSlope=.5*Math.random())<.1&&(ballSlope=.25),Math.random()>.5&&(ballSlope*=-1)}function moveBall(){let e=Math.sqrt(BALL_V*BALL_V/(ballSlope*ballSlope+1)),l=ballSlope*BALL_V;-1==ballDirection&&(ballX-=e,ballY-=l),1==ballDirection&&(ballX+=e,ballY-=l)}function moveAI(){1==ballDirection?(ballY<aiY-10&&aiY>0&&(aiY-=AI_V),ballY>aiY+10&&aiY<450&&(aiY+=AI_V)):(aiY<200&&(aiY+=AI_V),aiY>300&&(aiY-=AI_V))}function getCollisions(){(ballY<10||ballY>490)&&(ballSlope*=-1),frameCountdown<=0&&(ballX>20&&ballX<35&&(ballY>playerY+15&&ballY<playerY+35?(ballDirection*=-1,frameCountdown=10,hitSound.readyState!=HTMLMediaElement.HAVE_ENOUGH_DATA||mute||hitSound.play()):ballY>playerY-10&&ballY<playerY+60&&(ballDirection*=-1,ballSlope*=1.2,frameCountdown=10,hitSound.readyState!=HTMLMediaElement.HAVE_ENOUGH_DATA||mute||hitSound.play()),frameCountdown=10),ballX>765&&ballX<780&&(ballY>aiY+15&&ballY<aiY+35?(ballDirection*=-1,frameCountdown=10,hitSound.readyState!=HTMLMediaElement.HAVE_ENOUGH_DATA||mute||hitSound.play()):ballY>aiY-10&&ballY<aiY+60&&(ballDirection*=-1,ballSlope*=1.2,frameCountdown=10,hitSound.readyState!=HTMLMediaElement.HAVE_ENOUGH_DATA||mute||hitSound.play()),frameCountdown=10)),(ballSlope>1.2||ballSlope<-1.2)&&(ballSlope/=2)}function handleKeydown(e){"w"==e.key&&(movingUp=!0,movingDown=!1),"s"==e.key&&(movingDown=!0,movingUp=!1),"Escape"==e.key&&(paused=!0)}function handleKeyup(e){"w"==e.key&&(movingUp=!1),"s"==e.key&&(movingDown=!1)}function startGame(){document.addEventListener("keydown",handleKeydown),document.addEventListener("keyup",handleKeyup),playerScore=0,aiScore=0,ballDirection=-1,initBall(),running=!0,redrawGame(),setTimeout((function(){timer=setInterval(tick,1e3/FPS)}),3e3)}window.screen.availWidth/window.screen.availHeight<1?(pen.font="50px Roboto Mono",pen.fillStyle="#FFFFFF",pen.fillText("Sorry. Mobile not supported :(",50,260,400)):"ready"==document.readyState||"complete"==document.readyState?startScreen():document.addEventListener("readystatechange",(function(){"ready"!=document.readyState&&"complete"!=document.readyState||startScreen()}));</script></div>'