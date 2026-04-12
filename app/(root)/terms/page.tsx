
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { TermsAndConditions } from "@/components/home/terms-conditions"

export default function Terms() {
    return (
        <div className="min-h-screen flex flex-col">

            <Header/>

            <TermsAndConditions/>

            <Footer />
            
        </div>
    )
}
    