import React, { Component } from "react";
import axios from 'axios';
const api_url="https://skrillergh.pythonanywhere.com/checkwinnings/"
class SelectRegionPage extends Component {
  state = {
    region: "",
    regions:[]
  };
  onSubmit=(e)=>{
    const {history}=this.props

    history.push(`wheel/${this.state.region}`)
  }
  async componentDidMount(){
    const resp=await axios.get("https://skrillergh.pythonanywhere.com/getregions");
    console.log(resp.data)
    this.setState({regions:[...resp.data]})
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { region } = this.state;
    return (
      <div className="container p-4">
        <form onSubmit={this.onSubmit}>
        
          <div className="form-group">
          {/* <div className="row"> */}
            <label htmlFor="Template type" style={{color:"red"}}><b>Select your region</b></label>
            <select  name="region" required onChange={this.onChange} class="form-control">
              <option value="">---select region ---</option>
              {this.state.regions.map(data=>(
              <option value={data.includes("/")?data.replace("/"," "):data}>{data}</option>
              ))}
            </select>
           
          <button type="submit" className="btn btn-primary mt-5">
            Submit
          </button>
          
          </div>
          {/* </div> */}
          
        </form>
      </div>
    );
  }
}

export default SelectRegionPage;
