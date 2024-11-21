"use client";

import { Card, CardBody, CardFooter, CardHeader, Input , Divider} from "@nextui-org/react";

import { useFormState } from "react-dom";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { updateTeam } from "@/src/actions/team.actions";
import { _teamSchema, teamSchema } from "@/src/schemas/team.schema";
import { body, title } from "@/components/primitives";
import { SubmitButton } from "@/components/ui/form-ui/submit-button";


export const TeamEmail = ({ email, id }: { email: string; id: string }) => {
  const router = useRouter();

  const updateTeamWithId = useCallback(
    async (prevState: any, formData: FormData) => {
      const result = await updateTeam(prevState, formData, id);

      router.refresh();

      return result;
    },
    [id, router],
  );

  const [, formAction] = useFormState(updateTeamWithId, {
    data: null,
    message: "",
    errors: {},
    status: "idle",
 code:undefined,
  });

  const {
    formState: { errors },
    control,
  } = useForm<_teamSchema>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      email: email,
    },
  });

  return (
    <form action={formAction}>
      <Card className="max-w-screen-lg p-1">
        <CardHeader>
          <div className="flex flex-col gap-2 max-w-screen-sm">
            <h1
              className={title({
                size: "h5",
              })}
            >
              Adresse e-mail de l&apos;organisation
            </h1>
            <p className="text-sm text-muted-foreground">
              C&apos;est l&apos;adresse e-mail visible de votre organisation au
              sein de Lunion-Booking.
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-label="email input"
                  errorMessage={errors.email?.message ?? ""}
                  isInvalid={!!errors.email}
                  name="email"
                  placeholder="Entrez l'adresse e-mail de l'organisation"
                  radius="sm"
                  type="email"
                  value={field.value ?? ""}
                />
              )}
            />
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <span className={body({ size: "caption" })}>
            Veuillez utiliser 32 caractères au maximum.
          </span>
          <SubmitButton className="w-fit" color="primary" type="submit">
            Sauvegarder
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
};
