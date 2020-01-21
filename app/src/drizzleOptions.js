import Migrations from "./contracts/Migrations.json";
import PoeFactory from "./contracts/PoeFactory.json";

const options = {
    contracts: [Migrations, PoeFactory],
    events: {
        PoeFactory: ['LogCreateContract']
    }
};

export default options;