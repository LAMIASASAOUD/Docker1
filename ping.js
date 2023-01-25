import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const server1 = serve({ hostname: "localhost", port: 8000 });
console.log("Server 1 is listening on localhost:8000");

setInterval(async () => {
    try {
        // Vérification de la disponibilité du serveur 2
        const res = await fetch("http://localhost:8001/ping");
        if (res.status === 200) {
            // Envoi de la requête "ping" au serveur 2
            await fetch("http://localhost:8001/ping");
            console.log("Requête \"ping\" envoyée au serveur 2");
        } else {
            console.log("Serveur 2 non disponible");
        }
    } catch (err) {
        console.log("Serveur 2 non disponible");
    }
}, 1000);

for await (const req of server1) {
    console.log("Requête reçue: " + req.url);
}
