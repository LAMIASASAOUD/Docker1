import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const server2 = serve({ hostname: "localhost", port: 8001 });
console.log("Server 2 is listening on localhost:8001");

setInterval(async () => {
    try {
        // Vérification de la disponibilité du serveur 1
        const res = await fetch("http://localhost:8000/pong");
        if (res.status === 200) {
            // Envoi de la requête "pong" au serveur 1
            await fetch("http://localhost:8000/pong");
            console.log("Requête \"pong\" envoyée au serveur 1");
        } else {
            console.log("Serveur 1 non disponible");
        }
    } catch (err) {
        console.log("Serveur 1 non disponible");
    }
}, 1000);

for await (const req of server2) {
    console.log("Requête reçue: " + req.url);
}
