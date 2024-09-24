"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/server";

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  };
  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);

    redirect("/error");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signupAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}
export async function googleLogin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}
