import Login, { LoginType } from "~/components/login";
import { api } from "~/trpc/server";

export default async function LoginPage() {
    const handleOnSubmit = (loginPayload: LoginType) => {
        api.auth.login(loginPayload)
    }
    return (
        <main>
            <Login onSubmit={handleOnSubmit} />
        </main>
    );
}
