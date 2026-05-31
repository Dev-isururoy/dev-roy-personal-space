export async function onRequest(context) {
  const { env, request } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  const client_secret = env.GITHUB_CLIENT_SECRET;
  
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const redirect_uri = `${url.origin}/oauth/callback`;

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      return new Response("OAuth Error: " + data.error_description, { status: 400 });
    }

    const token = data.access_token;
    const provider = "github";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Authorizing...</title>
      </head>
      <body>
        <p>Logging you in...</p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage %o", e)
            }
            window.addEventListener("message", receiveMessage, false);

            const message = 'authorization:' + '${provider}' + ':success:' + JSON.stringify({
              token: '${token}',
              provider: '${provider}'
            });

            // Send message back to main window
            window.opener.postMessage(message, '${url.origin}');
            
            // Sometimes the CMS doesn't close the window automatically
            setTimeout(() => {
              window.close();
            }, 1000);
          })();
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      },
    });

  } catch (error) {
    return new Response("Server error: " + error.message, { status: 500 });
  }
}
