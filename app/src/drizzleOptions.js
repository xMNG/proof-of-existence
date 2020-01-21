import PoeFactory from "./contracts/PoeFactory.json";
import ProofOfExistence from "./contracts/ProofOfExistence.json";
const options = {
    contracts: [PoeFactory, ProofOfExistence],
    events: {
        PoeFactory: ['LogCreateContract'],
        ProofOfExistence: ['LogAddIPFSHash']
    }
};

export default options;