export async function onRequest(context) {
  const { env, request } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  const url = new URL(request.url);
  const redirect_uri = `${url.origin}/oauth/callback`;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo,user`;
  
  return Response.redirect(authUrl, 302);
}
