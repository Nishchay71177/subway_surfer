// Enhanced Visibility System
// This script adds visual indicators to help distinguish game objects

(function() {
  'use strict';

  // Create a canvas overlay for visual indicators
  let overlayCanvas;
  let overlayCtx;
  
  function initVisibilityHelper() {
    const gameCanvas = document.getElementById('glcanvas');
    if (!gameCanvas) return;
    
    // Create overlay canvas
    overlayCanvas = document.createElement('canvas');
    overlayCanvas.id = 'visibility-overlay';
    overlayCanvas.width = gameCanvas.width;
    overlayCanvas.height = gameCanvas.height;
    overlayCanvas.style.position = 'absolute';
    overlayCanvas.style.top = gameCanvas.offsetTop + 'px';
    overlayCanvas.style.left = gameCanvas.offsetLeft + 'px';
    overlayCanvas.style.pointerEvents = 'none';
    overlayCanvas.style.zIndex = '1';
    
    gameCanvas.parentElement.appendChild(overlayCanvas);
    overlayCtx = overlayCanvas.getContext('2d');
  }
  
  // Draw colored indicators
  function drawIndicators() {
    if (!overlayCtx) return;
    
    // Clear previous frame
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    // Overlay disabled - objects are now distinct enough without it
    // (Player size, coin texture, obstacle textures provide sufficient visibility)
  }
  
  // Initialize when game starts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisibilityHelper);
  } else {
    initVisibilityHelper();
  }
  
  // Update indicators regularly
  setInterval(drawIndicators, 100);
  
})();
