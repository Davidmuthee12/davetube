import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VideoDetails() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <h1 className="text-xl font-semibold mb-6">VIDEO DETAILS</h1>
      <form className="flex flex-col h-full flex-1 w-full max-w-md gap-8 py-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <input
            id="description"
            className="border-2 w-full px-3 py-2 rounded"
            type="text"
            placeholder="Enter a descriptive video title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="audience" className="text-sm font-medium">
            Audience
          </label>
          <Select>
            <SelectTrigger className="w-full" id="audience">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            placeholder="Tag your video"
            className="border-2 w-full px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="language" className="text-sm font-medium">
            Language
          </label>
          <Select>
            <SelectTrigger className="w-full" id="language">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <Select>
            <SelectTrigger className="w-full" id="category">
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
