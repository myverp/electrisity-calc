# Reliability and Power Interruption Loss Calculator

This project is a web-based application for comparing the reliability of single-circuit and double-circuit power transmission systems and calculating the losses caused by power supply interruptions. It uses various algorithms to compute failure rates, recovery times, downtime factors, and energy loss.

## Features

- **Reliability Comparison**: The application calculates failure rates, recovery times, emergency and planned downtime factors for both single and double-circuit systems.
- **Power Interruption Loss Calculation**: Computes the energy not supplied and the total cost of interruptions due to outages.
- **User Interface**: A user-friendly web interface for inputting system data and viewing the calculated results.

## Technologies Used

- **HTML/CSS**: For creating the structure and style of the web interface.
- **JavaScript**: For implementing the calculation logic and handling user input/output.
- **Backend (Optional)**: If needed, can be extended with a Python backend for more advanced calculations.

## How to Use

1. **Input Data**: Enter the relevant data, such as failure rates, recovery times, and planned downtime factors, in the provided web form.
2. **Compute Results**: Click the "Compute" button to process the data.
3. **View Output**: The application will display calculated results such as failure rates, expected energy loss, and total interruption costs.

## Example Calculation

```javascript
var failureRates = [0.01, 0.07, 0.015, 0.02, 0.18];
var recoveryTimes = [30, 10, 100, 15, 2];

function computeTotalFailureRate() {
    return failureRates.reduce((total, rate) => total + rate, 0);
}

function computeResults() {
    const totalFailureRate = computeTotalFailureRate();
    console.log(`Total Failure Rate: ${totalFailureRate.toFixed(3)} year⁻¹`);
}
