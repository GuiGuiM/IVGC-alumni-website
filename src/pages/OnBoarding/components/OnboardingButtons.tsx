import { makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../../../components/Firebase/context";
import { Profile } from "../../../components/Firebase/firebase_interfaces";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import * as ROUTES from '../../../constants/routes';


const useStyles = makeStyles((theme: Theme) => ({
  buttonNext: {
    marginTop: theme.spacing(2),
    alignItems: "left",
  }
}));



export const ButtonNext = () => {
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const goNext = async () => {
    if (profile.onBoarding < 1) {
      profile.onBoarding += 1;
      console.log("GO next", profile);
      firebase?.updateProfile(profile);
      await changeKey("onBoarding", profile.onBoarding);
    }
  };

  return (<Button variant="contained" color="primary" className={classes.buttonNext}
    onClick={goNext}>Suivant</Button>);
}


export const ButtonPrevious = () => {
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const goPrevious = async () => {
    if (profile.onBoarding > 0) {
      profile.onBoarding -= 1;
      console.log("GO next", profile);
      firebase?.updateProfile(profile);
      await changeKey("onBoarding", profile.onBoarding);
    }
  };


  return (<Button variant="outlined" color="secondary"
    onClick={goPrevious}>Précédent</Button>);
}


export const ButtonLast = () => {
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const goProfile = async () => {
    console.log("GO profile");
    profile.onBoarding += 1;
    console.log("GO next", profile);
    firebase?.updateProfile(profile);
    await changeKey("onBoarding", profile.onBoarding);
    history.push(ROUTES.MY_PROFILE);

  };

  return (<Button variant="contained" color="primary" className={classes.buttonNext}
    onClick={goProfile}>Terminer</Button>);
}
