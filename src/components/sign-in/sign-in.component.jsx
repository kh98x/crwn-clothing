import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { emailSignInStart } = this.props
        const { email, password } = this.state

        emailSignInStart(email, password)

    }

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value})
    }

    render(){
        const { googleSignInStart } = this.props

        return (
            <div className="sign-in" onSubmit={this.handleSubmit}>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form action="">
                    <FormInput name="email"
                           type="email" 
                           value={this.state.email} 
                           handleChange={this.handleChange}       
                           required
                           label="email"
                     />
                    <FormInput name="password" type="password"
                           value={this.state.password}
                           handleChange={this.handleChange}
                           required
                           label="password"
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton 
                            type="button"
                            onClick={googleSignInStart}
                            isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton> 
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);