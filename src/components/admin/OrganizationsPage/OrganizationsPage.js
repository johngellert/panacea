import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from 'query-string';

import AdminLayout from "../../layouts/AdminLayout/AdminLayout";

// Material-UI
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles, Paper } from "@material-ui/core";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 2
  },
  addButton: {
    marginTop: 30,
    height: `56px`,
    color: "white",
    background: "#1b3757"
  },
  searchButton: {
    height: 56,
    color: "white",
    background: "#1b3757"
  },
  detailsButton: {
    height: `38pxa`,
    color: "white",
    background: "#1b3757"
  },
  table: {
  },
  paper: {
    width: "100%",
    marginTop: 40,
    overflowX: "auto"
  }
});

function OrganizationsPage(props) {
  const searchedValues = queryString.parse(props.location.search);

  useEffect(() => {props.dispatch({type: "SEARCH_ORGANIZATION", payload: searchedValues.organizationSearched || ""})}, []);
  useEffect(() => {props.dispatch({type: "CLEAR_INDIVIDUAL_ORGANIZATION"})}, []);
  
  // Local state to store inputs for organization to search.
  const [searchValues, setSearchValues] = useState({
    organization: searchedValues.organizationSearched || ""
  });

  // use classes names for styling
  const classes = useStyles();

  
  // Takes in a property name and the event to update local state.
  const handleChange = property => event => {
    setSearchValues({ ...searchValues, [property]: event.target.value });
    switch (property) {
      case "organization":
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
        <Grid container 
        item spacing={1} 
        direction="row" 
        alignItems="center"
        >
          <Grid item>
            <Link to="/organizations/new/0">
              <Button fullWidth className={classes.addButton} variant="contained">
                Add New Organization
            </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        item
        spacing={1}
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <TextField
            id="organization-search-input"
            label="Organization"
            value={searchValues.organization}
            onChange={handleChange("organization")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container item spacing={1} direction="row" alignItems="center">
        <Grid container item>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Organizations</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">Country</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {props.searchOrganizationReducer &&
                  props.searchOrganizationReducer.map(org => {
                    return (
                      <TableRow key={org.organization_id}>
                        <TableCell>{org.organization_name}</TableCell>
                        <TableCell align="right">{org.type}</TableCell>
                        <TableCell align="right">{org.city_name}</TableCell>
                        <TableCell align="right">{org.country_name}</TableCell>
                        <TableCell>
                          <Link to={`/organizations/${org.organization_name.replace(/[^A-Z0-9]/ig, "_")}/${org.organization_id}`}>
                            <Button
                              variant="contained"
                              fullWidth
                              className={classes.detailsButton}
                              value={org.id}
                            >
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

//
const mapReduxStateToProps = reduxState => ({
  searchOrganizationReducer: reduxState.searchReducer.searchOrganizationReducer
});

export default connect(mapReduxStateToProps)(OrganizationsPage);
