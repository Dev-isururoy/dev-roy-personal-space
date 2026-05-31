import { redirect } from "next/navigation";

export default function AdminPage() {
  // Since we are using static export, and Decap CMS lives in public/admin/index.html
  // we redirect /admin to /admin/index.html for local development.
  // On Cloudflare Pages, /admin might resolve automatically, but the explicit path is safer.
  redirect("/admin/index.html");
}
