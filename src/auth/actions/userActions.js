import axios from "axios";
import { sessionService } from "redux-react-session";

//the remote endpoint and local
// const remoteUrl = "https://hjk-app.herokuapp.com/";
const remoteUrl = "https://login-api-ybui.onrender.com/";
const localUrl = "http://localhost:5000/";
const currentUrl = remoteUrl;

export const loginUser = (values, history, setFieldError, setSubmitting) => {
    // make check and get some data
    return () => {

    axios.post(`${currentUrl}user/signin`, values,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} =response;

        if(data.status === "FAILED") {
            const { message }= data;

            //check for specific error
            // if (message.includes("email")) {
                // setFieldError("email", message);
                

                //setFieldError("password", message);
            // } else 
            if (message.includes("password")){
                setFieldError("password",message);
                console.log(message);
                history.push("/Home")
            }else if(message.toLowerCase().includes("email")){
                setFieldError("email", message);
                // setFieldError("password", "Invalid password entered");
            }else {
                setFieldError("email", message);
                setFieldError("password", "Invalid password entered");
            }
                
            }
        // } 
        else if(data.status === "SUCCESS")
        
         {
            const userData = data.data[0];
            const token = userData._id;

            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(userData).then(() => {
                    console.log(userData);
                    history.push("/Home")
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }

        //complete submitting
        setSubmitting(false);

    }).catch(err => console.error(err))
}
}

export const signupUser = (credentials, history, setFieldError, setSubmitting) => {
    return (dispatch) => {
        console.log(credentials)
    axios.post(`${currentUrl}user/signup`, credentials,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} =response;
        console.log(data);

        if(data.status === "FAILED"){
            const {message} = data;
            //check for specific error
            if(message.includes("name")){
                setFieldError("name",message)
            }else if(message.includes("email")){
                setFieldError("email",message)
            }else if(message.includes("date")){
                setFieldError("dateOfBirth",message)
            }else if(message.includes("password")){
                setFieldError("password",message)
            }
            

        }else if(data.status === "PENDING"){
            //display messsage for email verification
            const {email} = credentials;
            history.push(`/emailsent/${email}`);


        }
        setSubmitting(false)
    }).catch((err) => console.error(err.response.data))   
    }
}

export const logoutUser = (history) => {
    return () => {
        //  navigate.dispatch("http://localhost:3000/");
        // sessionService.deleteSession();
        // sessionService.deleteUser();
        // history("/login");
        sessionService.deleteSession().then(() => {
            sessionService.deleteUser().then(() => {
                history.push("/")
            }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
}

export const forgottenPassword = (values, history, setFieldError, setSubmitting) => {
    
    // make check and get some data
    return () => {

    axios.post(`${currentUrl}user/requestPasswordReset`, values,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} =response;

        if(data.status === "FAILED") {
            const { message }= data;

            //check for specific error
            // if (message.includes("email")) {
                // setFieldError("email", message);
                

                //setFieldError("password", message);
            // } else 
            if (message.toLowerCase().includes("password") || message.toLowerCase().includes("user") || message.toLowerCase().includes("email")){
                setFieldError("email",message);
            }
                
            }
        // } 
        else if(data.status === "PENDING")        
        {
            const {email} = values;
            history.push(`/emailsent/${email}/${true}`);            
        }

        //complete submitting
        setSubmitting(false);

    }).catch(err => console.error(err))
}
}

//Actual reset
export const resetPassword = (values, history, setFieldError, setSubmitting) => {
    
    // make check and get some data
    return () => {

    axios.post(`${currentUrl}user/resetPassword`, values,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} =response;

        if(data.status === "FAILED") {
            const { message }= data;

            //check for specific error
            // if (message.includes("email")) {
                // setFieldError("email", message);
                

                //setFieldError("password", message);
            // } else 
            if (message.toLowerCase().includes("password")){
                setFieldError("newPassword",message);
            }
                
            }
        // } 
        else if(data.status === "SUCCESS")        
        {
            history.push(`/emailsent`);            
        }

        //complete submitting
        setSubmitting(false);

    }).catch(err => console.error(err))
}
}