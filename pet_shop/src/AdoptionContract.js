
import TruffleContract from "truffle-contract"

const web3 = window.web3

  let AdoptContract = fetch("/Adoption.json").then(resp => resp.json())
    .then(resp  => {
      const contract = TruffleContract(resp)
      contract.setProvider(web3.currentProvider)
      return contract
    })


export default AdoptContract;