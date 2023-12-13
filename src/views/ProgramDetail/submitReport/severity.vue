<template>
    <div class="col-md-12">
        <div class="card-header pb-0">
            <h5>Severity (optional)</h5>
        </div>
        
        <div class="card-body btn-group-showcase">
            <div class="mb-2">
                <label class="col-form-label">Estimate the severity of this issue.</label>
            </div>
            <div class="btn-group" role="group">
              <button class="btn btn-outline-primary" type="button" title="btn btn-outline-none">None</button>
              <button class="btn btn-outline-primary" type="button" title="btn btn-outline-low">Low</button>
              <button class="btn btn-outline-primary" type="button" title="btn btn-outline-medium">Medium</button>
              <button class="btn btn-outline-primary" type="button" title="btn btn-outline-high">High</button>
              <button class="btn btn-outline-primary" type="button" title="btn btn-outline-critical">Critical</button>
            </div>
        </div>

        <div class="card-body btn-group-showcase">
            <div class="mb-2">
                <label class="col-form-label">Estimate the severity of this issue.</label>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-2">
                  <label class="col-form-label">Attack Vector</label>
                </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setAttackVector('N')" type="button" >Network</button>
                    <button class="btn btn-outline-primary" @click="setAttackVector('A')" type="button">Adjacent Network</button>
                    <button class="btn btn-outline-primary" @click="setAttackVector('L')" type="button">Local</button>
                    <button class="btn btn-outline-primary" @click="setAttackVector('P')" type="button">Physical</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">Attack Complexity</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setAttackComplexity('L')" type="button" >Low</button>
                    <button class="btn btn-outline-primary" @click="setAttackComplexity('H')" type="button" >High</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">Privileges Required</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setPrivilegesRequired('N')" type="button" >None</button>
                    <button class="btn btn-outline-primary" @click="setPrivilegesRequired('L')" type="button" >Low</button>
                    <button class="btn btn-outline-primary" @click="setPrivilegesRequired('H')" type="button" >High</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">User Interaction</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setUserInteraction('R')" type="button">Required</button>
                    <button class="btn btn-outline-primary" @click="setUserInteraction('NR')" type="button">Not Required</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">Scope</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setScope('U')" type="button">Unchanged</button>
                    <button class="btn btn-outline-primary" @click="setScope('C')" type="button">Changed</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">Confidentiality Impact</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setConfidentialityImpact('N')" type="button">None</button>
                    <button class="btn btn-outline-primary" @click="setConfidentialityImpact('L')" type="button">Low</button>
                    <button class="btn btn-outline-primary" @click="setConfidentialityImpact('H')" type="button">High</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">Integrity Impact</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setIntegrityImpact('N')" type="button">None</button>
                    <button class="btn btn-outline-primary" @click="setIntegrityImpact('L')" type="button">Low</button>
                    <button class="btn btn-outline-primary" @click="setIntegrityImpact('H')" type="button">High</button>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label class="col-form-label">Availability Impact</label>
                  </div>
                  <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary" @click="setAvailabilityImpact('N')" type="button">None</button>
                    <button class="btn btn-outline-primary" @click="setAvailabilityImpact('L')" type="button">Low</button>
                    <button class="btn btn-outline-primary" @click="setAvailabilityImpact('H')" type="button">High</button>
                  </div>
                </div>
                <div class="btn-showcase">
                  <button class="btn btn-primary" type="submit" value="Submit" @click="calculateCVSS">Calculate CVSS</button>
                  <div v-if="cvssResult">
                    <h3>CVSS Result</h3>
                    <p>Base Score: {{ cvssResult.baseScore }}</p>
                  </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min'
    import Cvss from 'cvss-calculator';

    //import outlineButtons from "./outlineButtons.vue"
    export default {
        // components: {
        //     CVSSResult
        // },
        methods:{
            setAttackVector(value) {
                this.attackVector = value;
            },
            setAttackComplexity(value) {
                this.attackComplexity = value;
            },
            setPrivilegesRequired(value) {
                this.privilegesRequired = value;
            },
            setUserInteraction(value) {
                this.userInteraction = value;
            },
            setScope(value) {
                this.scope = value;
            },
            setConfidentialityImpact(value) {
                this.confidentialityImpact = value;
            },
            setIntegrityImpact(value) {
                this.integrityImpact = value;
            },
            setAvailabilityImpact(value) {
                this.availabilityImpact = value;
            },
            calculateCVSS(){
                const attackVector = this.attackVector;
                const attackComplexity = this.attackComplexity;
                const privilegesRequired = this.privilegesRequired;
                const userInteraction = this.userInteraction;
                const scope = this.scope;
                const confidentialityImpact = this.confidentialityImpact;
                const integrityImpact = this.integrityImpact;
                const availabilityImpact = this.availabilityImpact;
                
                const cvssVector = new Cvss(`CVSS:3.0/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scope}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`);

                const cvssResult = cvssVector.getBaseScore(); //Use .getRating() to get a rating (none, low, medium, high) instead of a number

                this.cvssResult = cvssResult;
            
            },
        },
        mounted() {
            new Tooltip(document.body, {
                selector: "[data-bs-toggle='tooltip']"
            })
        },
        data() {
            return {
                attackVector: '',
                attackComplexity: '',
                privilegesRequired: '',
                userInteraction: '',
                scope: '',
                confidentialityImpact: '',
                integrityImpact: '',
                availabilityImpact: '',
                cvssResult: null,
            };
        },
    }
</script>
