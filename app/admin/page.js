"use client";
import { postModGame } from "@/fechApi";
import { useState } from "react";
import ListGame from "./modgame/ListGame";
import PostGame from "./modgame/PostGame";

function AdminPage() {
  const [loading, setLoading] = useState(false);

  async function handlePostGame(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const image = formData.get("image");
    const name = formData.get("name");
    const sub = formData.get("sub");
    const link = formData.get("link");
    const version = formData.get("version");
    const mods = formData.get("mods");
    let credentials = { image, name, sub, link, version, mods };
    postModGame(credentials).then((res) => {
      if (res.status === 201) {
        setLoading(false);
      }
    });
  }

  return (
    <>
      <ListGame />
      <PostGame handlePostGame={handlePostGame} loading={loading} />
    </>
  );
}

export default AdminPage;
