"use client";

import { Divider, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { IconAntennaBars3 } from "@tabler/icons-react";

import { updateTeam } from "@/src/actions/team.actions";
import { _teamSchema, teamSchema } from "@/src/schemas/team.schema";
import { body, title } from "@/components/primitives";

export const BillingPlan = ({ name, id }: { name: string; id: string }) => {
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
      name: name,
    },
  });

  return (
    <form action={formAction}>
      <Card className="max-w-screen-lg p-1">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 w-full">
            <h1
              className={title({
                size: "h5",
                className: "text-primary",
              })}
            >
              {name}
            </h1>
            <Button className="w-fit" size="sm" variant="bordered">
              Voir la facture
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex items-center text-sm gap-1 max-w-screen-sm text-center">
              <IconAntennaBars3 className="text-primary" size={36} />
              <p className="top-1 relative">
                Votre forfait comprend un montant fixe d’utilisation gratuite.
              </p>
            </div>
            <div className="max-w-screen-sm text-center">
              <p className="text-sm">
                Pour débloquer une utilisation supplémentaire et ajouter des
                membres à votre équipe, mettez à niveau votre forfait vers Pro.
                Tarifs et forfaits Passer à Pro
              </p>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <span className={body({ size: "caption" })}>
            Cette fonctionnalité est disponible sur{" "}
            <span className="cursor-pointer underline text-primary">
              le forfait Pro
            </span>
            .
          </span>
          <Button color="primary">Mise à niveau</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
