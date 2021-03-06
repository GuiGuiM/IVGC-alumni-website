import { Button, Grid, InputAdornment, makeStyles, Paper, TextField, Theme } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useContext, } from "react";
import { PostFormation } from "./Profile/PostFormation";
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import { palette } from "../constants/colors";
import { FirebaseContext } from "./Firebase";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import { ConstantContext } from "./Firebase/ConstantContext";
import DeleteIcon from '@material-ui/icons/Delete';

export const PostFormationForm = ({ postFormation, updatePostFormation, removePostFormation, index }: { postFormation: PostFormation, updatePostFormation: Function, removePostFormation: Function, index: number }) => {

  const useStyles = makeStyles((theme: Theme) => ({
    textField: {
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: palette.primary.main,
        },
      },
    },
    paper: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),

    },

  }));
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const fieldList = useContext(ConstantContext);


  return (
    <Paper className={classes.paper}>
      <Grid item xs={12}>
        <TextField
          name="school"
          label="Nom de l'école"
          type="name"
          id="school"
          margin="normal"
          fullWidth
          autoFocus
          value={postFormation?.school}
          onChange={(e) => {
            updatePostFormation(index, "school", e.target.value);
          }}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="title"
          label="Nom du diplôme"
          type="name"
          id="title"
          margin="normal"
          fullWidth
          autoFocus
          variant="outlined"
          value={postFormation?.title}
          onChange={(e) => {
            updatePostFormation(index, "title", e.target.value);
          }}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="city"
          label="Ville de l'école"
          type="city"
          id="city"
          margin="normal"
          fullWidth
          autoFocus
          variant="outlined"
          value={postFormation?.city}
          onChange={(e) => {
            updatePostFormation(index, "city", e.target.value);
          }}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="speciality"
          label="Spécialité"
          type="speciality"
          id="speciality"
          margin="normal"
          fullWidth
          autoFocus
          variant="outlined"
          helperText={"L'option ou la spécialisation choisie dans ton école"}
          value={postFormation?.speciality}
          onChange={(e) => {
            updatePostFormation(index, "speciality", e.target.value);
          }}
          className={classes.textField}

        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          disableCloseOnSelect
          filterSelectedOptions={true}
          id="field"
          options={fieldList}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.field}
          value={postFormation?.fields}
          freeSolo
          onChange={(event, values) => updatePostFormation(index, "fields", values)}
          renderInput={(params: any) => (
            <TextField className={classes.textField} {...params} multiline variant="outlined" label={"Domaines"} helperText={"Appuie entrer pour ajouter un tag"} placeholder={"Ecrire ici"} />)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de début"
          inputVariant="outlined"
          cancelLabel="Annuler"
          format="dd/MM/yyyy"
          openTo="year"
          views={["year", "month", "date"]}
          minDate={new Date("01/01/2016")}
          initialFocusedDate={new Date()}
          invalidDateMessage="Mauvaise date"
          value={
            postFormation.startDate
              ? postFormation.startDate.toDate()
              : null}
          onChange={(date) => {
            if (date !== null)
              updatePostFormation(index, "startDate", firebase?.toTimestamp(date));
          }}
          KeyboardButtonProps={{
            'aria-label': "date de début",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de fin"
          inputVariant="outlined"
          cancelLabel="Annuler"
          format="dd/MM/yyyy"
          openTo="year"
          views={["year", "month"]}
          minDate={new Date("01/01/2016")}
          invalidDateMessage="Mauvaise date"
          value={
            postFormation.endDate
              ? postFormation.endDate.toDate()
              : null}
          initialFocusedDate={new Date()}
          onChange={(date) => {
            if (date !== null)
              updatePostFormation(index, "endDate", firebase?.toTimestamp(date));
          }}
          KeyboardButtonProps={{
            'aria-label': "date de fin",
          }}
        />
      </Grid>
      <Grid item xs={12} container justify="center" >
        <Button onClick={(e) => removePostFormation(index)} variant="outlined"
          startIcon={<DeleteIcon />}>Supprimer la formation</Button>
      </Grid>
    </Paper >
  );
}