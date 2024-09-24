import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/middleware";
import { createClient } from "./utils/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  // await updateSession(request);
  const url = request.nextUrl.clone();
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (request.nextUrl.pathname.startsWith("/dashboard") && !session) {
    url.pathname = "/login";
    console.log(session, "middleware");

    await updateSession(request);

    return NextResponse.redirect(url);
  }
  if (request.nextUrl.pathname.startsWith("/login" || "/signUp") && session) {
    console.log(session, "middleware");
    await updateSession(request);

    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }
  // return;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
