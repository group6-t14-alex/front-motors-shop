"use client";
import Head from "next/head";
import { Inter } from "next/font/google";
import CardWrapper from "@/components/cards/cardWrapper";
<<<<<<< HEAD
import { Footer } from "@/components/footer/footer";
=======
import ButtonSeeFilters from "@/components/buttons/buttonsFilter";
import Filter from "@/components/filter/filter";
import FilterDesk from "@/components/filter/filterDesk";
>>>>>>> dbea6ab878e5efecf0306b1c4e014876b803cccf
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
<<<<<<< HEAD
        <Footer />
=======
        <CardWrapper />

        <ButtonSeeFilters />
        <FilterDesk />

>>>>>>> dbea6ab878e5efecf0306b1c4e014876b803cccf
      </main>
    </>
  );
}
