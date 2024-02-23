"use client";
import Dashboard from "@/components/dashboard";
import { userAtom } from "@/store/atom";
import { Provider as AtomProvider, useAtomValue } from "jotai";

export default function Home() {
  const user = useAtomValue(userAtom);
  return <Dashboard />;
}
