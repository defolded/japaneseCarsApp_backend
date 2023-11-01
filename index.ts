const server = Bun.serve({
    port: 3030,
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/cars") return new Response("Cars request");
        return new Response("404");
    },
});

console.log(`Listening on ${server.hostname}: ${server.port}`);