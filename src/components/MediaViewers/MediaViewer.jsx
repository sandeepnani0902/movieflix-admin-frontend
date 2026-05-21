import React from "react";

const MediaViewer = ({ media, onClose }) => {
  if (!media) return null;

  const isVideo =
    media.type === "video" ||
    media.url?.endsWith(".mp4") ||
    media.url?.endsWith(".webm");

  const isYouTube = media.url?.includes("youtube");

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

      {/* Modal Box */}
      <div className="bg-slate-900 p-4 rounded-2xl w-[90%] max-w-4xl relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl"
        >
          ✕
        </button>

        {/* Title */}
        {media.title && (
          <h3 className="mb-3 text-lg">{media.title}</h3>
        )}

        {/* 🎬 Video */}
        {isVideo && !isYouTube && (
          <video
            src={media.url}
            controls
            autoPlay
            className="w-full rounded-lg"
          />
        )}

        {/* ▶ YouTube */}
        {isYouTube && (
          <iframe
            src={media.url.replace("watch?v=", "embed/")}
            className="w-full h-[400px] rounded-lg"
            allowFullScreen
          />
        )}

        {/* 🖼 Image */}
        {!isVideo && !isYouTube && (
          <img
            src={media.url}
            alt="preview"
            className="w-full max-h-[500px] object-contain rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default MediaViewer;
