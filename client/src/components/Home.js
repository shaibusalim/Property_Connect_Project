import React from "react";
import HomePage from "./HomePage";
import Header from "./Header";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function Home() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
>
      <Header />
      <main className="flex-grow p-4">
        <HomePage />
      </main>
    </div>
  );
}

export default Home;