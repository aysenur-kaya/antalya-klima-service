import { redirect } from "next/navigation";

/** Admin girişi /admin/login adresindedir; /login kısa yol. */
export default function LoginRedirectPage() {
  redirect("/admin/login");
}
