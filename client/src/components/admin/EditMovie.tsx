import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { trpc } from "@/trpc";
import { z } from "zod";
import { handleDelete } from "@/utils/cloudinary";
import { format } from "date-fns";
import { TKey } from "types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagsInput from "../TagsInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  quality: z.string().min(2, {
    message: "Quality must be selected",
  }),
  genre: z.string().nullable(),
  rating: z.string().min(2, {
    message: "Rating must be at least 2 character",
  }),
  releaseDate: z.coerce.date(),
  actors: z.string().nullable(),
  coverImageUrl: z.instanceof(File).or(z.any().nullable()),
  movieURL: z
    .string()
    .startsWith("https://", { message: "Must provide secure URL" }),
  trailerUrl: z
    .string()
    .startsWith("https://", { message: "Must provide secure URL" }),
  duration: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
});

function EditMovie() {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [stringDate, setStringDate] = useState<string>(
    format(new Date(), "MM/dd/yyyy"),
  );
  const [date, setDate] = useState<Date>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const { data, isLoading } = trpc.movie.getMovieById.useQuery({
    id,
  });

  const { mutate } = trpc.movie.editMovie.useMutation({
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      genre: "",
      actors: "",
      coverImageUrl: {} as File,
      description: data?.description,
      duration: data?.duration ? "" + data.duration : "",
      quality: data?.quality || "",
      rating: data?.rating ? "" + data.rating : "",
      releaseDate: data?.releaseDate ? new Date(data.releaseDate) : new Date(),
      movieURL: data?.movieURL,
      trailerUrl: data?.trailerUrl,
    },
  });

  useEffect(() => {
    if (data) {
      setSelectedActors(data.actors);
      setSelectedGenre(data.genre.map((x) => x.toLowerCase()));
    }
  }, [data]);

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem("formValues") || "{}");
    Object.keys(storedValues).forEach((key) => {
      form.setValue(key as TKey, storedValues[key]);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(form.getValues()));
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      console.log(selectedGenre, selectedActors);
      if (values.coverImageUrl instanceof File && data) {
        const deleteRes = await handleDelete(data.coverImageUrl);
        console.log(deleteRes);
        const imageUrl = await imageUpload(values.coverImageUrl);
        if (imageUrl) {
          mutate({
            id,
            coverImageUrl: imageUrl,
            actors: selectedActors,
            description: values.description,
            duration: +values.duration,
            movieURL: values.movieURL,
            title: values.title,
            quality: values.quality,
            rating: +values.rating,
            trailerUrl: values.trailerUrl,
            genre: selectedGenre,
            releaseDate: values.releaseDate,
          });
        }
      } else {
        if (data) {
          mutate({
            id,
            coverImageUrl: data.coverImageUrl,
            actors: selectedActors,
            description: values.description,
            duration: +values.duration,
            movieURL: values.movieURL,
            title: values.title,
            quality: values.quality,
            rating: +values.rating,
            trailerUrl: values.trailerUrl,
            genre: selectedGenre,
            releaseDate: values.releaseDate,
          });
        }
      }
    }
  }

  async function imageUpload(file: File) {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", "voqypqsd");
    formData.append("file", file);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    const imageUrl = data.secure_url;
    return imageUrl;
  }

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  if (isLoading) return <></>;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="mx-20 mt-20 grid grid-cols-1 place-items-end gap-5 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="title"
                  className="bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="description"
                  className="bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quality"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Quality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-secondary">
                  <SelectItem
                    value="HD"
                    className="hover:!bg-black/50 focus:bg-black/50"
                  >
                    HD
                  </SelectItem>
                  <SelectItem
                    value="SD"
                    className="hover:!bg-black/50 focus:bg-black/50"
                  >
                    SD
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <TagsInput
                  field={field}
                  setSelected={setSelectedGenre}
                  selected={selectedGenre}
                  oldTags={data?.genre}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="rating"
                  type="number"
                  inputMode="numeric"
                  className="bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <Popover>
              <FormItem className="relative flex w-full max-w-xs flex-col">
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="text"
                      value={stringDate}
                      onChange={(e) => {
                        setStringDate(e.target.value);
                        const parsedDate = new Date(e.target.value);
                        if (parsedDate.toString() === "Invalid Date") {
                          setErrorMessage("Invalid Date");
                          setDate(undefined);
                        } else {
                          setErrorMessage("");
                          setDate(parsedDate);
                          field.onChange(parsedDate);
                        }
                      }}
                      className="bg-secondary"
                    />
                    {errorMessage !== "" && (
                      <div className="absolute bottom-[-1.75rem] left-0 text-sm text-red-400">
                        {errorMessage}
                      </div>
                    )}
                  </>
                </FormControl>
                <PopoverTrigger asChild>
                  <CalendarIcon className="absolute right-2 top-6 h-4 w-4 opacity-50" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (!selectedDate) return;
                      setDate(selectedDate);
                      setStringDate(format(selectedDate, "MM/dd/yyyy"));
                      setErrorMessage("");
                      field.onChange(date);
                    }}
                    defaultMonth={date}
                    className="bg-secondary"
                    initialFocus
                  />
                </PopoverContent>
                <FormMessage />
              </FormItem>
            </Popover>
          )}
        />
        <FormField
          control={form.control}
          name="actors"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Actors</FormLabel>
              <FormControl>
                <TagsInput
                  field={field}
                  setSelected={setSelectedActors}
                  selected={selectedActors}
                  oldTags={data?.actors}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImageUrl"
          render={({ field }) => {
            return (
              <FormItem className="w-full max-w-xs">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="image url"
                    className="bg-secondary file:rounded-lg file:bg-background/50 file:p-1 file:text-white"
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    required={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="movieURL"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Movie Url</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="movie url"
                  className="bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="duration in minutes"
                  className="bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailerUrl"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Trailer</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="trailer url"
                  className="bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default EditMovie;
