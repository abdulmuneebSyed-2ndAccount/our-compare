// app/api/get-access-token/route.js
export async function POST(req) {
  const { code } = await req.json(); // Get the authorization code from the request body
//   const { CLIENT_SECRET, NEXT_PUBLIC_CLIENT_ID, REDIRECT_URI } = process.env;
    const CLIENT_ID = "8V9X13KfdRsSkPhfem3WJLBTMTTV3XL2";
    const CLIENT_SECRET = "0xra-JiB81yoy1pQaNUQGF90B3ZgA7ER7eEgtR6p";
    const REDIRECT_URI = "http://localhost:3000/callback";
  const response = await fetch(
    "https://sandbox-login.uber.com/oauth/v2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }),
    }
  );

  const data = await response.json();

  // Send the response back with the access token
  return new Response(JSON.stringify(data), {
    status: response.status,
  });
}
