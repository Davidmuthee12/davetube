"use client";
import { Button } from "@/components/ui/button";
import VideoDetails from "@/components/ui/custom/app/Vide_Details_upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideCloudUpload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string[]>([]);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // VIDEO DETAILS STATE
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [tags, setTags] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("public");

  // kids selection
  const [isForKids, setIsForKids] = useState(false);

  // generated thumbnail selection
  const [chosenThumbnail, setChosenThumbnail] = useState<string | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setVideoFile(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setVideoUrl(url);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setCustomThumbnail(url);
    }
  };

  const handleThumbnailClick = () => {
    if (!thumbnailInputRef.current) return;
    thumbnailInputRef.current.click();
  };

  const generateThumbnails = (videoUrl: string) => {
    return new Promise<string[]>((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.currentTime = 1;

      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 120;
        canvas.height = 68;

        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve([]);

        const thumbTimes = [1, 3, 5, 8];

        const thumbnails: string[] = [];

        const captureFrame = (time: number): Promise<void> => {
          return new Promise((res) => {
            video.currentTime = time;

            video.onseeked = () => {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              thumbnails.push(canvas.toDataURL("image/jpeg", 0.8));
              res();
            };
          });
        };

        // Capture each frame sequentially
        (async () => {
          for (const time of thumbTimes) {
            await captureFrame(time);
          }
          resolve(thumbnails);
        })();
      };
    });
  };

  useEffect(() => {
    if (videoUrl) {
      generateThumbnails(videoUrl).then(setThumbnail);
    }
  }, [videoUrl]);

  const uploadVideo = async () => {
    if (!videoFile) {
      alert("Please upload a video first.");
      return;
    }

    const formData = new FormData();

    // append files
    formData.append("video", videoFile);

    if (customThumbnail) {
      const response = await fetch(customThumbnail);
      const blob = await response.blob();
      formData.append("custom_thumbnail", blob, "custom_thumb.jpg");
    }

    if (chosenThumbnail) {
      const response = await fetch(chosenThumbnail);
      const blob = await response.blob();
      formData.append("generated_thumbnail", blob, "generated_thumb.jpg");
    }

    // append text values
    formData.append("title", title);
    formData.append("audience", audience);
    formData.append("tags", tags);
    formData.append("language", language);
    formData.append("category", category);
    formData.append("visibility", visibility);
    formData.append("made_for_kids", isForKids ? "yes" : "no");

    // send to API
    const res = await fetch("/api/videos/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log("Upload finished:", result);

    console.log("---- FormData entries ----");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center gap-5 w-full h-full">
          <div className="flex flex-col h-[50dvh] gap-10">
            <h1 className="flex w-full items-center justify-center">
              UPLOAD YOUR VIDEO
            </h1>
            <LucideCloudUpload className="w-full h-[30dvh] border-2 border-dashed border-blue-800 text-blue-400" />
            <span>DRAG & DROP VIDEO OR CLICK TO UPLOAD</span>
            <div className="flex flex-col">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChage}
                ref={fileInputRef}
              />
              <Button className="bg-blue-400" onClick={handleClick}>
                Select File
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full h-[50dvh] gap-10 justify-center items-center">
            <span>
              Supported Formats: MPP, MOV, WEBM, MKV <br /> LEARN MORE ABOUT
              UPLOADING
            </span>
            <progress value={75} max={100} />
          </div>
        </div>
        <VideoDetails
          setTitle={setTitle}
          setAudience={setAudience}
          setTags={setTags}
          setLanguage={setLanguage}
          setCategory={setCategory}
        />

        {/* video preview section */}
        <div className="flex flex-col items-center gap-5 w-full h-full">
          <div className="flex flex-col gap-5">
            {videoUrl && (
              <div className="flex flex-col w-full items-center gap-5 relative overflow-hidden aspect-video">
                <video
                  src={videoUrl}
                  controls={false}
                  onClick={togglePlay}
                  className="w-70 rounded-3xl"
                />
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="
      absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2
      z-10 
      text-white text-4xl 
      bg-black/60 
      p-4 
      rounded-full 
      cursor-pointer
    "
                  >
                    ▶
                  </button>
                )}
              </div>
            )}
            <div className="flex">
              <p className="flex w-full  items-center">{videoFile?.name}</p>
            </div>
          </div>

          <div className="flex flex-row overflow-auto m-8">
            {thumbnail.map((dataUrl, index) => (
              <Image
                src={dataUrl}
                width={200}
                height={120}
                key={index}
                alt={`Thumbnail ${index + 1}`}
                className={`rounded-2xl cursor-pointer m-1 border-4 ${
                  chosenThumbnail === dataUrl
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setChosenThumbnail(dataUrl)}
              />
            ))}
          </div>

          <div className="flex ">
            <div className="flex flex-col gap-5">
              <label htmlFor="">Audience</label>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-5">
                  <input type="radio" />
                  <span>Yes, its made for kids</span>
                </div>

                <div className="flex flex-col gap-5">
                  {customThumbnail && (
                    <Image
                      src={customThumbnail}
                      alt="Custom Thumbnail"
                      width={250}
                      height={140}
                      className="rounded-xl border"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailChange}
                  />

                  <Button
                    onClick={handleThumbnailClick}
                    className="bg-blue-400"
                  >
                    UPLOAD CUSTOM THUMBNAIL
                  </Button>
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full" id="audience">
                  <SelectValue placeholder="Public" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-row gap-5">
                <Button className="bg-blue-400" onClick={uploadVideo}>
                  Upload
                </Button>
                <Button className="bg-blue-400">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
