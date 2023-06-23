'use client';
import { Footer } from "@/components/footer/footer"
import { ResetPasswordForm } from "@/components/forms/resetPasswordForm";
import { Header } from "@/components/header/header";

import { NextPage } from "next";
import { useRouter } from "next/router";


const ResetPassword: NextPage = () => {
    const router = useRouter();
    const { token } = router.query;
    console.log(token)

    return (
        <>
            <Header/>
            <ResetPasswordForm token={token as string}/>
            <Footer />
        </>
    )
}

export default ResetPassword