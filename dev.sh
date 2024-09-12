#!/bin/bash

# Open a new tab in the existing gnome-terminal window and run the API server
gnome-terminal --tab --title="API" -- bash -c "cd /home/yshpl/WD/Testimonial/api && npm run dev; exec bash"

# Open another new tab in the same gnome-terminal window and run the Web server
gnome-terminal --tab --title="WEB" -- bash -c "cd /home/yshpl/WD/Testimonial/web && npm run dev; exec bash"