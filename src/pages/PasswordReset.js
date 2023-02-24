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
import { resetPassword } from '../auth/actions/userActions';
import { useHistory, useParams} from 'react-router-dom';

const PasswordReset = ({resetPassword}) => {
    const navigate  = useHistory();
    const {userId, resetString} = useParams();
  return (
    <div>
        <StyledFormArea>
            <Avatar image={Logo} />
            <StyledTitle color={colors.theme} size={30}>
                Password Reset
            </StyledTitle>
            <Formik
                initialValues={{
                    newPassword: "",
                    confirmNewPassword: "",
                    userId,
                    resetString
                }}

                validationSchema={
                    Yup.object({
                        newPassword: Yup.string()
                          .min(8, "Password is too short")
                          .max(30, "Password is too long")
                          .required("Required"),
                        confirmNewPassword: Yup.string()
                            .required("Required")
                            .oneOf([Yup.ref("newPassword")], "Password must match"),
                    })
                }


                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    console.log(values);
                    resetPassword(values, navigate, setFieldError, setSubmitting)
                }}
            >
                
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="newPassword"
                            type="password"
                            label="New Password"
                            placeholder="*********"
                            icon={<FiLock/>}
                        />
                        <TextInput 
                            name="confirmNewPassword"
                            type="password"
                            label="Confirm New Password"
                            placeholder="*********"
                            icon={<FiLock/>}
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
            
        </StyledFormArea>
        <CopyrightText>
            All right reserved &copy;2022
        </CopyrightText>
    </div>
  )
}

export default PasswordReset;