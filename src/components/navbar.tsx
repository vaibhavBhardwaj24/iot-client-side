"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/client";

export const Navabar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient();
      const user = await supabase.auth.getSession();
      setIsLogged(!!user.data.session?.user.id);
    };

    fetchData(); // Call fetchData when the component mounts
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
      setIsLogged(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar maxWidth="full" isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem isActive={path === "/"}>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={path.startsWith("/dashboard")}>
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
        <NavbarItem isActive={path === "/service"}>
          <Link href="/service">Service</Link>
        </NavbarItem>
        <NavbarItem isActive={path === "/settings"}>
          <Link href="/settings">Settings</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {isLogged ? (
            <Button color="primary" variant="flat" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button
              color="primary"
              variant="flat"
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
