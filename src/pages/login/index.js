import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Login = () => {
    const auth = getAuth();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    };


    return (
        <div className="flex items-center justify-center h-screen">
            <button 
                className="px-4 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none"
                onClick={handleLogin}
            >
                Login with Google
            </button>
        </div>
    );
}

export default Login;