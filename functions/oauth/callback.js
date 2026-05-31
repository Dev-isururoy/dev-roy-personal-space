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
              // Send the token back using the exact origin of the CMS window that messaged us
              window.opener.postMessage(
                'authorization:github:success:{"token":"${token}","provider":"github"}',
                e.origin
              );
              window.removeEventListener("message", receiveMessage, false);
              
              // Give it a tiny moment to send the message, then close
              setTimeout(() => {
                window.close();
              }, 500);
            }
            
            // Listen for the CMS window reaching out to us
            window.addEventListener("message", receiveMessage, false);
            
            // Ping the CMS window to let it know we are ready
            window.opener.postMessage("authorizing:github", "*");
            
            // Fallback: if CMS doesn't respond to our ping, just broadcast the token and close
            setTimeout(() => {
              window.opener.postMessage(
                'authorization:github:success:{"token":"${token}","provider":"github"}',
                '*'
              );
              window.close();
            }, 2000);
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
