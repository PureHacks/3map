# 3map
## A web-based projection mapping tool

3map uses node, PhantomJS, and THREE.js to allow users to do basic video-style projection mapping of webpages.

The server runs on nodejs; Phantom generates screenshots of an arbitrary webpage at a user-set interval. Then the user creates source regions (defining areas of the flat webpage) and output regions which can be moved, rotated, and scaled in 3D using WebGL.

3map started as a question: is it possible to do video-style projection mapping of an arbitrary webpage, fully in the browser?

###To run:

1. Set the page you want to load in app.js (hardcoded to the current clock.html example)
2. Start the node server running (node app.js)
3. Open http://localhost:3000/source.html in one window and http://localhost:3000/output.html in a second window (ideally put your output window fullscreen on your projector)
4. Double-click in source window to create a new source region, note how output region is created showing the area of the page the source defines
5. Move and resize source regions
4. Arrange output regions:
	- press 'W' for translate controls
	- press 'E' for rotate controls
	- press 'R' for scale controls

###Dependencies / Notes:

- make sure OS-suitable phantomjs executable is present in /dependencies and add to system PATH
- for demo, install bit3x5.ttf on system (phantomjs has webfont issues)
- make sure to move each output region away from the origin before creating another one or they will overlap and move as a unit
- no state is stored in the node app, so source and output sync won't survive a window close of either
- my CSS/JS is all inline because this is a test-drive
- this whole thing should be classified as Highly Experimental

###Design Notes

3map started as a question: is it possible to do video-style projection mapping of an arbitrary webpage, fully in the browser?

The short answer is, not quite. Arbitrary webpages can be rendered in 3D easily, but the 'chunking' and mapping required can't be done easily.

Current approaches (and please let me know if you have any ideas):

1. Render image of page (using Phantom), chunk it up & map that image to WebGL textures. Downside is, there's no way to interact with page (although if you loaded the page in the 'source' window you could probably somehow pipe input from there through sockets to node to Phantom). Also, Phantom can only handle a 100ms refresh rate, and there's also a 500ms flash of black when the textures are updated in THREE (which is probably because I did something stupid)
2. Render live page using THREE's [CSS3D renderer](http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/) into cropped åœiframes that can be rotated/scaled/etc: this gets you the appearance of a live page (i.e. user can select text, interact with forms) BUT you'd have to somehow sync all the iframes up
3. Render live page in a single iFrame to a single mesh, then manipulate the mesh geometry and texture opacity to match the user's source regions; BUT I'd lose access to the easy single-mesh translation/rotation/scale tools in THREE and have to move to something more like selectable clusters. Still, this is probably the best direction moving forward.
