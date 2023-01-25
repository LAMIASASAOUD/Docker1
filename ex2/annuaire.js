import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const server = serve({ hostname: "localhost", port: 9000 });
console.log("Server annuaire is listening on localhost:9000");

const server1 = { hostname: "localhost", port: 8000 };
const server2 = { hostname: "localhost", port: 8001 };

for await (const req of server) {
    if (req.url === "/server1") {
        req.respond({ body: JSON.stringify(server1) });
    } else if (req.url === "/server2") {
        req.respond({ body: JSON.stringify(server2) });
    }
}
