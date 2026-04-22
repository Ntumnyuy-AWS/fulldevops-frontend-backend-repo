"use client";

import { AuthContext } from "../../context/authContext.js";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
  const { user, logout} = useContext(AuthContext)
  return (
    <nav style={styles.nav}>
      <h2>LogisticsApp</h2>
       <div style={styles.nav}>
        <Link href="/">Home</Link> |{" "}
        {user? (
        <>
        <Link href="/dashboard">Dashboard</Link>
        <button onClick={logout}>Logout</button></>
        ): (
        <>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link></>
        )}

      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#111",
    color: "fff",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
};