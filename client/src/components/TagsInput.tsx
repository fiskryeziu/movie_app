/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input } from "./ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { X } from "lucide-react";

type TagInput = {
  title: string;
  description: string;
  quality: string;
  genre: string | null;
  releaseDate: Date;
  rating: string;
  actors: string | null;
  coverImageUrl?: File;
  movieURL: string;
  trailerUrl: string;
  duration: string;
};

function TagsInput<T extends keyof TagInput>({
  field,
  setSelected,
  selected,
  oldTags,
}: {
  field: ControllerRenderProps<TagInput, T>;
  setSelected: (value: string[]) => void;
  selected: string[];
  oldTags?: string[];
}) {
  const [tags, setTags] = useState<string[]>(oldTags || []);
  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setTags((prev) => [...prev, e.currentTarget.value.toLowerCase()]);

      setSelected([...selected, e.currentTarget.value]);

      field.onChange("");
    }
  };

  const removeTags = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    setSelected([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  return (
    <div className="min-h-12 flex flex-wrap rounded-md bg-secondary">
      {tags.length > 0 && (
        <ul id="tags" className="m-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <li
              key={tag + index}
              className="flex h-6 items-center gap-1 bg-primary p-1 text-xs font-semibold uppercase"
            >
              <span>{tag}</span>
              <span>
                <X
                  size={16}
                  onClick={() => removeTags(index)}
                  className="cursor-pointer"
                />
              </span>
            </li>
          ))}
        </ul>
      )}
      <Input
        {...field}
        type="text"
        onKeyUp={addTags}
        className="utline-none h-10 flex-shrink-0 grow bg-secondary px-2 "
        placeholder="add..."
        value={field.value as string}
      />
    </div>
  );
}

export default TagsInput;
