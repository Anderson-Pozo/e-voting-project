import { useRouter } from "next/router";

function ProcessLogin() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>Login Process { id }</div>
    )
}

export default ProcessLogin;
