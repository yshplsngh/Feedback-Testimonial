`"dev": "nodemon --exec \"node -r esbuild-register ./src/index.ts\" -e .ts"`

- --exec: Specifies the command to run whenever nodemon detects changes
- `node -r esbuild-register` - The -r esbuild-register flag tells Node.js to pre-load the esbuild-register module before running the application. This module allows you to run TypeScript files directly without needing to compile them to JavaScript first. It's similar to ts-node, but uses esbuild, which is generally faster.
- `./src/index.ts` - The entry point of your application, written in TypeScript.
- `-e .ts` - This option tells nodemon to watch for changes in files with the .ts extension. When a change is detected in any .ts file, nodemon will restart the application.
