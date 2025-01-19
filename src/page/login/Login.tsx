    import { Formik, Form, Field, ErrorMessage } from "formik";
    import axios from "axios";
    import { Button, Input } from "antd";

    import initialValues from "./helper/initialValues";
    import validationSchema from "./helper/validationSchema";
    import { triggerNotification } from "../../components/toaster/ToastBar";

    import "./Login.css"
    import { setAuthentication } from "../../redux/slice/authSlice";
    import { useDispatch } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { useState } from "react";

    interface formData {
        [key: string]: string;
    }
    
    const Login = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        const [showPassword, setShowPassword] = useState<boolean>(true);


        const handleSubmit = async (values: formData, { setSubmitting }: any) => {
            try {
            const response = await axios.get(`${baseUrl}/auth`);
            const { username, password } = response.data;
            
            if (values.username === username && values.password === password) {

                dispatch(
                    setAuthentication(
                        { ...response.data }
                    ),
                );
                localStorage.setItem("auth","true")
                localStorage.setItem("username",username)

                navigate('/')

            } else {
                triggerNotification("error", "", "Invalid username or password" , "topRight");

            }
            } catch (error) {
                triggerNotification("error", "", "Error while fetching data" , "topRight");

            }
            setSubmitting(false);
        };


        const handleShowPassword = ()=>{
            setShowPassword(!showPassword)
        }
        return (
            <div className="flex h-full items-center justify-center">
            <div className = "login-container p-5  max-w-[400px] mx-0 mx-auto" >
            <h2 className="text-[24px] text-center bold pb-10 text-[#d34a7c]">Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form>
                    <div className="formGroup">
                        <div className="relative mb-8">
                            <label htmlFor="username" className="block text-left ">Username</label>
                            <Field className = "text-[16px]" as={Input} id='username'  type="text" name="username" placeholder="Enter username" />
                            <ErrorMessage className="error-message"  name="username" component="div" />
                        </div>

                        <div className="relative mb-8">
                            <label htmlFor="password" className="block text-left">Password</label>
                            <Field as={Input} className = "text-[16px]" type={showPassword ? "Password" : "text"} id='password'  name="password" placeholder="Enter password" />
                            <span className="material-symbols-outlined absolute bottom-[10px] right-4 text-[20px]
                            text-[#000] cursor-pointer" onClick={()=>{handleShowPassword()}}>{showPassword ? "visibility_off" :" visibility"}</span>
                            <ErrorMessage className="error-message"  name="password" component="div" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button type="primary" disabled={isSubmitting} className="login-btn w-full" htmlType="submit">
                        {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </div>

                </Form>
                )}
            </Formik>
            </div>
            </div>
        );
    };

    export default Login;
