import React from "react";

interface ShareButtonProps {
  username: string; // username kreator
}

const ShareButton = ({ username }: ShareButtonProps) => {
  const handleShare = () => {
    const profileLink = `http://103.193.179.230/subscription/${username}`;
    navigator.clipboard
      .writeText(profileLink)
      .then(() => {
        alert("Link profil telah disalin ke clipboard!");
      })
      .catch((err) => {
        console.error("Gagal menyalin link:", err);
        alert("Gagal menyalin link.");
      });
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-600 text-white border border-white rounded-full px-8 py-2 text-lg font-semibold justify-center flex"
    >
      Bagikan
    </button>
  );
};

export default ShareButton;
