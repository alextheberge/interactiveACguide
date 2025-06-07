const pressureData = {
    'R-134a': [
        { temp: 65, low: [25, 35], high: [135, 155] },
        { temp: 70, low: [30, 40], high: [145, 160] },
        { temp: 75, low: [35, 45], high: [150, 170] },
        { temp: 80, low: [40, 50], high: [175, 210] },
        { temp: 85, low: [45, 55], high: [225, 250] },
        { temp: 90, low: [45, 55], high: [250, 270] },
        { temp: 95, low: [50, 55], high: [275, 300] },
        { temp: 100, low: [50, 55], high: [315, 325] },
    ],
    'R-1234yf': [
        { temp: 65, low: [25, 35], high: [130, 150] },
        { temp: 70, low: [30, 40], high: [140, 160] },
        { temp: 75, low: [35, 45], high: [150, 170] },
        { temp: 80, low: [40, 48], high: [170, 210] },
        { temp: 85, low: [45, 58], high: [220, 250] },
        { temp: 90, low: [45, 58], high: [245, 275] },
        { temp: 95, low: [50, 58], high: [270, 310] },
    ]
};

const scenarios = [
    {
        id: 'low_low',
        title: 'Scenario: Low Side LOW / High Side LOW',
        symptoms: `Very poor or no cooling. Compressor may cycle on and off frequently (short cycling).`,
        causes: `<strong>Primary Suspect: Low Refrigerant Charge due to a leak.</strong> This is the most common cause for this reading.`,
        steps: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Inject UV Dye:</strong> If not already done, add UV dye to the system.</li>
                <li><strong>Run System:</strong> Run the AC on MAX for 15+ minutes to circulate the dye.</li>
                <li><strong>Thorough UV Light Scan:</strong> In a dark area, meticulously scan all AC lines, hose crimps, compressor shaft seal, condenser surface, and the evaporator drain outlet for a bright greenish-yellow glow indicating a leak.</li>
                <li><strong>Repair Leak:</strong> Once found, the leak must be repaired by a professional before the system can be properly evacuated and recharged.</li>
            </ol>`
    },
    {
        id: 'low_high',
        title: 'Scenario: Low Side LOW / High Side HIGH',
        symptoms: 'Poor cooling performance. The compressor might sound strained.',
        causes: '<strong>Primary Suspect: Restriction in the system.</strong> This classic pattern points to a blockage at the Expansion Valve (TXV), Orifice Tube (OT), or a clogged Receiver/Drier. Moisture in the system freezing at the expansion point can also cause this.',
        steps: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Perform a "Feel Test":</strong> Carefully feel the temperature of components. An unusually cold spot or frost on the liquid line or at the inlet of the TXV/OT indicates the location of the restriction.</li>
                <li><strong>Check for Moisture:</strong> If cooling degrades after running for a while, it could be ice forming. This requires professional service to replace the receiver/drier, evacuate, and recharge the system.</li>
                <li><strong>Action:</strong> The restricted component (TXV, OT, or receiver/drier) likely needs replacement by a professional.</li>
            </ol>`
    },
    {
        id: 'high_low',
        title: 'Scenario: Low Side HIGH / High Side LOW',
        symptoms: 'Little to no cooling. Vent air is at ambient temperature.',
        causes: '<strong>Primary Suspect: Faulty Compressor.</strong> The compressor is not creating a pressure differential, likely due to internal wear or damaged reed valves. A less common cause is an Expansion Valve (TXV) stuck wide open.',
        steps: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Listen to Compressor:</strong> Note any grinding, rattling, or knocking sounds that indicate internal failure.</li>
                <li><strong>Engine RPM Test:</strong> Increase engine RPM to 1500-2000. If the high side doesn't rise and the low side doesn't drop, the compressor is very likely bad.</li>
                <li><strong>UV Dye Check:</strong> A leak at the compressor seals could have caused oil loss and led to the failure.</li>
                <li><strong>Action:</strong> Compressor replacement is likely needed, a job for a professional.</li>
            </ol>`
    },
    {
        id: 'high_high',
        title: 'Scenario: Low Side HIGH / High Side HIGH',
        symptoms: 'Poor or no cooling. Engine may feel strained.',
        causes: `<strong>Primary Suspects: Refrigerant Overcharge or Poor Condenser Airflow.</strong> Too much refrigerant or an inability to dissipate heat will raise all system pressures. Air in the system is another possibility.`,
        steps: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Check for Overcharge:</strong> If refrigerant was recently added without gauges, this is highly likely. The system must be professionally recovered. <strong>DO NOT</strong> add more refrigerant.</li>
                <li><strong>Inspect Condenser Airflow:</strong> Check for and clean any debris (leaves, bugs, dirt) blocking the condenser fins at the front of the car.</li>
                <li><strong>Verify Condenser Fan:</strong> With the AC on, ensure the condenser cooling fan(s) are running. If not, investigate the fan motor, fuses, and relays.</li>
            </ol>`
    },
    {
        id: 'normal_poor_cooling',
        title: 'Scenario: Pressures NORMAL, but Cooling is POOR',
        symptoms: `Air from vents is only moderately cool. AC performance is inconsistent.`,
        causes: `<strong>Primary Suspect: Airflow or Blend Door Issue.</strong> The refrigerant side is working, but the cold air isn't reaching you correctly.`,
        steps: `
             <ol class="list-decimal list-inside space-y-2">
                <li><strong>Check Cabin Air Filter:</strong> A clogged filter is a very common cause. Inspect and replace if dirty.</li>
                <li><strong>Verify Blend Door:</strong> Listen for the actuator when changing temperature from hot to cold. If vent temperature doesn't change, the blend door may be stuck, mixing in hot air from the heater core.</li>
                <li><strong>Check Heater Hoses:</strong> If both hoses to the heater core are hot with AC on MAX, the heater control valve (if equipped) may be stuck open.</li>
            </ol>`
    },
    {
        id: 'low_normal_high',
        title: 'Scenario: Low Side NORMAL / High Side HIGH',
        symptoms: 'Reduced cooling, especially when idling or in hot weather.',
        causes: '<strong>Primary Suspect: Condenser Inefficiency.</strong> Similar to the High/High scenario, but less severe. Usually points to a partially blocked condenser or a slow/intermittent cooling fan. A moderate overcharge is also possible.',
        steps: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Prioritize Condenser Checks:</strong> Thoroughly inspect condenser fins for debris and verify proper operation of all condenser cooling fans. This is the most common cause.</li>
                <li><strong>Consider Moderate Overcharge:</strong> If refrigerant was added recently, this is a possibility.</li>
            </ol>`
    },
    {
        id: 'vacuum_low_or_normal',
        title: 'Scenario: Low Side IN VACUUM / High Side LOW or NORMAL',
        symptoms: 'No cooling at all. Compressor may shut off quickly.',
        causes: '<strong>Primary Suspects: Severe Blockage or a Major Leak.</strong> The compressor is pulling all refrigerant from the low side with nowhere for it to go, or there is no refrigerant to pull.',
        steps: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>STOP THE ENGINE IMMEDIATELY.</strong> Running the compressor in a vacuum will destroy it.</li>
                <li><strong>If High Side is also Very Low (when off):</strong> Suspect a major leak. Perform a thorough UV dye check.</li>
                <li><strong>If High Side Has Some Pressure:</strong> Suspect a severe blockage (e.g., TXV/OT frozen solid with moisture or clogged with debris). This requires professional service.</li>
            </ol>`
    },
    {
        id: 'fluctuating',
        title: 'Scenario: Readings Fluctuating Excessively',
        symptoms: 'Erratic or intermittent cooling. Gauge needles are oscillating wildly.',
        causes: '<strong>Primary Suspect: Air or Moisture in the System.</strong> Non-condensable gas (air) causes erratic pressures. Moisture can freeze and thaw at the expansion valve, causing pressures to swing.',
        steps: `
             <ol class="list-decimal list-inside space-y-2">
                <li><strong>Suspect Contamination:</strong> If the system was recently opened or a leak was present, air/moisture ingress is likely.</li>
                <li><strong>Check TXV:</strong> A faulty expansion valve "hunting" for the right setting can also cause this.</li>
                <li><strong>Action:</strong> This condition requires professional service to evacuate the system, replace the receiver/drier, and perform a proper recharge.</li>
            </ol>`
    },
    {
        id: 'initial',
        title: 'Awaiting Your Readings...',
        symptoms: '',
        causes: '',
        steps: '<p class="text-slate-500">Your diagnostic results and recommended next steps will be displayed here once you input your gauge readings above.</p>'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const refrigerantSelect = document.getElementById('refrigerant-type');
    const ambientTempSlider = document.getElementById('ambient-temp');
    const lowSideSlider = document.getElementById('low-side-pressure');
    const highSideSlider = document.getElementById('high-side-pressure');

    const ambientTempValue = document.getElementById('ambient-temp-value');
    const lowSideValue = document.getElementById('low-side-value');
    const highSideValue = document.getElementById('high-side-value');

    const normalLowRangeEl = document.getElementById('normal-low-range');
    const normalHighRangeEl = document.getElementById('normal-high-range');

    const diagnosisContent = document.getElementById('diagnosis-content');

    // Create gauge elements
    const pressureChartContainer = document.getElementById('pressure-chart').parentNode;
    pressureChartContainer.innerHTML = `
        <div class="flex flex-col md:flex-row justify-center items-center gap-8">
            <div class="gauge-container">
                <canvas id="low-side-gauge" width="200" height="200"></canvas>
                <div class="text-center mt-2 font-medium text-blue-700">Low Side (PSI)</div>
            </div>
            <div class="gauge-container">
                <canvas id="high-side-gauge" width="200" height="200"></canvas>
                <div class="text-center mt-2 font-medium text-red-700">High Side (PSI)</div>
            </div>
        </div>
    `;

    // Initialize gauges
    const lowSideGauge = new Gauge(document.getElementById('low-side-gauge'));
    lowSideGauge.maxValue = 100; // Max value for low side
    lowSideGauge.setMinValue(0);  // Set min value
    lowSideGauge.animationSpeed = 32; // Set animation speed (lower is faster)
    lowSideGauge.set(0); // Initialize with 0

    // Configure low side gauge
    lowSideGauge.setOptions({
        angle: 0, // The span of the gauge arc
        lineWidth: 0.44, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0.6, // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Fill color
        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#6FADCF',   // Colors
        colorStop: '#3B82F6',    // Tailwind blue-500
        strokeColor: '#E0E0E0',  // Background color
        generateGradient: true,
        highDpiSupport: true,    // High resolution support
        staticLabels: {
            font: "10px sans-serif",  // Specifies font
            labels: [0, 20, 40, 60, 80, 100],  // Print labels at these values
            color: "#000000",  // Optional: Label text color
            fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        },
    });

    // Initialize high side gauge
    const highSideGauge = new Gauge(document.getElementById('high-side-gauge'));
    highSideGauge.maxValue = 450; // Max value for high side
    highSideGauge.setMinValue(0);  // Set min value
    highSideGauge.animationSpeed = 32; // Set animation speed
    highSideGauge.set(0); // Initialize with 0

    // Configure high side gauge
    highSideGauge.setOptions({
        angle: 0, // The span of the gauge arc
        lineWidth: 0.44, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0.6, // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Fill color
        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#FF9999',   // Colors
        colorStop: '#EF4444',    // Tailwind red-500
        strokeColor: '#E0E0E0',  // Background color
        generateGradient: true,
        highDpiSupport: true,    // High resolution support
        staticLabels: {
            font: "10px sans-serif",  // Specifies font
            labels: [0, 90, 180, 270, 360, 450],  // Print labels at these values
            color: "#000000",  // Optional: Label text color
            fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        },
    });

    function getNormalPressures(refrigerant, temp) {
        const data = pressureData[refrigerant];
        let closest = data[0];
        // Find the entry with the temperature closest to the input temp
        for (const entry of data) {
            if (Math.abs(entry.temp - temp) < Math.abs(closest.temp - temp)) {
                closest = entry;
            } else if (Math.abs(entry.temp - temp) === Math.abs(closest.temp - temp) && entry.temp > closest.temp) {
                // Prefer higher temp if equidistant, or just stick to first found if going down
                closest = entry;
            }
        }
        // If temp is outside the defined range, extrapolate or clamp
        if (temp < data[0].temp) closest = data[0];
        if (temp > data[data.length - 1].temp) closest = data[data.length-1];

        return closest;
    }

    function updateDiagnosis() {
        const refrigerant = refrigerantSelect.value;
        const ambientTemp = parseInt(ambientTempSlider.value);
        const lowSide = parseInt(lowSideSlider.value);
        const highSide = parseInt(highSideSlider.value);

        ambientTempValue.textContent = ambientTemp;
        lowSideValue.textContent = lowSide;
        highSideValue.textContent = highSide;

        const normal = getNormalPressures(refrigerant, ambientTemp);
        const normalLow = normal.low;
        const normalHigh = normal.high;

        normalLowRangeEl.textContent = `${normalLow[0]} - ${normalLow[1]}`;
        normalHighRangeEl.textContent = `${normalHigh[0]} - ${normalHigh[1]}`;

        // Update gauges with current values
        lowSideGauge.set(lowSide);
        highSideGauge.set(highSide);

        // Add visual indicators for normal ranges
        // This could be enhanced with more sophisticated visualization if needed

        // Define thresholds more generously to avoid "normal" if close to edge
        const lowThreshold = 5;
        const highThreshold = 10;

        const lowIs = lowSide < normalLow[0] - lowThreshold ? 'low' : lowSide > normalLow[1] + lowThreshold ? 'high' : 'normal';
        const highIs = highSide < normalHigh[0] - highThreshold ? 'low' : highSide > normalHigh[1] + highThreshold ? 'high' : 'normal';

        let scenarioId = 'initial'; // Default

        // Logic to determine scenarioId
        if (lowSide < 5 && lowSide >= 0) { // Vacuum on low side
            scenarioId = 'vacuum_low_or_normal';
        } else if (lowIs === 'low' && highIs === 'low') {
            scenarioId = 'low_low';
        } else if (lowIs === 'low' && highIs === 'high') {
            scenarioId = 'low_high';
        } else if (lowIs === 'high' && highIs === 'low') {
            scenarioId = 'high_low';
        } else if (lowIs === 'high' && highIs === 'high') {
            scenarioId = 'high_high';
        } else if (lowIs === 'normal' && highIs === 'high') {
            scenarioId = 'low_normal_high';
        } else if (lowIs === 'normal' && highIs === 'normal') {
            // This is tricky: If pressures are "normal" but user is still diagnosing, there's likely an issue.
            // We might need a different trigger or a way for user to indicate "poor cooling"
            scenarioId = 'normal_poor_cooling';
        }
        // Add a case for fluctuating readings if we had an input for it. For now, not auto-detected.

        const selectedScenario = scenarios.find(s => s.id === scenarioId) || scenarios.find(s => s.id === 'initial');

        renderScenario(selectedScenario);
    }

    function renderScenario(scenario) {
        let content = `
            <h4 class="font-bold text-lg mb-2 text-blue-800">${scenario.title}</h4>
            ${scenario.symptoms ? `<p class="text-sm mb-3"><strong class="font-semibold text-slate-700">Common Symptoms:</strong> ${scenario.symptoms}</p>` : ''}
            ${scenario.causes ? `<p class="text-sm mb-4 bg-yellow-100 p-2 rounded-md"><strong class="font-semibold text-slate-700">Likely Cause(s):</strong> ${scenario.causes}</p>` : ''}
            ${scenario.steps ? `<div class="text-sm space-y-2"><strong class="font-semibold text-slate-700">Diagnostic Steps:</strong> ${scenario.steps}</div>` : ''}
        `;
        diagnosisContent.innerHTML = content;
    }

    [refrigerantSelect, ambientTempSlider, lowSideSlider, highSideSlider].forEach(el => {
        el.addEventListener('input', updateDiagnosis);
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
                btn.classList.add('text-slate-500', 'hover:text-slate-700', 'hover:border-slate-300', 'border-transparent');
            });
            button.classList.add('tab-active');
            button.classList.remove('text-slate-500', 'hover:text-slate-700', 'hover:border-slate-300', 'border-transparent');

            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // Initial call to set up the view
    updateDiagnosis();
    renderScenario(scenarios.find(s => s.id === 'initial'));
});
