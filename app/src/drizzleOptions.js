import PoeFactory from "./contracts/PoeFactory.json";
const options = {
    contracts: [PoeFactory],
    events: {
        PoeFactory: ['LogCreateContract'],
        // ProofOfExistence: ['LogAddIPFSHash']
    }
};

export default options;