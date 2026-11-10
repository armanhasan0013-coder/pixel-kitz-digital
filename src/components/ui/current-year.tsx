"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Renders the current year on the client; falls back to the build-time year on the server. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year ?? "2026"}</>;
}
