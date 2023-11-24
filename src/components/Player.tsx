import { usePlayerStore } from "@/store/playerStore";
import React, { useState, useEffect, useRef } from "react";

interface PauseProps {
  className?: string;
}

export const Pause: React.FC<PauseProps> = ({ className }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

interface PlayProps {
  className?: string;
}

export const Play: React.FC<PlayProps> = ({ className }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

export const VolumeSilence: React.FC = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen apagado"
    viewBox="0 0 16 16"
  ></svg>
);

export const Volume: React.FC = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen alto"
    id="volume-icon"
    viewBox="0 0 16 16"
  ></svg>
);

const CurrentSong = ({
  image,
  title,
}: {
  image: string | null;
  title: string | null;
}) => {
  const imageUrl = image || "/";
  const titleText = title || "";

  return (
    <div className={`flex items-center gap-5 relative overflow-hidden`}>
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={imageUrl} alt={titleText} />
      </picture>
      <h3 className="font-bold block">{titleText}</h3>
    </div>
  );
};

export const Player: React.FC = () => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((store) => store);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { playlist, songs, song } = currentMusic;
    if (song) {
      const url = `/music/${playlist?.id}/0${song.id}.mp3`;
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const songis = {
    id: 1,
    albumId: 1,
    title: "Moonlit Walk",
    image:
      "https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353",
    artists: ["LoFi Dreamer"],
    album: "Chill Lo-Fi Music",
    duration: "3:12",
  };

  const {
    song: { image, title },
  } = currentMusic;

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        <CurrentSong image={image} title={title} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
      <div className="grid place-content-center"></div>

      <audio ref={audioRef}></audio>
    </div>
  );
};

export default Player;
