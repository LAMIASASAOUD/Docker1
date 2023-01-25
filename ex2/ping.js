import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const server1 = serve({ hostname: "localhost", port: 8000 });
console.log("Server 1 is listening on localhost:8000");

setInterval(async () => {
    try {
        // Récupération de l'adresse du serveur 2 auprès de l'annuaire
        const res = await fetch("http://localhost:9000/server2");
        const server2 = await res.json();

        // Envoi de la requête "ping" au serveur 2
        await fetch(`http://${server2.hostname}:${server2.port}/ping`);
        console.log("Requête \"ping\" envoyée au serveur 2");
    } catch (err) {
        console.log("Serveur 2 non disponible");
    }
}, 1000);

for await (const req of server1) {
    console.log("Requête reçue: " + req.url);
}
