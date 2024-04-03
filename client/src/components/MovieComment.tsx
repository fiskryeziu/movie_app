import React, { useRef, useState } from "react";
import pic from "../assets/mr-robot.jpg";
import { SendHorizonal } from "lucide-react";
import { Movie } from "types";
import { trpc } from "@/trpc";
import { useAuth } from "@/hooks/useAuth";

type TMovie = {
  movie: Movie;
};
const MovieComment = ({ movie }: TMovie) => {
  const { userData, showComments } = useAuth();
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const utils = trpc.useContext();

  const { mutate } = trpc.movie.addCommentByMovieId.useMutation({
    onSuccess(data) {
      console.log(data);
      utils.invalidate();
      setText("");
    },
    onError(error) {
      console.log(error.message);
      setText("");
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const commentHandler = () => {
    mutate({
      comment: text,
      movieId: movie.id,
    });
  };

  if (!showComments) {
    return null;
  }
  return (
    <div className="m-2 flex flex-col gap-5 sm:m-0">
      <div className="flex gap-5">
        <div className="h-16 w-16">
          <img
            src={pic}
            alt="profile-pic"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="relative flex w-full">
          <textarea
            ref={textareaRef}
            rows={1}
            className="m-0  w-full resize-none overflow-y-hidden rounded-xl border bg-transparent py-[10px] pl-3 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pl-4 md:pr-12"
            value={text}
            disabled={!!userData?.token === false}
            onChange={handleInputChange}
            placeholder="Type your comment..."
          ></textarea>
          <button
            className="absolute bottom-3 right-2 rounded-sm bg-primary p-2 duration-150 disabled:bg-transparent"
            disabled={text.length === 0}
            onClick={commentHandler}
          >
            <SendHorizonal color={text.length > 0 ? "white" : "gray"} />
          </button>
        </div>
      </div>
      <div className="flex h-80 w-full flex-col gap-5 overflow-y-auto  bg-secondary p-2">
        {movie?.reviews && movie.reviews.length > 0 ? (
          movie.reviews.map((review) => (
            <div className="flex items-center gap-3" key={review.id}>
              <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  src={pic}
                  alt="profile-pic"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="text-xs ">
                    {new Date(review.timestamp).toLocaleDateString("DE")}
                  </p>
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="m-auto">Be the first to comment.</p>
        )}
      </div>
    </div>
  );
};

export default MovieComment;
