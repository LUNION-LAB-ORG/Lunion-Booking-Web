import { Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";

export const PlanCard = () => {
  return (
    <Card className="p-4">
      <p className="text-sm font-semibold">Storage almost full</p>
      <p className="mt-2 text-xs">Upgrade your plan to get more storage</p>
      <Progress className="mt-4" color="warning" size="sm" value={80} />
      <Button className="mt-4" color="primary" size="sm" variant="flat">
        Upgrade plan
      </Button>
    </Card>
  );
};
