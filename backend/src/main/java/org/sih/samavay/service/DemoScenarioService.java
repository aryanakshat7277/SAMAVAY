package org.sih.samavay.service;

import org.sih.samavay.connector.GovernmentPlatformConnector;
import org.sih.samavay.dto.DemoScenarioResultDto;
import org.sih.samavay.dto.GatewayRequest;
import org.sih.samavay.dto.GatewayResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DemoScenarioService {

    private final InteroperabilityGatewayService gatewayService;
    private final SystemEventService eventService;
    private final List<GovernmentPlatformConnector> connectors;

    public DemoScenarioService(InteroperabilityGatewayService gatewayService,
                               SystemEventService eventService,
                               List<GovernmentPlatformConnector> connectors) {
        this.gatewayService = gatewayService;
        this.eventService = eventService;
        this.connectors = connectors;
    }

    public DemoScenarioResultDto runScenario(int scenarioId) {
        long startTime = System.currentTimeMillis();
        List<String> steps = new ArrayList<>();
        String scenarioName;
        String description;
        String status;
        String summary;

        switch (scenarioId) {
            case 1:
                scenarioName = "Successful Interoperability";
                description = "All connected sovereign platforms respond successfully. Cadastral records verified.";
                steps.add("Step 1: Citizen requests Property Certificate.");
                steps.add("Step 2: SAMAVAY Interoperability Gateway queries Bhoomi LRS via mTLS PKI_X509.");
                steps.add("Step 3: Cadastral deed RoR #42/1A matched and verified in 42ms.");
                steps.add("Step 4: Application status advanced to Automated Scrutiny.");
                status = "SUCCESS";
                summary = "End-to-end interoperability achieved across Municipal and Revenue platforms with zero duplicate citizen data entry.";

                eventService.recordEvent("SCENARIO_RUN", "SIH Demo Engine", "Scenario", 1L, "INFO",
                        "Demo Scenario 1 Executed: Successful Interoperability verification completed.");
                break;

            case 2:
                scenarioName = "Citizen DPDP Consent Required";
                description = "System encounters protected biometric/identity record and requests explicit citizen authorization.";
                steps.add("Step 1: Transport Ministry requests DigiLocker Aadhaar e-KYC record.");
                steps.add("Step 2: Consent Enforcement Engine detects missing DPDP authorization token.");
                steps.add("Step 3: Gateway pauses automatic dispatch with HTTP 403 / CONSENT_REQUIRED.");
                steps.add("Step 4: Action Required banner generated on Citizen Dashboard.");
                status = "CONSENT_TRIGGERED";
                summary = "Sovereign privacy preserved under DPDP Act 2023. Unauthorized background sharing prevented.";

                eventService.recordEvent("CONSENT_REQUIRED", "Citizen Consent Engine", "DataConsent", 2L, "WARNING",
                        "Demo Scenario 2 Executed: Citizen DPDP Consent requirement enforced.");
                break;

            case 3:
                scenarioName = "Dynamic Missing Information Collection";
                description = "Government platform provides 5 verified fields; dynamic form requests only 1 missing field.";
                steps.add("Step 1: Application requirements analyzed (6 total data points).");
                steps.add("Step 2: 5 data points verified from Bhoomi LRS, Municipal DB, and DigiLocker.");
                steps.add("Step 3: Dynamic Form Engine suppresses 5 verified fields.");
                steps.add("Step 4: Citizen is presented with lean form containing only 'Occupancy Declaration'.");
                status = "SUCCESS";
                summary = "Form minimized by 83.3%. Citizen overhead eliminated through authoritative data reuse.";

                eventService.recordEvent("FORM_MINIMIZED", "Dynamic Form Engine", "Service", 3L, "INFO",
                        "Demo Scenario 3 Executed: Form Minimization reduced citizen input requirements.");
                break;

            case 4:
                scenarioName = "Platform Failure & Automatic Failover";
                description = "Primary transport node experiences timeout. Fallback Strategy automatically routes through DigiLocker sovereign proxy.";
                steps.add("Step 1: Gateway dispatches DL renewal request to SARATHI Primary Node.");
                steps.add("Step 2: SARATHI Primary unresponsive (Timeout 600ms). Gateway initiates retry 1 & 2.");
                steps.add("Step 3: Fallback Strategy Service engages DigiLocker Sovereign Gateway.");
                steps.add("Step 4: Driving Licence credential retrieved successfully from secondary replica.");
                status = "FAILOVER_ENGAGED";
                summary = "High Availability achieved. Citizen application completed without downtime despite primary system outage.";

                eventService.recordEvent("FALLBACK_ACTIVATED", "Fallback Engine", "GatewayRequestLog", 4L, "WARNING",
                        "Demo Scenario 4 Executed: Automatic failover engaged following primary timeout.");
                break;

            case 5:
            default:
                scenarioName = "Service Impact Analysis";
                description = "Simulates upstream platform degradation and visualizes downstream citizen service impacts.";
                steps.add("Step 1: Bhoomi Land Records cluster latency elevated to 1,850ms.");
                steps.add("Step 2: Health Engine flags platform status as DEGRADED.");
                steps.add("Step 3: Impact Analysis computes 3 dependent citizen services affected.");
                steps.add("Step 4: Automated mitigation route prepared via state replica.");
                status = "DEGRADED_ANALYZED";
                summary = "3 dependent citizen services identified (Property Tax, Land Mutation, Rural NOC). Secondary failovers confirmed ready.";

                eventService.recordEvent("SLOW_RESPONSE", "Integration Health Engine", "Platform", 5L, "WARNING",
                        "Demo Scenario 5 Executed: Service Impact Analysis evaluated platform degradation.");
                break;
        }

        long elapsed = System.currentTimeMillis() - startTime + (long)(Math.random() * 40 + 20);
        return new DemoScenarioResultDto(scenarioId, scenarioName, description, status, steps, summary, elapsed);
    }

    public void setPlatformSimulationMode(String platformCode, String mode) {
        for (GovernmentPlatformConnector conn : connectors) {
            if (conn.getPlatformCode().equalsIgnoreCase(platformCode) ||
                conn.getPlatformName().toLowerCase().contains(platformCode.toLowerCase())) {
                conn.setSimulationMode(mode);
                eventService.recordEvent("SIMULATION_CHANGED", "Admin Demo Console", "Connector", 0L, "INFO",
                        "Platform " + conn.getPlatformName() + " simulation mode set to " + mode);
            }
        }
    }
}
