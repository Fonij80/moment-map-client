import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Video, FileAudio, Upload } from "lucide-react";

interface MediaUploadProps {
  type: "image" | "video" | "audio";
  onChange: (url: string, type: "image" | "video" | "audio") => void;
  currentValue?: string | null;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  type,
  onChange,
  currentValue,
}) => {
  const [isUrlInput, setIsUrlInput] = useState(
    !!currentValue && !currentValue.startsWith("data:")
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentValue || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onChange(result, type);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewUrl(url);
    if (url) onChange(url, type);
  };

  const clearMedia = () => {
    setPreviewUrl(null);
    onChange("", type);
  };

  // Icon based on media type
  const MediaIcon =
    type === "image" ? Image : type === "video" ? Video : FileAudio;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MediaIcon className="h-5 w-5" />
          <span className="text-sm font-medium">
            {type.charAt(0).toUpperCase() + type.slice(1)}
            {type === "image"
              ? " (JPG, PNG)"
              : type === "video"
              ? " (MP4)"
              : " (MP3, WAV)"}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsUrlInput(!isUrlInput)}
        >
          {isUrlInput ? "Upload File" : "Use URL"}
        </Button>
      </div>

      {isUrlInput ? (
        <Input
          type="url"
          placeholder={`Enter ${type} URL...`}
          value={previewUrl || ""}
          onChange={handleUrlChange}
        />
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept={
              type === "image"
                ? "image/*"
                : type === "video"
                ? "video/*"
                : "audio/*"
            }
            onChange={handleFileChange}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={clearMedia}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      )}

      {previewUrl && (
        <div className="mt-2 relative border rounded-md overflow-hidden">
          {type === "image" && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-32 object-cover"
              onError={() => setPreviewUrl(null)}
            />
          )}
          {type === "video" && (
            <video
              src={previewUrl}
              controls
              className="w-full h-32 object-cover"
              onError={() => setPreviewUrl(null)}
            />
          )}
          {type === "audio" && (
            <audio
              src={previewUrl}
              controls
              className="w-full mt-2"
              onError={() => setPreviewUrl(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};
