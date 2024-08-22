
import { api, HydrateClient } from "~/trpc/server";
import styles from "./index.module.css";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("login")
  
  return (
    <HydrateClient>
      <main className={styles.main}>

      </main>
    </HydrateClient>
  );
}
