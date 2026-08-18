"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Check,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Arjun K",
    avatar: "AK",
    rating: 5,
    date: "2 days ago",
    title: "Absolutely worth it",
    text: "The quality is excellent and the product looks even better in person. Delivery was also surprisingly fast.",
    verified: true,
    likes: 24,
    liked: false,
    image: "👟",
  },
  {
    id: 2,
    name: "Rahul M",
    avatar: "RM",
    rating: 4,
    date: "1 week ago",
    title: "Great product",
    text: "Really comfortable and premium looking. The sizing was accurate too.",
    verified: true,
    likes: 12,
    liked: false,
    image: null,
  },
  {
    id: 3,
    name: "Nikhil P",
    avatar: "NP",
    rating: 5,
    date: "2 weeks ago",
    title: "Best purchase recently",
    text: "Packaging was excellent and the product arrived without any damage. Highly recommended.",
    verified: true,
    likes: 31,
    liked: false,
    image: "📦",
  },
];

const distribution = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleLike = (id: number) => {
    setLikedReviews((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-black pb-24 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to marketplace
          </Link>

          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/20">
            <Star size={11} />
            Verified reviews
          </div>

        </div>

        {/* PRODUCT */}

        <section className="relative mb-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025]">

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">

            {/* 3D PRODUCT */}

            <motion.div
              whileHover={{
                rotateY: 12,
                rotateX: -6,
                scale: 1.04,
              }}
              className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[2rem] bg-white text-6xl shadow-[0_30px_70px_rgba(255,255,255,.08)]"
            >
              👟
            </motion.div>

            <div className="flex-1">

              <p className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                Product reviews
              </p>

              <h1 className="mt-3 text-3xl font-black md:text-4xl">
                Aero Runner X
              </h1>

              <p className="mt-3 max-w-xl text-[10px] leading-5 text-white/25">
                Real experiences from customers who
                purchased this product through Vendora.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2">

                  <span className="text-2xl font-black">
                    4.8
                  </span>

                  <div>
                    <Stars value={5} />
                    <p className="mt-1 text-[7px] text-white/20">
                      1,284 reviews
                    </p>
                  </div>

                </div>

                <div className="h-8 w-px bg-white/10" />

                <span className="rounded-full border border-white/10 px-3 py-2 text-[7px] uppercase tracking-[0.15em] text-white/30">
                  96% recommend
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* REVIEW SUMMARY */}

        <section className="mb-6 grid gap-5 lg:grid-cols-[320px_1fr]">

          {/* SCORE */}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 text-center">

            <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
              Customer rating
            </p>

            <motion.div
              animate={{
                rotateY: [0, 8, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="mx-auto mt-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_70px_rgba(255,255,255,.04)]"
            >
              <span className="text-3xl font-black">
                4.8
              </span>

              <Stars value={5} />

            </motion.div>

            <p className="mt-5 text-[8px] text-white/20">
              Based on 1,284 verified purchases
            </p>

          </div>

          {/* DISTRIBUTION */}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                  Rating breakdown
                </p>

                <h2 className="mt-2 text-lg font-black">
                  What customers say
                </h2>
              </div>

              <span className="text-[8px] text-white/20">
                1,284 total
              </span>

            </div>

            <div className="space-y-4">

              {distribution.map((item) => (

                <div
                  key={item.stars}
                  className="flex items-center gap-3"
                >

                  <span className="w-8 text-[8px] text-white/30">
                    {item.stars} ★
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${item.percentage}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: item.stars * 0.08,
                      }}
                      className="h-full rounded-full bg-white"
                    />

                  </div>

                  <span className="w-8 text-right text-[8px] text-white/20">
                    {item.percentage}%
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* WRITE REVIEW */}

        <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-8">

          <div className="mb-6">

            <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
              Share your experience
            </p>

            <h2 className="mt-2 text-xl font-black">
              Write a review
            </h2>

          </div>

          <div className="mb-5">

            <p className="mb-3 text-[8px] uppercase tracking-[0.15em] text-white/20">
              Your rating
            </p>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  onMouseEnter={() =>
                    setHoverRating(star)
                  }
                  onMouseLeave={() =>
                    setHoverRating(0)
                  }
                  onClick={() =>
                    setRating(star)
                  }
                  className="transition hover:scale-125"
                >
                  <Star
                    size={22}
                    fill={
                      star <=
                      (hoverRating || rating)
                        ? "white"
                        : "transparent"
                    }
                    className={
                      star <=
                      (hoverRating || rating)
                        ? "text-white"
                        : "text-white/20"
                    }
                  />
                </button>

              ))}

            </div>

          </div>

          <div className="relative">

            <textarea
              value={reviewText}
              onChange={(e) =>
                setReviewText(e.target.value)
              }
              placeholder="Tell other shoppers about your experience..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black p-4 text-[10px] leading-5 outline-none placeholder:text-white/15 focus:border-white/30"
            />

            <span className="absolute bottom-3 right-3 text-[7px] text-white/15">
              {reviewText.length}/500
            </span>

          </div>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-[8px] font-bold text-white/30 hover:text-white">

              <Camera size={13} />

              Add photos

            </button>

            <button
              onClick={() => {
                if (rating && reviewText.trim()) {
                  setSubmitted(true);
                  setReviewText("");
                  setRating(0);
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[8px] font-black uppercase tracking-[0.15em] text-black"
            >

              <Send size={12} />

              Submit review

            </button>

          </div>

          {submitted && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-4 flex items-center gap-2 text-[8px] text-white/40"
            >
              <Check size={12} />
              Thanks! Your review has been submitted.
            </motion.div>
          )}

        </section>

        {/* REVIEWS */}

        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>

              <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                Customer feedback
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Latest reviews
              </h2>

            </div>

            <button className="hidden text-[8px] uppercase tracking-[0.15em] text-white/30 hover:text-white sm:block">
              Sort: Most helpful
            </button>

          </div>

          <div className="space-y-4">

            {reviews.map((review, index) => {

              const liked = likedReviews.includes(
                review.id,
              );

              return (
                <motion.article
                  key={review.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-7"
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-black text-black">
                      {review.avatar}
                    </div>

                    <div className="flex-1">

                      <div className="flex flex-col justify-between gap-2 sm:flex-row">

                        <div>

                          <div className="flex items-center gap-2">

                            <p className="text-[10px] font-bold">
                              {review.name}
                            </p>

                            {review.verified && (
                              <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[6px] uppercase tracking-wider text-white/30">
                                <Check size={8} />
                                Verified
                              </span>
                            )}

                          </div>

                          <div className="mt-2 flex items-center gap-2">

                            <Stars
                              value={review.rating}
                            />

                            <span className="text-[7px] text-white/15">
                              {review.date}
                            </span>

                          </div>

                        </div>

                        <button className="self-start text-white/20 hover:text-white">
                          <MoreHorizontal size={15} />
                        </button>

                      </div>

                      <h3 className="mt-5 text-sm font-bold">
                        {review.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-[9px] leading-5 text-white/30">
                        {review.text}
                      </p>

                      {review.image && (
                        <motion.div
                          whileHover={{
                            scale: 1.04,
                            rotate: 2,
                          }}
                          className="mt-5 flex h-28 w-28 items-center justify-center rounded-2xl bg-white text-4xl"
                        >
                          {review.image}
                        </motion.div>
                      )}

                      <div className="mt-6 flex items-center gap-3">

                        <button
                          onClick={() =>
                            toggleLike(review.id)
                          }
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[7px] transition ${
                            liked
                              ? "border-white/30 bg-white text-black"
                              : "border-white/10 text-white/30 hover:text-white"
                          }`}
                        >

                          <ThumbsUp size={11} />

                          Helpful {review.likes + (liked ? 1 : 0)}

                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-[7px] text-white/30 hover:text-white">

                          <MessageCircle size={11} />

                          Reply

                        </button>

                        <button className="ml-auto text-white/15 hover:text-white">

                          <Heart size={13} />

                        </button>

                      </div>

                    </div>

                  </div>

                </motion.article>
              );
            })}

          </div>

        </section>

      </div>
    </main>
  );
}

/* ============================= */
/* STARS */
/* ============================= */

function Stars({
  value,
}: {
  value: number;
}) {
  return (
    <div className="flex gap-0.5">

      {[1, 2, 3, 4, 5].map((star) => (

        <Star
          key={star}
          size={11}
          fill={
            star <= value
              ? "white"
              : "transparent"
          }
          className={
            star <= value
              ? "text-white"
              : "text-white/15"
          }
        />

      ))}

    </div>
  );
}