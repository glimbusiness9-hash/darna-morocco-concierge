import { queryOptions } from "@tanstack/react-query";
import { listApprovedProperties, getApprovedProperty } from "./properties.functions";

export const approvedPropertiesQuery = queryOptions({
  queryKey: ["approved-properties"],
  queryFn: () => listApprovedProperties(),
  staleTime: 60_000,
});

export const propertyQuery = (id: string) =>
  queryOptions({
    queryKey: ["approved-property", id],
    queryFn: () => getApprovedProperty({ data: { id } }),
    staleTime: 60_000,
  });
