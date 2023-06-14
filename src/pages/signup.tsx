"use client";
import {Header} from "@/components/header/header";
import {Footer} from "@/components/footer/footer";
import SignupCard from "@/components/cards/signupCard";
import {NextPage} from "next";
import {UserRequest} from "@/schemas/user.schema";

const Signup: NextPage = () => {
  return (
    <>
      <Header />
      <SignupCard />
      <Footer />
    </>
  )
}

export default Signup
