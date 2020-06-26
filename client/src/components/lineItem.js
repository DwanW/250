import React from "react";

const url = 'http://localhost:5000/'

class LineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      productBoxes: [],
    }
  }
  handleChange = (e) => {
    this.setState({ newName: e.target.value })
  }

  async serverFunc(urlEnder, data = {}, method) {
    const response = await fetch(url + urlEnder, {
      method: method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // json.status = response.status;
    // json.statusText = response.statusText;
    return json;
  }

  async delete(urlEnder) {
    const response = await fetch(url + urlEnder, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      // body: JSON.stringify(data),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // json.status = response.status;
    // json.statusText = response.statusText;
    return json;
  }

  updateName = () => {
    this.serverFunc("farmers/put", { id: this.props.id, name: this.state.newName }, "PUT")
    this.setState({ newName: "" })
  }

  handleEditProductsClick = () => {
    let arr1 = []
    const size = this.props.productList.length;

    for (let i = 0; i < size; i++) {
      if (this.props.products.includes(this.props.productList[i])) {
        arr1.push(<div key={i}><input type="checkbox" defaultChecked value={this.props.productList[i]} /> {this.props.productList[i]}</div>)
      } else {
        arr1.push(<div key={i}><input type="checkbox" value={this.props.productList[i]} /> {this.props.productList[i]}</div>)
      }
    }
    this.setState({ productBoxes: arr1 })
    let x = document.getElementsByClassName("modal")[0]
    x.style.display = "block"
  }



  close = () => {
    let x = document.getElementsByClassName("modal")[0]
    x.style.display = "none"
  }

  render() {

    return (
      <div className="clLineItem">
        <span>id:{this.props.id}, {" "} Name: {this.props.name}</span>
        <input type="text" placeholder="new name here" onChange={this.handleChange} value={this.state.newName} />
        <button onClick={this.updateName}>Update Name</button>
        {/* <input/>  */}
        <button onClick={this.handleEditProductsClick}>Edit Products</button>
               Products: {this.props.products}
        <button id="idDeleteFarmer" onClick={() => this.delete(this.props.id)}>Delete</button>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span onClick={this.close} className="close">&times;</span>
            <div className="clModalIn">{this.state.productBoxes}</div>
            <button>Save</button>
          </div>
        </div>

      </div>
    )
  }
}

export default LineItem;