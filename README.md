# 3map
## A web-based projection mapping tool

3map uses node, PhantomJS, and THREE.js to allow users to do basic video-style projection mapping of webpages.

The server runs on nodejs; Phantom generates screenshots of an arbitrary webpage at a user-set interval. Then the user creates source regions (defining areas of the flat webpage) and output regions which can be moved, rotated, and scaled in 3D using WebGL.

To run:

1. Set the page you want to load in app.js (hardcoded to the current clock.html example)
2. Start the node server running (node app.js)
3. Open http://localhost:3000/source.html in one window and http://localhost:3000/output.html in a second window (ideally put your output window fullscreen on your projector)
4. Double-click in source window to create a new source region, note how output region is created showing the area of the page the source defines
5. Move and resize source regions
4. Arrange output regions:
	- press 'W' for translate controls
	- press 'E' for rotate controls
	- press 'R' for scale controls

Dependencies / Notes:

- make sure OS-suitable phantomjs executable is present in /dependencies and add to system PATH
- install bit3x5.ttf on system; phantomjs has webfont issues
- make sure to move each output region away from the origin before creating another one or they will overlap and move as a unit
- no state is stored in the node app, so source and output sync won't survive a window close of either
- my CSS/JS is all inline because this is a test-drive
- this whole thing should be classified as Highly Experimental
