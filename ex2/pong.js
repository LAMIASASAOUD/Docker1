import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const server2 = serve({ hostname: "localhost", port: 8001 });
console.log("Server 2 is listening on localhost:8001");

setInterval(async () => {
    try {
        // Récupération de l'adresse du serveur 1 auprès de l'annuaire
        const res = await fetch("http://localhost:9000/server1");
        const server1 = await res.json();

        // Envoi de la requête "pong" au serveur 1
        await fetch(`http://${server1.hostname}:${server1.port}/pong`);
        console.log("Requête \"pong\" envoyée au serveur 1");
    } catch (err) {
        console.log("Serveur 1 non disponible");
    }
}, 1000);

for await (const req of server2) {
    console.log("Requête reçue: " + req.url);
}
