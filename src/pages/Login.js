import React from 'react'

//styled components
import { StyledTextInput, StyledFormArea,StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText} from '../components/Styles'

import Logo from './../assets/favicon.ico'

//formit
import {Formik, Form} from 'formik';
import { TextInput } from '../components/formLib';
import * as Yup from 'yup'

//icons
import {FiMail, FiLock} from 'react-icons/fi'

//loader
import {ThreeDots} from 'react-loader-spinner';

//auth & redux
import { connect } from 'react-redux';
import { loginUser } from '../auth/actions/userActions';
import { useHistory , useParams} from 'react-router-dom';

const Login = ({loginUser}) => {
    const navigate  = useHistory();
    const {userEmail} = useParams();
  return (
    <div>
        <StyledFormArea>
            <Avatar image={Logo} />
            <StyledTitle color={colors.primary} size={30}>
            Chandiran Readymades <div>Login</div>
            </StyledTitle>
            <Formik
                initialValues={{
                    email: userEmail,
                    password: ""
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
                    })
                }


                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    console.log(values);
                    loginUser(values, navigate, setFieldError, setSubmitting)
                }}
            >
                
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="fithub@example.com"
                            icon={<FiMail/>}
                        />
                        <TextInput 
                            name="password"
                            type="password"
                            label="password"
                            placeholder="*********"
                            icon={<FiLock/>}
                        />

                        <ButtonGroup>
                            { !isSubmitting && (
                            <StyledFormButton  type="submit">Login</StyledFormButton>  
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
                Forgotten Password? <TextLink to='/forgottenpassword'>Reset it</TextLink>
            </ExtraText>
            <ExtraText>
                New here? <TextLink to='/signup'>SignUp</TextLink>
            </ExtraText>
        </StyledFormArea>
        <CopyrightText>
            All right reserved &copy;2022
        </CopyrightText>
    </div>
  )
}

// export default connect(null, {loginUser})(Login);
export default Login