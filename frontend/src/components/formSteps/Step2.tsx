import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export default function Step2({ register, errors  }: Props) {
  return (
    <div>
        <input
          type="text"
          {...register("otro", {
            required: "La otro es obligatoria",
            min: { value: 1, message: "otro inválida" },
          })}
          placeholder="Otro"
          className="border p-2 w-full rounded"
        />
        {errors.otro && <p className="text-red-500 text-sm">{errors.otro.message}</p>}
      </div>
  );
}
