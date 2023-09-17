import { configure, renderFile, serve } from "./deps.js";
// import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

// const sql = postgres({});
// const handleRequest = async (request) => {
//   const rows = await sql`SELECT COUNT(*) AS c FROM users`;
//   return new Response(`Meaning of life: ${rows[0].c}`);
// };

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  count: 0,
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/visits") {
    data.count++;
    return new Response(await renderFile("count.eta", data), responseDetails);
  }else if(url.pathname === "/meaning"){
    return new Response("Seeking truths beyond meaning of life, you will find 43.");
  }else{
    return new Response("Nothing here yet.");
  }

};


serve(handleRequest, { port: 7777 });