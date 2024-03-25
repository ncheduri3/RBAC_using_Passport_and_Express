This is an exceprt of the contribution that I made to the project NORP. I am resusing the readme file from the project. I do not own the 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Code organization:
- Frontend code in `./src` folder
- Backend code in `./server` folder

To run both the frontend and backend hosted on same server, do the following steps-
- Ensure installed node version `16.14.1` or higher

To install the dependencies,
- Run `npm i`

First, run the development server:
- `npm run dev`
PM2 will start the dev server. 

The below command can be used to reload the server after changes.
- `npm run restart`

To stop the dev server, run
`npm run stop`
PM2 will gracefully shutdown the dev server. 

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

To reflect changes of `./src` folder-

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file in `src` folder. If changes do not reflect, you may need to delete the Next.js cache by deleting `.next` folder in root directory.

To reflect changes of `./server` folder-
- On Mac press `command+c`
- On Windows press `ctrl+c`

This stops the server. Re-run the development server using `npm run dev`

### Custom Express server API routes
All custom API routes using Express can be controlled in `./server/server.js`. If any route is not defined in custom server, Next.js will provide the fallback 404 page.

### Next.js API routes
All routes supported by Next.js `pages` based routing feature do not need separate routes handling.

NOTE: Since we have a custom server routing as well as Next.js routing, we need to ensure the routes in both do not overlap.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:4000/api/hello](http://localhost:4000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



