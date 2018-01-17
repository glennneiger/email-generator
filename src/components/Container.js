import React from 'react';
import _ from 'lodash';

import RightSideDisplay from './RightSideDisplay';
import FormSection from './FormSection';

import {cced_thematic_initial_state} from '../templates/cced_thematic';
import {idt_thematic_initial_state} from '../templates/idt_thematic';
import {id_thematic_initial_state} from '../templates/id_thematic';
import {idt_reader_initial_state} from '../templates/idt_reader';
import {cced_reader_initial_state} from '../templates/cced_reader';
import {id_reader_initial_state} from '../templates/id_reader';
import {id_digital_initial_state} from '../templates/id_digital';
import {idt_digital_initial_state} from '../templates/idt_digital';
import {cced_digital_initial_state} from '../templates/cced_digital';
import {cdew_da_initial_state} from '../templates/cdew_da';
import {cdew_dds_initial_state} from '../templates/cdew_dds';
import {cdew_dh_initial_state} from '../templates/cdew_dh';
import {cdew_lab_initial_state} from '../templates/cdew_lab';
import {cdew_thematic_initial_state} from '../templates/cdew_thematic';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_template: 'cced_digital',
      cced_digital: cced_digital_initial_state,
      cced_reader: cced_reader_initial_state,
      cced_thematic: cced_thematic_initial_state,
      id_digital: id_digital_initial_state,
      id_reader: id_reader_initial_state,
      id_thematic: id_thematic_initial_state,
      idt_thematic: idt_thematic_initial_state,
      idt_reader: idt_reader_initial_state,
      idt_digital: idt_digital_initial_state,
      cdew_da: cdew_da_initial_state,
      cdew_dds: cdew_dds_initial_state,
      cdew_dh: cdew_dh_initial_state,
      cdew_lab: cdew_lab_initial_state,
      cdew_thematic: cdew_thematic_initial_state,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormAdd = this.handleFormAdd.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.handleFormSwitch = this.handleFormSwitch.bind(this);
    this.handleFormDrag = this.handleFormDrag.bind(this);
  }

  handleFormDrag(startIndex, endIndex){
    let stateClone = _.cloneDeep(this.state);
    let arrayOfRows = stateClone[this.state.selected_template];
    const removedRow = arrayOfRows.splice(startIndex, 1);
    arrayOfRows.splice(endIndex, 0, removedRow[0]);
    stateClone[this.state.selected_template] = arrayOfRows;
    this.setState(stateClone);
  }
  handleFormSwitch(formIndex, formToSwitch){
    let stateClone = _.cloneDeep(this.state);
    stateClone[this.state.selected_template].splice(formIndex, 1, formToSwitch);
    this.setState(stateClone);
  }
  handleFormDelete(field){
    let stateClone = _.cloneDeep(this.state);
    stateClone[this.state.selected_template].splice(field, 1);
    this.setState(stateClone);
  }
  handleFormAdd(formIndex,formToAdd){
    let stateClone = _.cloneDeep(this.state);
    stateClone[this.state.selected_template].splice(formIndex+1, 0, formToAdd);
    this.setState(stateClone);
  }
  handleFieldChange(form, field, value) {
    let stateClone = _.cloneDeep(this.state);
    stateClone[this.state.selected_template][form].fields[field].value = value;
    this.setState(stateClone);
  }
  handleTemplateChange(template) {
    //create a blank object for the template if it does not exist
    if (!this.state[template]) {
      this.setState({ template: {} });
    }
    this.setState({ selected_template: template });
  }

  render() {
    return (
      <div id="container">
        <FormSection
          info={this.state}
          onTemplateChange={value => this.handleTemplateChange(value)}
          onFieldChange={(form, field, value)=>this.handleFieldChange(form, field, value)}
          onFormAdd={(formIndex,formToAdd)=>this.handleFormAdd(formIndex, formToAdd)}
          onFormDelete={(field)=>this.handleFormDelete(field)}
          onFormSwitch = {(formIndex, formToSwitch)=>this.handleFormSwitch(formIndex, formToSwitch)}
          onFormDrag = {(startIndex, endIndex)=>this.handleFormDrag(startIndex, endIndex)}
        /> 
        <RightSideDisplay info={this.state} />
      </div>

    );
  }
}

export default Container;