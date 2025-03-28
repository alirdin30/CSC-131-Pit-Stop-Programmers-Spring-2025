import Navigation from "../components/Navigation";

const servicePage = () => {
    return(
    <div>
        <Navigation/>
        <section className = "top">
        <h1>Services Offered</h1>
        </section>
    <section className ="buttons">
            <button onclick="oilselect()" class="services" id="oil">Oil Change</button>
            <button onclick="airselect()" class="services" id="air">Air Filter Change</button>
            <button onclick="tireselect()" class="services" id="tire">Tire Mounting & Balance</button>
            <button onclick="batselect()" class="services" id="bat">Battery Replacement</button>
            <button onclick="brakeselect()" class="services" id="brake">Brake Service</button>
            <button onclick="susselect()" class="services" id="sus">Suspension Repair</button>
            <button onclick="fuelselect()" class="services" id="fuel">Fuel System Cleaning</button>
            <button onclick="altselect()" class="services" id="alt">Alternator & Starter Repair</button>
            <button onclick="transselect()" class="services" id="trans">Transmission Fluid</button>
            <button onclick="emissionselect()" class="services" id="emission">Emission Testing</button>

            {/*<!--TODO: make the schedule services button go to next page--> */}
            <button onclick="confirmservice()" class="confirm">Schedule Services</button>
            
            <script src="servicepage.js"></script>
        </section>
        </div>
        );
};

export default servicePage;