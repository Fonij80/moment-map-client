import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { useEvents } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaUpload } from "../MediaUpload";
import { useSettings } from "@/contexts/SettingsContext";

const months = [
  { value: "0", label: "January" },
  { value: "1", label: "February" },
  { value: "2", label: "March" },
  { value: "3", label: "April" },
  { value: "4", label: "May" },
  { value: "5", label: "June" },
  { value: "6", label: "July" },
  { value: "7", label: "August" },
  { value: "8", label: "September" },
  { value: "9", label: "October" },
  { value: "10", label: "November" },
  { value: "11", label: "December" },
];

// Current year and a reasonable range for the years
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 121 }, (_, i) => {
  const year = currentYear - 100 + i;
  return { value: year.toString(), label: year.toString() };
});

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  dateSelection: z.object({
    year: z.string({ required_error: "Year is required" }),
    month: z.string({ required_error: "Month is required" }),
    day: z.string().optional(),
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  imageUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal(""))
    .or(z.string().startsWith("data:")),
  videoUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal(""))
    .or(z.string().startsWith("data:")),
  audioUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal(""))
    .or(z.string().startsWith("data:")),
  mediaType: z.enum(["image", "video", "audio"]).nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EventForm = () => {
  const { addEvent } = useEvents();
  const { preferences } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [activeMedia, setActiveMedia] = useState<
    "image" | "video" | "audio" | null
  >(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dateSelection: {
        year: currentYear.toString(),
        month: new Date().getMonth().toString(),
        day: "",
      },
      description: "",
      location: "",
      imageUrl: "",
      videoUrl: "",
      audioUrl: "",
      mediaType: null,
    },
  });

  const onSubmit = (values: FormValues) => {
    // Convert the date selection to a Date object
    const { year, month, day } = values.dateSelection;
    // If day is not provided, use the first day of the month
    const dateDay = day ? parseInt(day) : 1;
    const date = new Date(parseInt(year), parseInt(month), dateDay);

    let mediaType = values.mediaType;
    let imageUrl = values.imageUrl || null;
    let videoUrl = values.videoUrl || null;
    let audioUrl = values.audioUrl || null;

    addEvent({
      title: values.title,
      date: date,
      description: values.description,
      location: values.location,
      imageUrl,
      videoUrl,
      audioUrl,
      mediaType,
    });

    form.reset();
    setIsOpen(false);
  };

  const handleMediaChange = (
    url: string,
    type: "image" | "video" | "audio"
  ) => {
    if (type === "image") {
      form.setValue("imageUrl", url);
      if (url) {
        form.setValue("mediaType", "image");
        form.setValue("videoUrl", "");
        form.setValue("audioUrl", "");
      } else {
        form.setValue("mediaType", null);
      }
    } else if (type === "video") {
      form.setValue("videoUrl", url);
      if (url) {
        form.setValue("mediaType", "video");
        form.setValue("imageUrl", "");
        form.setValue("audioUrl", "");
      } else {
        form.setValue("mediaType", null);
      }
    } else if (type === "audio") {
      form.setValue("audioUrl", url);
      if (url) {
        form.setValue("mediaType", "audio");
        form.setValue("imageUrl", "");
        form.setValue("videoUrl", "");
      } else {
        form.setValue("mediaType", null);
      }
    }
  };

  return (
    <div className="w-full mb-8">
      {!isOpen ? (
        <div className="flex justify-center">
          <Button onClick={() => setIsOpen(true)}>Add Life Event</Button>
        </div>
      ) : (
        <div
          className={`${preferences.fontFamily} bg-card rounded-lg border p-6 shadow-sm animate-fade-in`}
        >
          <h2 className="text-2xl font-semibold mb-6">Add New Life Event</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Graduated College"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Custom Date Selection */}
                <div className="space-y-4">
                  <FormLabel className="block">Date</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="dateSelection.year"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60">
                              {years.map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateSelection.month"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem
                                  key={month.value}
                                  value={month.value}
                                >
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="ml-auto text-sm"
                      onClick={() => setShowDayPicker(!showDayPicker)}
                    >
                      {showDayPicker
                        ? "Hide Day Selection"
                        : "Add Specific Day"}
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${
                          showDayPicker ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {showDayPicker && (
                    <FormField
                      control={form.control}
                      name="dateSelection.day"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="31"
                              placeholder="Day (optional)"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                const num = parseInt(value);
                                if (!value || (num >= 1 && num <= 31)) {
                                  field.onChange(value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what happened during this event..."
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Media Upload Tabs */}
              <div className="space-y-2">
                <FormLabel>Media (Optional)</FormLabel>
                <Tabs
                  defaultValue={activeMedia || "image"}
                  onValueChange={(value) => setActiveMedia(value as any)}
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                  </TabsList>

                  <TabsContent value="image" className="space-y-4">
                    <MediaUpload
                      type="image"
                      onChange={handleMediaChange}
                      currentValue={form.getValues("imageUrl")}
                    />
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <MediaUpload
                      type="video"
                      onChange={handleMediaChange}
                      currentValue={form.getValues("videoUrl")}
                    />
                  </TabsContent>

                  <TabsContent value="audio" className="space-y-4">
                    <MediaUpload
                      type="audio"
                      onChange={handleMediaChange}
                      currentValue={form.getValues("audioUrl")}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Event</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
