import React from "react";
import "./index.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
const smsurl = "https://skrillergh.pythonanywhere.com/checkwinnings/";
//+233508305891
const customStyles = {
  content: {
    zIndex: "5",
    transform: "translate(0%, 0%)",
  },
};
export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      showform: false,
      lname: "",
      fname: "",
      phone: "",
      age: "",
      location: "",
      prize: "",
      loading: false,
      modalIsOpen: false,
      gender:''
    };
    this.selectItem = this.selectItem.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  output = () => {
    this.setState({ showform: true, modalIsOpen: true });
    // console.log(this.state.prize);
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { fname, lname, age, phone, prize, location,gender } = this.state;
      const userdata = {
        fname,
        lname,
        age,
        recNo: phone,
        p: prize.name,
        gender,
        package_id: prize.package_id + "",
        location,
        region: this.props.region,
      };
      console.log(userdata);
      const resSMS = await axios.post(smsurl, userdata);
      console.log(resSMS.data);
      // const resEmail = await axios.post(emailUrl, userdata);
      //console.log(resEmail.data);

      this.setState({ loading: false });
      this.props.history.push(`/success/${prize.name}`);
    } catch (error) {
      console.log(error);

      this.setState({ loading: false });
      // console.log(this.props.history);
    }
  };

  handleClose = () => {
    this.setState({ modalIsOpen: false });
  };
  modal = () => {
    const { fname, lname,  age, phone, location, modalIsOpen,gender } = this.state;

    return (
      <Modal show={modalIsOpen}>
        <form onSubmit={this.onSubmit} className="mymodal">
          <Modal.Header>
            <h5 className="modal-title" id="addOwnerModalText" style={{ color: "black" }}>
              Congratulations on winning your <b style={{ color: "red", fontWeight: "bold" }}>{this.state.prize.name}</b>. fill
              the form below to claim your prize
            </h5>
          </Modal.Header>

          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <div className="form-group">
                    <label htmlFor="inputOne" className="col-form-label">
                      First Name:
                    </label>
                    <input
                      id="inputOne"
                      value={fname}
                      onChange={this.onChange}
                      name="fname"
                      type="text"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <div className="form-group">
                    <label htmlFor="inputOne" className="col-form-label">
                      Last Name:
                    </label>
                    <input
                      id="inputOne"
                      value={lname}
                      onChange={this.onChange}
                      name="lname"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <div className="form-group">
                    <label htmlFor="inputTwo" className="col-form-label">
                      Phone Number
                    </label>
                    <input
                      id="inputTwo"
                      value={phone}
                      onChange={this.onChange}
                      name="phone"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputThree" className="col-form-label">
                      Age
                    </label>
                    <input
                      id="inputThree"
                      value={age}
                      onChange={this.onChange}
                      name="age"
                      type="text"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputFour" className="col-form-label">
                      Location:
                    </label>
                    <input
                      id="inputFour"
                      value={location}
                      onChange={this.onChange}
                      name="location"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputFour" className="col-form-label">
                      Gender
                    </label>
                    <select value={gender} onChange={this.onChange} name="gender" required className="form-control">
                      <option value="">---Select gender---</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button> */}

            <button id="performSendAction" type="submit" className="btn btn-primary">
              {this.state.loading ? <span>loading</span> : <span> Submit Claim</span>}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };
  async selectItem() {
    if (this.props.items.length > 0) {
      if (this.state.selectedItem === null) {
        const selectedItem = Math.floor(Math.random() * this.props.items.length);
        if (this.props.onSelectItem) {
          await this.props.onSelectItem(selectedItem);
        }
        this.setState({ selectedItem, prize: this.props.items[selectedItem] });
        setTimeout(this.output, 4000);
      } else {
        this.setState({ selectedItem: null });
        setTimeout(this.selectItem, 500);
        //console.log(this.state.selectedItem)
      }
    } else {
      alert("there is no prize to be won");
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    if (items.length !== 0) {
      return (
        <div className="container ">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="" style={{ color: "purple" }}>
                WIN YOUR MAGGI PROMOTION PRIZE HERE
              </h3>
            </div>
          </div>

          <div className="row">
            <div className="wheel-container">
              <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
                {items.map((item, index) => (
                  <div className="wheel-item" key={index} style={{ "--item-nb": index }}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            {this.modal()}
            {/* <div className="col-sm-4">{this.state.showform ? this.form() : null}</div> */}
          </div>
          <div className="row mb-4 ">
            <div className="col-12 text-center">
              <h3 style={{ color: "purple" }}> Prizes won</h3>
              <div className="card">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.won.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container ">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="" style={{ color: "purple", marginTop: "100px" }}>
                There is no ongoing promotion in this region
              </h1>
            </div>
          </div>

          <div className="row mb-4 ">
            <div className="col-12 text-center">
              <h3 style={{ color: "purple" }}> Prizes won</h3>
              <div className="card">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.won.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
