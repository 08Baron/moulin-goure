// Fonction serverless Netlify : va chercher côté serveur le montant collecté
// sur la page officielle de la cagnotte (Fondation du Patrimoine), pour l'afficher
// avec notre propre style, sans widget externe qui détonnerait visuellement.
// Si le site source change et que la lecture échoue, on renvoie ok:false —
// le site affichera alors les montants saisis manuellement dans l'admin, sans erreur visible.

const CAGNOTTE_URL = "https://www.fondation-patrimoine.org/les-projets/moulin-goure-a-louresse-rochemenier/88369";

exports.handler = async function () {
  try {
    const res = await fetch(CAGNOTTE_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MoulinGoureBot/1.0)" }
    });
    const html = await res.text();
    const text = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");

    const collecteMatch = text.match(/Collecte en cours\s*([\d\s]{3,10})\s*€/i);
    const objectifMatch = text.match(/Objectif\s*([\d\s]{3,10})\s*€/i);

    if (!collecteMatch || !objectifMatch) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false })
      };
    }

    const montant = parseInt(collecteMatch[1].replace(/\s/g, ""), 10);
    const objectif = parseInt(objectifMatch[1].replace(/\s/g, ""), 10);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600" // revérifie au maximum 1 fois par heure
      },
      body: JSON.stringify({ ok: true, montant, objectif })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false })
    };
  }
};
