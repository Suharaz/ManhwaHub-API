"use client"
import useLocalStorage from '@/hooks/useLocalStorage';
import axiosClient from '@/libs/axiosClient';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
function LoginGoogle({text}: {text: "signin_with" | "signup_with"}) {
    const [, setUser] = useLocalStorage('user', null);
    return (  
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
            <div className="flex justify-center">
            <GoogleLogin 
                width="100"
                theme="filled_blue"
                shape="circle"
                size="large"
                text={text}
                onSuccess={credentialResponse => {
                    const idToken = credentialResponse.credential || '';
                    const decodedToken: any = jwtDecode(idToken);
                    const user = {
                        email: decodedToken.email,
                        name: decodedToken.name,
                        avatar: decodedToken.picture,
                        google_id: decodedToken.sub
                    };
                    axiosClient.post('/baseapi/auth/v1/google', user).then((res) => {
                        if (res.data.status == "success") {
                            setUser(res.data.user);
                            window.location.reload();
                        }else{
                            alert(res.data.message);
                        }
                    });
                }}
                onError={() => {
                    alert('Đăng nhập thất bại');    
                }}
            />
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginGoogle;