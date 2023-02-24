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
import { forgottenPassword } from '../auth/actions/userActions';
import { useHistory, useParams} from 'react-router-dom';

const ForgottenPass = ({forgottenPassword}) => {
    const navigate  = useHistory();
    const {userEmail} = useParams();
  return (
    <div>
        <StyledFormArea>
            <Avatar image={Logo} />
            <StyledTitle color={colors.primary} size={30}>
                Password Reset
            </StyledTitle>
            <Formik
                initialValues={{
                    email: userEmail,
                    redirectUrl: "http://localhost:3000/passwordreset"
                }}

                validationSchema={
                    Yup.object({
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                    })
                }


                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    forgottenPassword(values, navigate, setFieldError, setSubmitting)
                }}
            >
                
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="email"
                            type="text"
                            label="Enter your email address"
                            placeholder="fithub@example.com"
                            icon={<FiMail/>}
                        />
                        <ButtonGroup>
                            { !isSubmitting && (
                            <StyledFormButton type="submit">Submit</StyledFormButton>  
                            )}

                            { isSubmitting && (
                                <ThreeDots 
                                height="49" 
                                width="100" 
                                radius="9"
                                color={colors.theme}
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
                Back to login page? <TextLink to='/login'>Login</TextLink>
            </ExtraText>
            
        </StyledFormArea>
        <CopyrightText>
            All right reserved &copy;2022
        </CopyrightText>
    </div>
  )
}

export default ForgottenPass
// export default connect(null, {forgottenPassword})(ForgottenPass);