/*The keydown event occurs when a keyboard key is pressed down.*/
$(document).keydown(function(event){
	var charCode = event.keyCode;
	var charStr = String.fromCharCode(charCode);
	
	// Prevent default for game keys to improve responsiveness
	if ([37, 38, 39, 40, 32, 65, 68, 87, 83].indexOf(charCode) !== -1) {
		event.preventDefault();
	}
	
	statusKeys[charCode] = true;
  
  // ESC key (27) for pause/resume
  if (charCode === 27) {
    if (typeof isPaused !== 'undefined') {
      if (isPaused) {
        resumeGame();
      } else {
        pauseGame();
      }
    }
  }
});

/* The keyup event occurs when a keyboard key is released. */
$(document).keyup(function(event){

	var charCode = event.keyCode;

	var charStr = String.fromCharCode(charCode);
	statusKeys[charCode] = false;
});
