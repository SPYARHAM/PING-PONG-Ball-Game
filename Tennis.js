    var canvas;
    var canvasContext;
    var ballX = 50;
    var ballSpeedX = 10;
    var ballY = 50;
    var ballSpeedY = 5;

    var paddle1Y = 250;
    var paddle2Y = 250;

    const PADDLE_THICKNESS = 10;
    const PADDLE_HEIGHT = 100;

    var player1Score = 0;
    var player2Score = 0;
    const winningScore = 5;

        function calculateMousePos(evt) {
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX =  evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            return {
                x:mouseX,
                y:mouseY
            };
        
        }

        window.onload = function() {
            canvas = document.getElementById('gameCanvas');
            canvasContext = canvas.getContext('2d');
            var framePerSecond = 30;
        setInterval( callBoth ,1000/framePerSecond);
        canvas.addEventListener('mousemove',
                            function(evt) {
                                var mousePos = calculateMousePos(evt);
                                paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
                            });
        
        }
        function ballReset() {
            if(player1Score >= winningScore || player2Score >= winningScore)
            {
                if(player1Score > player2Score)
                {
                    alert("BRAVO!! YOU WON THE GAME");
                    alert("Click To Continue")
                }
                else
                {
                    alert("YOU LOOSE!!!  TRY AGAIN")
                }
                player2Score = 0;
                player1Score = 0;
            
            }
            ballSpeedX = -ballSpeedX;
            ballX = canvas.width/2;
            ballY = canvas.height/2;
        }
        function computerMovement() {
                var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
                if(paddle2YCenter < ballY - 35) {
                    paddle2Y = paddle2Y + 6;
                } else if(paddle2YCenter > ballY + 35) {
                    paddle2Y = paddle2Y - 6;
                }
            }
        function callBoth() {
                        moveEverything();
                        drawEverything();
                            }
        function moveEverything() {
            computerMovement();
            ballX +=  ballSpeedX;
            ballY +=  ballSpeedY;
            if(ballX < 0)
            {
                if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;

                    var deltaY = ballY- (paddle1Y + PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY*0.35;
                }
                else {
                    player2Score ++;
                    ballReset();
                
                }
            
            }
            if(ballX >canvas.width) 
            {
                if(ballY >paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;
                    var deltaY = ballY- (paddle2Y + PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY*0.35;
                }
                else {
                    player1Score ++;
                    ballReset();
                
                }
            }
        
            if(ballY >canvas.height) 
            {
                ballSpeedY= -ballSpeedY;
            }
            if(ballY < 0)
            {
                ballSpeedY = -ballSpeedY;
            }
            function drawNet() {
                for(var i=0; i<canvas.height;i += 40) 
                {
                    canvasContext.fillStyle = 'white';
                    canvasContext.fillRect((canvas.width/2)-1,i,2,20);
                }
            }
        }

        function drawNet(){
            for(var i=5;i<=canvas.height;i+=40)
            {
                canvasContext.fillStyle = 'white';
            canvasContext.fillRect(canvas.width/2-1,i,2,20);
                                    }
        }
        function drawEverything() {
        
            canvasContext.fillStyle = 'black';
            canvasContext.fillRect(0,0,canvas.width,canvas.height);
            drawNet();
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(0,paddle1Y, PADDLE_THICKNESS,PADDLE_HEIGHT);
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(canvas.width - PADDLE_THICKNESS,paddle2Y, PADDLE_THICKNESS,PADDLE_HEIGHT);
            canvasContext.fillStyle = 'white';
            canvasContext.beginPath();
            canvasContext.arc(ballX,ballY,10,0,Math.PI*2,true);
            canvasContext.fill();
            canvasContext.fillText(player1Score,100,100);
            canvasContext.fillText(player2Score,canvas.width-100,100);
        }
