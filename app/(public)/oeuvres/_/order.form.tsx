"use client";

import { SubscribeButton } from "@/components/ui/button-subscribe";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// ROOT ************************************************************************************************************************************
export function OrderForm({ className }: OrderFormProps) {
  const form = useForm({
    mode: "onTouched",
    // resolver: zodResolver(zContactValues),
    // errors: state?.errors,
    // defaultValues: state?.data ?? defaultContactValues,
  });

  const { control, formState, handleSubmit, reset } = form;

  return (
    <Form {...form}>
      <form onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className="flex-1 space-y-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <FormField
            control={control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Ton prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="surname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Ton nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courriel</FormLabel>
              <FormControl>
                <Input placeholder="Ton courriel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Ton message" rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubscribeButton className="justify-self-end">
          <span className="group inline-flex items-center">
            Envoyer
            <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="group inline-flex items-center">
            <CheckIcon className="mr-2 size-4" />
            Subscribed
          </span>
        </SubscribeButton>
      </form>
    </Form>
  );
}

// TYPE ************************************************************************************************************************************
export type OrderFormProps = { className?: string };
