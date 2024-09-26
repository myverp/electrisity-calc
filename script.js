var failureRates = [0.01, 0.07, 0.015, 0.02, 0.18];
var recoveryTimes = [30, 10, 100, 15, 2];

const power = 5120;
const time = 6451;

function computeTotalFailureRate() {
    return failureRates.reduce((total, rate) => total + rate, 0);
}

function computeAverageRecoveryTime() {
    let weightedSum = 0;
    for (let i = 0; i < failureRates.length; i++) {
        weightedSum += failureRates[i] * recoveryTimes[i];
    }
    return weightedSum / computeTotalFailureRate();
}

function computeEmergencyDowntimeFactor() {
    return (computeTotalFailureRate() * computeAverageRecoveryTime()) / 8760;
}

function computePlannedDowntimeFactor() {
    return 1.2 * (43 / 8760);
}

function computeDoubleCircuitFailureRate() {
    return 2 * computeTotalFailureRate() * (computeEmergencyDowntimeFactor() + computePlannedDowntimeFactor());
}

function computeDoubleCircuitFailureRateWithSwitch() {
    return computeDoubleCircuitFailureRate() + 0.02;
}

function computeEnergyNotSuppliedDuringAccident(tw, w) {
    return w * tw * power * time;
}

function computeEnergyNotSuppliedDuringMaintenance(kp) {
    return kp * power * time;
}

function computeTotalInterruptionCost(Zpera, Zperp, tw, w, kp) {
    return Zpera * computeEnergyNotSuppliedDuringAccident(tw, w) + Zperp * computeEnergyNotSuppliedDuringMaintenance(kp);
}

function computeResults() {
    const Zpera = parseFloat(document.getElementById('interruption-cost').value);
    const Zperp = parseFloat(document.getElementById('accident-cost').value);
    const w = parseFloat(document.getElementById('failure-rate').value);
    const tw = parseFloat(document.getElementById('recovery-time').value);
    const kp = parseFloat(document.getElementById('planned-downtime').value);

    const totalFailureRate = computeTotalFailureRate();
    const avgRecoveryTime = computeAverageRecoveryTime();
    const emergencyDowntimeFactor = computeEmergencyDowntimeFactor();
    const plannedDowntimeFactor = computePlannedDowntimeFactor();
    const doubleCircuitFailureRate = computeDoubleCircuitFailureRate();
    const doubleCircuitFailureRateWithSwitch = computeDoubleCircuitFailureRateWithSwitch();
    const energyNotSuppliedDuringAccident = computeEnergyNotSuppliedDuringAccident(tw, w);
    const energyNotSuppliedDuringMaintenance = computeEnergyNotSuppliedDuringMaintenance(kp);
    const totalInterruptionCost = computeTotalInterruptionCost(Zpera, Zperp, tw, w, kp);

    document.getElementById('output').innerHTML = `
    <p>Частота відмов одноколової системи: ${totalFailureRate.toFixed(3)} рік<sup>-1</sup>.</p>
    <p>Середня тривалість відновлення: ${avgRecoveryTime.toFixed(1)} год.</p>
    <p>Коефіцієнт аварійного простою одноколової системи: ${emergencyDowntimeFactor.toFixed(5)}</p>
    <p>Коефіцієнт планового простою одноколової системи: ${plannedDowntimeFactor.toFixed(5)}</p>
    <p>Частота відмов одночасно двох кіл двоколової системи: ${doubleCircuitFailureRate.toFixed(5)} рік<sup>-1</sup>.</p>
    <p>Частота відмов двоколової системи з урахуванням секційного вимикача: ${doubleCircuitFailureRateWithSwitch.toFixed(4)} рік<sup>-1</sup>.</p>
    <p>Математичне очікування аварійного недопостачання електроенергії: ${energyNotSuppliedDuringAccident.toFixed(2)} кВт*год.</p>
    <p>Математичне очікування планового недопостачання електроенергії: ${energyNotSuppliedDuringMaintenance.toFixed(2)} кВт*год.</p>
    <p>Математичне очікування збитків від переривання електропостачання: ${totalInterruptionCost.toFixed(2)} грн.</p>
    `;
}

document.getElementById('compute-btn').addEventListener('click', computeResults);
