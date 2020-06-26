import React from "react";

const url='http://localhost:5000/'

class EditPorduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
   
    
    async serverFunc(urlEnder,data={},method) {
        const response = await fetch(url+urlEnder, {
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


      updateProds =()=>{
        this.serverFunc("farmers/put",{id: this.props.id, name: this.state.newName},"PUT")

      }
    
    render() {       
        
        return (
            <div className="clEditProduct">
                
               <button>Finish</button>
                
            </div>
        )
    }
}

export default EditProduct;