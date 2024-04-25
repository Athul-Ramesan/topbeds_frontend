import { Link } from "react-router-dom"


const EmailVerification = () => {
    return (
        <div>
            <h3>Please verify your account</h3>
            <p>
                A verification email has been sent to your email address. Please verify
                your account to continue.
            </p>
            <p>
                <Link to="/">Go to home page</Link>
            </p>

        </div>
    )
}

export default EmailVerification
