// src/components/admin/CityFormPage/CityFormPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import { Grid, TextField, Button, Select, MenuItem, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';
import './CityFormPage.css';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';


class CityFormPage extends Component {
  state = {
    newCity: {
      country_id: 'Select A Country',
      name: '',
      overview: '',
      health_risks: '',
      ambulance: '',
      fire: '',
      police: '',
      roadside_assistance: '',
      wellness_resources: '',
      local_health_remedies: '',
      healthcare_tourism: '',
      WHO_link: '',
      CDC_link: '',
      google_translate_link: '',
      local_resources: '',
    }
  }

  handleNewChange = (propertyName) => (event) => {
    console.log('somethings happening!');
    this.setState({      
      newCity: {
        ...this.state.newCity,
      [propertyName]: event.target.value,
      }
    })
  }

  addNewCity = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'POST_CITY', payload: this.state.newCity })
    this.props.history.push('/cities')
  }

  componentDidMount() {
    // check url param "cityName"
    const { match: { params: { cityName } } } = this.props; // this is the same way as writing const params = this.props.match.params.cityName;
    if (cityName === 'new') {
      console.log('new form');
      this.props.dispatch({ type: 'FETCH_COUNTRIES' });
    } else {
      console.log('filled form');
    }
  }

  render() {

    const countries = this.props.reduxState.countriesReducer;

    return (
      <AdminLayout>
        <div style={{height: `50px`, bottom: 0}}>
          { this.state.newCity.name ? 
          <h1>{this.state.newCity.name}</h1> :
          <h1> </h1> }
        </div>
        <form style={{width: `100%`}} onSubmit={this.addNewCity}>
          <h2>City Summary</h2>
          <Grid id="newCityGrid" container>
            <Grid className="inputFields" item xs={12}>
              <TextField 
                id="name" 
                label="City Name" 
                variant="outlined" 
                fullWidth margin="normal"
                value={this.state.newCity.name} 
                onChange={this.handleNewChange('name')} />
            </Grid>
            <Grid className="inputFields" item xs={12}>
              <InputLabel htmlFor="countrySelect">Country</InputLabel>
              <Select
                displayEmpty
                inputProps={{
                  name: 'country',
                  id: 'countrySelect',
                }}
                style={{minWidth: 120}}
                value={this.state.newCity.country_id}
                onChange={this.handleNewChange('country_id')}
                input={<OutlinedInput name="Country" id="outlined-country" />}
              >
                <MenuItem value="">
                  <em>Select A Country</em>
                </MenuItem>
                { countries.map( country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.value} ({country.id})
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid className="inputFields"  item xs={12}>
              <TextField 
                rows="12" 
                label="Healthcare in the City" 
                multiline id="overview" 
                fullWidth margin="normal" 
                variant="outlined" 
                type='type' 
                value={this.state.newCity.overview} 
                onChange={this.handleNewChange('overview')} />
            </Grid> 
            <Grid className="inputFields"  item xs={12}>
              <TextField 
                rows="12" 
                label="Health Risks" 
                multiline id="health_risks" 
                fullWidth margin="normal" 
                variant="outlined" 
                type='type' 
                value={this.state.newCity.health_risks} 
                onChange={this.handleNewChange('health_risks')} />
            </Grid>
            <Grid className="inputFields" container spacing={3}
              item xs={12}>
              <h2 style={{
                marginBottom: 0,
                marginTop: `5vw`
              }}>
                Emergency Phone Numbers
              </h2>
              <Grid item xs={6}>
                <TextField 
                  id="ambulance" 
                  label="Ambulance" 
                  fullWidth margin="normal"
                  variant="outlined" 
                  value={this.state.newCity.ambulance} 
                  onChange={this.handleNewChange('ambulance')} />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  id="fire" 
                  label="Fire" 
                  fullWidth margin="normal" 
                  variant="outlined" 
                  value={this.state.newCity.fire} 
                  onChange={this.handleNewChange('fire')} />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  id="police" 
                  label="Police" 
                  fullWidth margin="normal" 
                  variant="outlined" 
                  value={this.state.newCity.police} 
                  onChange={this.handleNewChange('police')} />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  id="roadside_assistance" 
                  label="Roadside Assistance" 
                  fullWidth margin="normal" 
                  variant="outlined" 
                  value={this.state.newCity.roadside_assistance} 
                  onChange={this.handleNewChange('roadside_assistance')} />
              </Grid>
            </Grid> 
            <Grid className="inputFields"  item xs={12}>
              <h2 style={{
                marginBottom: 0,
                marginTop: `4vw`
              }}>
                Additional Healthcare Options
              </h2>  
              <TextField 
                rows="12" 
                label="Wellness Resources" 
                multiline id="wellness_resources" 
                fullWidth margin="normal" 
                variant="outlined" 
                type='type' 
                value={this.state.newCity.wellness_resources} 
                onChange={this.handleNewChange('wellness_resources')} />
            </Grid>  
            <Grid className="inputFields"  item xs={12}>  
              <TextField 
                rows="12" 
                label="Local Health Remedies" 
                multiline id="local_health_remedies" 
                fullWidth margin="normal" 
                variant="outlined" 
                type='type' 
                value={this.state.newCity.local_health_remedies} 
                onChange={this.handleNewChange('local_health_remedies')} />
            </Grid>  
            <Grid className="inputFields"  item xs={12}>  
              <TextField 
                rows="12" 
                label="Healthcare Tourism" 
                multiline id="healthcare_tourism" 
                fullWidth margin="normal" 
                variant="outlined" 
                type='type' 
                value={this.state.newCity.healthcare_tourism}
                onChange={this.handleNewChange('healthcare_tourism')} />
            </Grid>  
            <Grid className="inputFields"  item xs={12}>
              <h2 style={{
                marginBottom: 0,
                marginTop: `4vw`
              }}>
                Important Resources
              </h2>   
              <TextField 
                id="WHO_link" 
                label="WHO Link" 
                fullWidth margin="normal" 
                variant="outlined" 
                value={this.state.newCity.WHO_link} 
                onChange={this.handleNewChange('WHO_link')} />
            </Grid>  
            <Grid className="inputFields"  item xs={12}>  
              <TextField 
                id="CDC_link" 
                label="CDC Link" 
                fullWidth margin="normal" 
                variant="outlined" 
                value={this.state.newCity.CDC_link} 
                onChange={this.handleNewChange('CDC_link')} />
            </Grid>  
            <Grid className="inputFields"  item xs={12}>  
              <TextField 
                id="google_translate_link" 
                label="Google Translate Link" 
                fullWidth margin="normal" 
                variant="outlined" 
                value={this.state.newCity.google_translate_link} 
                onChange={this.handleNewChange('google_translate_link')} />
            </Grid>
            <Grid className="inputFields"  item xs={12}>  
              <TextField 
                rows="12" 
                label="Local Online Resources" 
                multiline id="local_resources" 
                fullWidth margin="normal" 
                variant="outlined" 
                type='type' 
                value={this.state.newCity.local_resources} 
                onChange={this.handleNewChange('local_resources')} />
            </Grid>
            <Grid container item xs={12} 
              style={{margin: `5%`, marginBottom: `20vh`}}>
              <Grid item xs={4}>
                <Button type='submit' value='Add New City' style={{ width: "24vw" }} variant="contained" color="inherent">Submit New City</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </AdminLayout>
    )
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});

export default connect(mapReduxStateToProps)(CityFormPage);