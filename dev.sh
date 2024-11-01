#!/bin/bash

gnome-terminal --tab --title="api" -- bash -c "cd api && npm run dev; exec bash"
gnome-terminal --tab --title="db studio" -- bash -c "cd api && npm run db:generate && npm run db:studio; exec bash"
gnome-terminal --tab --title="web" -- bash -c "cd web && npm run dev; exec bash"