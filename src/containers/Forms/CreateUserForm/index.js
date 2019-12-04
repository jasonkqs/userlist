import React, { Component } from "react";
import { connect } from "react-redux";
import Typograghy from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";

import CreateNewUserConfirmButton from "../../Buttons/CreateNewUserConfirmButton";
import CancelButton from "../../Buttons/CancelButton";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  container: {
    width: theme.spacing.unit * 57
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: theme.spacing.unit * 37
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: theme.spacing.unit * 37
  },
  group: {
    display: "flex",
    flexDirection: "row"
  },
  rightFormControlLabel: {
    marginLeft: theme.spacing.unit * 3
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        touched: false,
        value: "",
        invalid: true
      },
      lastName: { touched: false, value: "", invalid: true },
      sex: { touched: false, value: "", invalid: true },
      age: { touched: false, value: "", invalid: true },
      password: { touched: false, value: "", invalid: true },
      repeat: { touched: false, value: "", invalid: true },
      saveChangesButtonDisabled: true
    };
  }

  onBlurHandler = input => {
    const newState = {
      ...this.state
    };
    newState[input] = { ...newState[input], touched: true };
    this.setState(newState);
  };

  onChangeFirstNameHandler = e => {
    const { firstName, lastName, sex, age, password, repeat } = this.state;
    const invalid = !e.target.value;
    const saveChangesButtonDisabled =
      invalid ||
      lastName.invalid ||
      sex.invalid ||
      age.invalid ||
      password.invalid ||
      repeat.invalid;

    this.setState({
      ...this.state,
      firstName: { ...firstName, value: e.target.value, invalid },
      saveChangesButtonDisabled
    });
  };

  onChangeLastNameHandler = e => {
    const { firstName, lastName, sex, age, password, repeat } = this.state;
    const invalid = !e.target.value;
    const saveChangesButtonDisabled =
      firstName.invalid ||
      invalid ||
      sex.invalid ||
      age.invalid ||
      password.invalid ||
      repeat.invalid;

    this.setState({
      ...this.state,
      lastName: { ...lastName, value: e.target.value, invalid },
      saveChangesButtonDisabled
    });
  };

  onChangeSexHandler = e => {
    const { firstName, lastName, sex, age, password, repeat } = this.state;
    const invalid = !e.target.value;
    const saveChangesButtonDisabled =
      firstName.invalid ||
      lastName.invalid ||
      invalid ||
      age.invalid ||
      password.invalid ||
      repeat.invalid;

    this.setState({
      ...this.state,
      sex: { ...sex, value: e.target.value, invalid },
      saveChangesButtonDisabled
    });
  };

  onChangeAgeHandler = e => {
    const { firstName, lastName, sex, age, password, repeat } = this.state;
    const { value } = e.target;
    const invalid = !value;
    const saveChangesButtonDisabled =
      firstName.invalid ||
      lastName.invalid ||
      sex.invalid ||
      invalid ||
      password.invalid ||
      repeat.invalid;

    this.setState({
      ...this.state,
      age: { ...age, value, invalid },
      saveChangesButtonDisabled
    });
  };

  onChangePasswordHandler = e => {
    const { firstName, lastName, sex, age, password, repeat } = this.state;
    const { value } = e.target;
    const invalid =
      !value || !/^\w{6,10}$/.test(e.target.value) ;
    const repeatInvalid = repeat.value === "" || repeat.value !== value;
    const saveChangesButtonDisabled =
      firstName.invalid ||
      lastName.invalid ||
      sex.invalid ||
      age.invalid ||
      invalid ||
      repeatInvalid;

    this.setState({
      ...this.state,
      password: { ...password, value: e.target.value, invalid },
      repeat: { ...repeat, invalid: repeatInvalid },
      saveChangesButtonDisabled
    });
  };

  onChangeRepeatHandler = e => {
    const { firstName, lastName, sex, age, password, repeat } = this.state;
    const { value } = e.target;
    const invalid = !value || value !== password.value;
    const saveChangesButtonDisabled =
      firstName.invalid ||
      lastName.invalid ||
      sex.invalid ||
      age.invalid ||
      password.invalid ||
      invalid;

    this.setState({
      ...this.state,
      repeat: { ...repeat, value, invalid },
      saveChangesButtonDisabled
    });
  };

  reset = () => {
    this.setState({
      firstName: { touched: false, value: "", invalid: true },
      lastName: { touched: false, value: "", invalid: true },
      sex: { touched: false, value: "", invalid: true },
      age: { touched: false, value: "", invalid: true },
      password: { touched: false, value: "", invalid: true },
      repeat: { touched: false, value: "", invalid: true },
      saveChangesButtonDisabled: true
    });
    this.inputFirstName.focus();
  };

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      sex,
      age,
      password,
      repeat,
      saveChangesButtonDisabled
    } = this.state;

    return (
      <div>
        <Typograghy className={classes.header} variant="h2" color="primary">
          Create User
        </Typograghy>
        <Paper className={classes.container}>
          <form>
            <TextField
              error={firstName.touched && firstName.invalid}
              id="firstName-error"
              label="First Name"
              value={firstName.value}
              className={classes.textField}
              margin="normal"
              helperText={
                firstName.touched && !firstName.value ? "Required" : null
              }
              onChange={this.onChangeFirstNameHandler}
              onBlur={() => this.onBlurHandler("firstName")}
              autoFocus
              inputRef={input => (this.inputFirstName = input)}
            />
            <br />
            <TextField
              error={lastName.touched && lastName.invalid}
              id="lastName-error"
              label="Last Name"
              value={lastName.value}
              className={classes.textField}
              margin="normal"
              helperText={
                lastName.touched && !lastName.value ? "Required" : null
              }
              onChange={this.onChangeLastNameHandler}
              onBlur={() => this.onBlurHandler("lastName")}
            />
            <br />
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={sex.invalid}
            >
              <FormLabel component="legend">Sex</FormLabel>
              <RadioGroup
                aria-label="sex"
                name="sex"
                className={classes.group}
                value={sex.value}
                onChange={this.onChangeSexHandler}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio color="default" />}
                  label="Female"
                />
                <FormControlLabel
                  className={classes.rightFormControlLabel}
                  value="Male"
                  control={<Radio color="default" />}
                  label="Male"
                />
              </RadioGroup>
              {sex.value === "" ? (
                <FormHelperText id="component-helper-text">
                  Required
                </FormHelperText>
              ) : null}
            </FormControl>
            <br />
            <TextField
              error={age.touched && age.invalid}
              id="age-error"
              label="Age"
              type="number"
              value={age.value}
              className={classes.textField}
              margin="normal"
              helperText={!age.touched ? null : !age.value ? "Required" : null}
              onChange={this.onChangeAgeHandler}
              onBlur={() => this.onBlurHandler("age")}
            />
            <br />
            <TextField
              error={password.touched && password.invalid}
              id="password-error"
              label="Password"
              type="password"
              value={password.value}
              className={classes.textField}
              margin="normal"
              helperText={
                !password.touched
                  ? null
                  : !password.value
                  ? "Required"
                  : password.invalid
                  ? "The password is invalid"
                  : null
              }
              onChange={this.onChangePasswordHandler}
              onBlur={() => this.onBlurHandler("password")}
            />
            <br />
            <TextField
              error={repeat.touched && repeat.invalid}
              id="repeat-error"
              label="Repeat"
              type="password"
              value={repeat.value}
              className={classes.textField}
              margin="normal"
              helperText={
                !repeat.touched
                  ? null
                  : !repeat.value
                  ? "Required"
                  : repeat.invalid
                  ? "Repeat must match password"
                  : null
              }
              onChange={this.onChangeRepeatHandler}
              onBlur={() => this.onBlurHandler("repeat")}
            />
            <br />
            <div className={classes.buttons}>
              <CreateNewUserConfirmButton
                firstName={firstName.value}
                lastName={lastName.value}
                sex={sex.value}
                age={age.value}
                password={password.value}
                disabled={saveChangesButtonDisabled}
              />
              <CancelButton />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    flag: state.flag
  };
};

export default withStyles(styles)(connect(mapStateToProps)(CreateUserForm));
