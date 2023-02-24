import React from 'react'

//styled components
import { StyledTextInput, StyledFormArea,StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText} from '../components/Styles'

import Logo from './../assets/favicon.ico'

//formit
import {Formik, Form} from 'formik';
import { TextInput } from '../components/formLib';
import * as Yup from 'yup'

//icons
import {FiMail, FiLock, FiUser, FiCalendar} from 'react-icons/fi'

//loader
import {ThreeDots} from 'react-loader-spinner';

//auth & redux
import { connect } from 'react-redux';
import { signupUser } from '../auth/actions/userActions';
import { useHistory  } from 'react-router-dom';

const Signup = ({signupUser}) => {
    const navigate = useHistory();
  return (
    <div>
        <StyledFormArea>
            <Avatar image={Logo} />
            <StyledTitle color={colors.primary} size={30}>
            Chandiran Readymades<div>SignUp</div>
            </StyledTitle>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    repeatPassword: "",
                    doB: "",
                    name: ""
                }}

                validationSchema={
                    Yup.object({
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                        password: Yup.string()
                          .min(8, "Password is too short")
                          .max(30, "Password is too long")
                          .required("Required"),
                        name: Yup.string()
                          .required("Required"),
                          doB: Yup.string()
                          .required("Required"),
                        repeatPassword: Yup.string()
                          .required("Required")
                          .oneOf([Yup.ref("password")], "Password must match")
                    })
                }


                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    console.log(values);
                    signupUser(values, navigate, setFieldError, setSubmitting)
                }}
            >
                
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="User name"
                            icon={<FiUser/>}
                        />
                        
                        <TextInput 
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="fithub@example.com"
                            icon={<FiMail/>}
                        />
                        
                        <TextInput 
                            name="doB"
                            type="date"
                            label="Date Of Birth"
                            icon={<FiCalendar/>}
                        />
                        <TextInput 
                            name="password"
                            type="password"
                            label="password"
                            placeholder="*********"
                            icon={<FiLock/>}
                        />

                        <TextInput 
                            name="repeatPassword"
                            type="password"
                            label="Repeat Password"
                            placeholder="*********"
                            icon={<FiLock/>}
                        />

                        <ButtonGroup>
                            { !isSubmitting && (
                            <StyledFormButton type="submit">SignUp</StyledFormButton>  
                            )}

                            { isSubmitting && (
                                <ThreeDots 
                                height="49" 
                                width="100" 
                                radius="9"
                                color={colors.primary}
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                                 />
                            )}
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <ExtraText>
                Already have an account? <TextLink to='/login'>Login</TextLink>
            </ExtraText>
        </StyledFormArea>
        <CopyrightText>
            All right reserved &copy;2022
        </CopyrightText>
    </div>
  )
}

// export default connect(null, {signupUser})(Signup);
export default Signup