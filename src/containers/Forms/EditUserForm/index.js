import React, { Component } from "react";
import { connect } from "react-redux";
import Typograghy from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";

import SaveChangesButton from "../../Buttons/SaveChangesButton";
import CancelButton from "../../Buttons/CancelButton";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  container: {
    width: theme.spacing.unit * 59
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: theme.spacing.unit * 39
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: theme.spacing.unit * 39
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

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    const { selectedUser } = props.data;

    if (selectedUser) {
      const { _id, firstName, lastName, sex, age, password } = selectedUser;

      this.state = {
        _id,
        firstName: { value: firstName, invalid: false },
        lastName: { value: lastName, invalid: false },
        sex: { value: sex, invalid: false },
        age: { value: age, invalid: false },
        password: { value: password, invalid: false },
        repeat: { value: password, invalid: false },
        saveChangesButtonDisabled: false
      };
    }
  }

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
    const invalid = !value || !/^\w{6,10}$/.test(e.target.value);
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
    const { selectedUser } = this.props.data;

    const { _id, firstName, lastName, sex, age, password } = selectedUser;

    this.setState({
      _id,
      firstName: { value: firstName, invalid: false },
      lastName: { value: lastName, invalid: false },
      sex: { value: sex, invalid: false },
      age: { value: age, invalid: false },
      password: { value: password, invalid: false },
      repeat: { value: password, invalid: false },
      saveChangesButtonDisabled: false
    });
    this.inputFirstName.focus();
  };

  render() {
    const { classes } = this.props;
    const {
      _id,
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
          Edit User
        </Typograghy>
        <Paper className={classes.container}>
          <form>
            <TextField
              error={firstName.invalid}
              id="firstName-error"
              label="First Name"
              value={firstName.value}
              className={classes.textField}
              margin="normal"
              helperText={!firstName.value ? "Required" : null}
              onChange={this.onChangeFirstNameHandler}
              autoFocus
              inputRef={input => (this.inputFirstName = input)}
            />
            <br />
            <TextField
              error={lastName.invalid}
              id="lastName-error"
              label="Last Name"
              value={lastName.value}
              className={classes.textField}
              margin="normal"
              helperText={!lastName.value ? "Required" : null}
              onChange={this.onChangeLastNameHandler}
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
              error={age.invalid}
              id="age-error"
              label="Age"
              type="number"
              value={age.value}
              className={classes.textField}
              margin="normal"
              helperText={!age.value ? "Required" : null}
              onChange={this.onChangeAgeHandler}
            />
            <br />
            <TextField
              error={password.invalid}
              id="password-error"
              label="Password"
              type="password"
              value={password.value}
              className={classes.textField}
              margin="normal"
              helperText={
                !password.value
                  ? "Required"
                  : password.invalid
                  ? "The password is invalid"
                  : null
              }
              onChange={this.onChangePasswordHandler}
            />
            <br />
            <TextField
              error={repeat.invalid}
              id="repeat-error"
              label="Repeat"
              type="password"
              value={repeat.value}
              className={classes.textField}
              margin="normal"
              helperText={
                !repeat.value
                  ? "Required"
                  : repeat.invalid
                  ? "Repeat must match password"
                  : null
              }
              onChange={this.onChangeRepeatHandler}
            />
            <br />
            <div className={classes.buttons}>
              <SaveChangesButton
                _id={_id}
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
    flag: state.flag,
    data: state.data
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(EditUserForm)
);
