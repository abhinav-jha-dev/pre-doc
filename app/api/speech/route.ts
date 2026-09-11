// Production Workers cannot run the Node WebSocket speech adapter.
// Local npm run dev serves /api/speech through build/local-speech.ts.
export async function POST(){return Response.json({error:'Edge speech is available in the local development app. Start it with npm run dev.'},{status:503,headers:{'Cache-Control':'no-store'}});}
