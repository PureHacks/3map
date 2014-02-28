# A web-based projection mapping tool

- make sure OS-suitable phantomjs executable is present in /dependencies

- phantomJS to render page & capture a screengrab

- controls:
	- one window to control source mapping
		- user can create rectangular regions with unique IDs
		- user can adjust corner points of rectangular regions
		- regions store their corner points in pixels relative to the source image
		- regions sync their corner points to node app
	- one window to control destination mapping
		- regions created in source mapping automatically appear in destination mapping window
		- regions use the corner points from source mapping to control which chunk of the source image they display (CSS)
		- user can freely adjust corner points (i.e. corner-pin)
		- frame can be fullscreen
