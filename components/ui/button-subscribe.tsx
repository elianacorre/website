"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";
import React, { PropsWithChildren, useState } from "react";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
const BUTTON_SUBSCRIBE = tv({
  slots: {
    ACTION: `relative flex size-full items-center justify-center font-semibold`,
    BASE: `bg-primary text-primary-foreground relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg px-6`,
    REACTION: `relative flex items-center justify-center font-semibold`,
    BASE2: `bg-primary text-primary-foreground relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none px-6`,
  },
  variants: {
    isSubscribed: {
      true: {},
      false: {},
    },
  },
});

// ROOT ************************************************************************************************************************************
export const SubscribeButton = React.forwardRef<HTMLButtonElement, SubscribeButtonProps>(
  ({ subscribeStatus = false, onClick, className, children, ...props }, ref) => {
    const { ACTION, BASE, REACTION } = BUTTON_SUBSCRIBE();

    const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

    if (
      React.Children.count(children) !== 2 ||
      !React.Children.toArray(children).every((child) => React.isValidElement(child) && child.type === "span")
    ) {
      throw new Error("AnimatedSubscribeButton expects two children, both of which must be <span> elements.");
    }

    const childrenArray = React.Children.toArray(children);
    const initialChild = childrenArray[0];
    const changeChild = childrenArray[1];

    return (
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            ref={ref}
            className={BASE({ className })}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsSubscribed(false);
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span key="action" className={ACTION()} initial={{ y: -50 }} animate={{ y: 0 }}>
              {changeChild} {/* Use children for subscribed state */}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            ref={ref}
            className={cn(
              "bg-primary text-primary-foreground relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none px-6",
              className,
            )}
            onClick={(e) => {
              setIsSubscribed(true);
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span key="reaction" className={REACTION()} initial={{ x: 0 }} exit={{ x: 50, transition: { duration: 0.1 } }}>
              {initialChild} {/* Use children for unsubscribed state */}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    );
  },
);

SubscribeButton.displayName = "SubscribeButton";

// TYPES ***********************************************************************************************************************************
type SubscribeButtonProps = PropsWithChildren<Omit<HTMLMotionProps<"button">, "ref"> & { subscribeStatus?: boolean; className?: string }>;
