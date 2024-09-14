#!/bin/bash

gnome-terminal --tab --title="API" -- bash -c "cd /home/yshpl/WD/Testimonial/api && npm run dev; exec bash"

gnome-terminal --tab --title="WEB" -- bash -c "cd /home/yshpl/WD/Testimonial/web && npm run dev; exec bash"