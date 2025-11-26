import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VideoDetailsProps {
  setTitle: (value: string) => void;
  setAudience: (value: string) => void;
  setTags: (value: string) => void;
  setLanguage: (value: string) => void;
  setCategory: (value: string) => void;
}

export default function VideoDetails({
  setTitle,
  setAudience,
  setTags,
  setLanguage,
  setCategory,
}: VideoDetailsProps) {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <h1 className="text-xl font-semibold mb-6">VIDEO DETAILS</h1>

      <form className="flex flex-col h-full flex-1 w-full max-w-md gap-8 py-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Video Title</label>
          <input
            className="border-2 w-full px-3 py-2 rounded"
            type="text"
            placeholder="Enter video title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Audience */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Audience</label>
          <Select onValueChange={(value) => setAudience(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kids">Kids</SelectItem>
              <SelectItem value="youth">Youth</SelectItem>
              <SelectItem value="adults">Adults</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tags</label>
          <input
            className="border-2 w-full px-3 py-2 rounded"
            type="text"
            placeholder="Tag your video"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Language */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Language</label>
          <Select onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="kiswahili">Kiswahili</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="russian">Russian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Category</label>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Entertainment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
}
