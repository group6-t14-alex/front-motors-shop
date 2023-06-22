'use client';
import { Footer } from "@/components/footer/footer"
import { RecoveryEmailForm } from "@/components/forms/recoveryEmailForm";
import { Header } from "@/components/header/header";
import { NextPage } from "next";

const ResetPasswordEmail: NextPage = () => {

    return (
        <>
            <Header/>
            <RecoveryEmailForm />
            <Footer />
        </>
    )
}

export default ResetPasswordEmail
