import { LoadingSwap } from "@/components/adapted/loading-swap";
import { Btn } from "@/components/btn";
import { useFormContext } from "@/hooks/form-context";

export default function Submit({ ref }: { ref?: React.Ref<HTMLButtonElement> }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Btn ref={ref}>
          <LoadingSwap isLoading={isSubmitting}>Envoyer</LoadingSwap>
        </Btn>
      )}
    </form.Subscribe>
  );
}
