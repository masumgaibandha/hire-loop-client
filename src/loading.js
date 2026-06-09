"use client";

import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { ArrowShapeTurnUpRight } from "@gravity-ui/icons";

export default function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      color="primary"
      size="lg"
      className="min-w-40 font-medium"
      isPending={isLoading}
      onPress={handlePress}
    >
      {({ isPending }) => (
        <div className="flex items-center gap-2">
          {isPending ? (
            <>
              <Spinner size="sm" color="current" />
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <ArrowShapeTurnUpRight size={16} />
              <span>Continue</span>
            </>
          )}
        </div>
      )}
    </Button>
  );
}
