import React, { Component } from "react"
import petdata from "./pets.json"
import AdoptionContract from "./AdoptionContract"

const Pet = (props) => {

    return (
        <div>
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="panel panel-default panel-pet">
                    <div className="panel-heading">
                        <h3 className="panel-title">{props.name}</h3>
                    </div>
                    <div className="panel-body">
                        <img alt="140x140" src={props.img} />
                        <br /><br />
                        <strong>Breed</strong>: <span className="pet-breed">{props.breed}</span><br />
                        <strong>Age</strong>: <span className="pet-age">{props.age}</span><br />
                        <strong>Location</strong>: <span className="pet-location">{props.location}</span><br /><br />
                        <button className="btn btn-default btn-adopt" onClick={props.adoptedHandler}>Adopt</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Hompage extends Component {

    adoptedHandler = async (petId) => {

        const contract = await AdoptionContract

        contract.web3.eth.getAccounts(async function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            const instance = await contract.deployed()
            instance.adopt(petId, { from: account })
        });
    }

    render() {
        return (
            <div>
                {petdata.map(pet =>
                    <Pet
                        key={pet.id}
                        name={pet.name}
                        breed={pet.breed}
                        age={pet.age}
                        img={pet.picture}
                        adoptedHandler={() => this.adoptedHandler(pet.id)}
                    />
                )}
            </div>
        );
    }

}

export default Hompage;

