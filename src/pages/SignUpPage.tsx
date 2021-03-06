import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as ROUTES from '../constants/routes';
import AlumniLogo from '../components/AlumniLogo';
import FirebaseContext from '../components/Firebase/context';
import { useState } from 'react';
import { palette } from '../constants/colors';
import { isEmailValid, isPasswordValid } from '../Utils';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  textField: {

    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },

    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();

  return (
    <>
      <AlumniLogo height={100} width="auto" />
      <Container component="main" maxWidth="xs" >
        <div className={classes.paper}>
          <SignUpForm />
          <Divider className={classes.divider} style={{ width: '100%' }} />
          <SignInLink />
        </div>
      </Container>
    </>
  );
}


const SignUpForm = () => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const defaultInputs = {
    email: '',
    password: '',
    passwordCheck: ''
  };
  const [inputValues, setInputValues] = useState(defaultInputs);
  const [inputErrors, setInputErrors] = useState({
    emailError: false,
    passwordError: false,
    passwordCheckError: false
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const checkErrors = (inputs: {
    email: string,
    password: string,
    passwordCheck: string
  }) => {
    const emailValid = isEmailValid(inputs.email);
    const passwordValid = isPasswordValid(inputs.password);
    const samePassword = inputs.password === inputs.passwordCheck;
    setInputErrors({
      emailError: !emailValid,
      passwordError: !passwordValid,
      passwordCheckError: !samePassword
    });
    return emailValid && passwordValid && samePassword;
  }

  const sumbitUser = async function () {
    const formIsValid = checkErrors(inputValues);
    if (formIsValid && firebase) {
      firebase.doCreateUserWithEmailAndPassword(inputValues.email, inputValues.password);
      setInputValues(defaultInputs);
      history.push(ROUTES.ONBOARDING);
    }
  }

  return (
    <FormControl className={classes.form} >
      <Typography color="primary" variant="h5" align="center">Créer un compte</Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        error={inputErrors.emailError}
        autoComplete="email"
        onChange={handleInputChange}
        helperText={inputErrors.emailError
          ? "Veuillez entrer un email valide"
          : ""}
        autoFocus
        className={classes.textField}
      />
      <TextField
        name="password"
        label="Mot de passe"
        type="password"
        id="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        error={inputErrors.passwordError}
        className={classes.textField}
        autoComplete="current-password"
        onChange={handleInputChange}
        helperText={inputErrors.passwordError
          ? "Le mot de passe doit faire plus de 6 caractères."
          : ""}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        error={inputErrors.passwordCheckError}
        name="passwordCheck"
        label="Répéter le mot de passe"
        type="password"
        id="passwordCheck"
        helperText={inputErrors.passwordCheckError
          ? "Veuillez entrer le même mot de passe"
          : ""}
        onChange={handleInputChange}
        className={classes.textField}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={sumbitUser}
      >
        Rejoindre la communauté
      </Button>
    </FormControl>
  );
}

function SignInLink() {
  return (
    <span style={{ float: "left", width: "100%" }}>
      <Link href={ROUTES.SIGN_IN} variant="body2" color="secondary" >
        {"Déjà un compte ? Se connecter"}
      </Link>
    </span>
  );
}
