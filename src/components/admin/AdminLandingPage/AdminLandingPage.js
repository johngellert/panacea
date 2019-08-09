import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

//Material-UI
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./AdminLandingPage.css";
import { Button, Grid, TextField, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 2
  },
  addButton: {
    marginTop: 30,
    color: "white",
    background: "#76a3d5"
  },
  searchButton: {
    height: 50,
    color: "white",
    background: "#76a3d5"
  },
  paper: {
    width: "100%",
    marginTop: 40,
    overflowX: "auto"
  }
});

function AdminLandingPage(props) {
  // Local state to store inputs for city and country to search.
  const [searchValues, setSearchValues] = useState({
    city: "",
    organization: ""
  });

  useEffect(() => {
    props.dispatch({ type: "SEARCH_CITY", payload: "" });
  }, []);
  useEffect(() => {
    props.dispatch({ type: "SEARCH_ORGANIZATION", payload: "" });
  }, []);
  useEffect(() => {
    props.dispatch({ type: "CLEAR_INDIVIDUAL_CITY" });
  }, []);
  useEffect(() => {
    props.dispatch({ type: "CLEAR_MEDICATIONS" });
  }, []);
  useEffect(() => {
    props.dispatch({ type: "CLEAR_INDIVIDUAL_ORGANIZATION" });
  }, []);

  useEffect(() => {
    setSearchValues({ ...searchValues, organization: "" });
  }, [searchValues.city]);

  useEffect(() => {
    setSearchValues({ ...searchValues, city: "" });
  }, [searchValues.organization]);

  // use classes names for styling
  const classes = useStyles();

  // Takes in a property name and the event to update local state.
  const handleChange = property => event => {
    switch (property) {
      case "city":
        setSearchValues({ ...searchValues, [property]: event.target.value });
        break;
      case "organization":
        setSearchValues({ ...searchValues, [property]: event.target.value });
        break;
      default:
        return;
    }
  };

  // Fetch the cities associated to the search
  const handleClickSearch = searchBy => event => {
    switch (searchBy) {
      case "city":
        setSearchValues({ ...searchValues, organization: "" });
        props.dispatch({ type: "SEARCH_CITY", payload: event.target.value });
        break;
      case "organization":
        setSearchValues({ ...searchValues, city: "" });
        props.dispatch({
          type: "SEARCH_ORGANIZATION",
          payload: event.target.value
        });
        break;
      default:
        return;
    }
  };

  return (
    <AdminLayout>
      <Grid container>
        <Grid container item spacing={1} direction="row" alignItems="center">
          <Grid item xs={6}>
            <Link to="/cities/new">
              <Button
                fullWidth
                className={classes.addButton}
                variant="contained"
              >
                Add New City
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/organizations/new">
              <Button
                fullWidth
                className={classes.addButton}
                variant="contained"
              >
                Add New Organization
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={1} direction="row" alignItems="center">
        <Grid item>
          <TextField
            id="city-search-input"
            label="Search City"
            value={searchValues.city}
            onChange={handleChange("city")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          {/* <Link to={"/cities?citySearched=" + searchValues.city + "&" + "countrySearched=" + searchValues.city}> */}
          <Link to={"/cities?citySearched=" + searchValues.city}>
            <Button
              variant="contained"
              fullWidth
              className={classes.searchButton}
              onClick={() => handleClickSearch("city")}
            >
              Search
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container item spacing={1} direction="row" alignItems="center">
        <Grid item>
          <TextField
            id="organization-search-input"
            label="Search Organization"
            value={searchValues.organization}
            onChange={handleChange("organization")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item>
          <Link to={"/organizations?organizationSearched=" + searchValues.organization}>
            <Button
              variant="contained"
              fullWidth
              className={classes.searchButton}
              onClick={() => handleClickSearch("organization")}
            >
              Search
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* <pre>{JSON.stringify(searchValues, null, 2)}</pre> */}
    </AdminLayout>
  );
}

const mapStateToRedux = reduxStore => ({
  reduxStore
});

export default connect(mapStateToRedux)(AdminLandingPage);
