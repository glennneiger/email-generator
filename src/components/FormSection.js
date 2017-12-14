import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {cced_digital_rows} from '../templates/cced_digital';
import {cced_reader_rows} from '../templates/cced_reader';
import {cced_thematic_rows} from '../templates/cced_thematic';
import {id_digital_rows} from '../templates/id_digital';
import {id_reader_rows} from '../templates/id_reader';
import {id_thematic_rows} from '../templates/id_thematic';
import {idt_digital_rows} from '../templates/idt_digital';
import {idt_reader_rows} from '../templates/idt_reader';
import {idt_thematic_rows} from '../templates/idt_thematic';

let rows ={
  cced_digital: cced_digital_rows,
  cced_reader: cced_reader_rows,
  cced_thematic: cced_thematic_rows,
  id_digital: id_digital_rows,
  id_reader: id_reader_rows,
  id_thematic: id_thematic_rows,
  idt_thematic: idt_thematic_rows,
  idt_reader: idt_reader_rows,
  idt_digital: idt_digital_rows,
}

// using some little inline style helpers to make the app look okay
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background color if dragging
  background: isDragging ? '' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  width: 300,
});

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormAdd = this.handleFormAdd.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.handleFormSwitch = this.handleFormSwitch.bind(this);
    this.handleFormDrag = this.handleFormDrag.bind(this);
  }

  handleFormSwitch(formIndex, e){
    let formToSwitch = rows[this.props.info.selected_template][e.target.value]
    this.props.onFormSwitch(formIndex, formToSwitch);
  }

  handleFormDelete(field, e){
    this.props.onFormDelete(field);
  };

  handleFormAdd(formIndex, e){
        //add the first row that is switchable
        let formToAdd;
        for (let rowName in rows[this.props.info.selected_template]) { 
          if(rows[this.props.info.selected_template][rowName].switchable === true){
            formToAdd = rows[this.props.info.selected_template][rowName];
            break;
          }
        }
    this.props.onFormAdd(formIndex,formToAdd);
  }

  handleFieldChange(form,field,e){
    this.props.onFieldChange(form,field,e);
  }

  handleFormDrag(result){
    //if you the drag didn't go anywhere, just ignore
    if (!result.destination) {
      return;
    }
    this.props.onFormDrag(result.source.index, result.destination.index);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.handleFormDrag}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.info[this.props.info.selected_template].map((object,i) => (
                <Draggable key={i} draggableId={i}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        style={getItemStyle(
                          provided.draggableStyle,
                          snapshot.isDragging
                        )}
                        {...provided.dragHandleProps}
                      >

                      <div className="blue" key={i + object.typeOfRow}>
                      {/* closable? If yes add a red x icon*/}
                      {
                        this.props.info[this.props.info.selected_template][i].closable ? 
                        <i className="icon-remove-sign close" onClick={(e)=>this.handleFormDelete(i,e)}></i> : 
                        <i></i> 
                      }
                      {/* switchable? If yes, allow a drop down to switch section*/}
                      {
                        this.props.info[this.props.info.selected_template][i].switchable ? 
                          <select className="header-dropdown" onChange={(e)=>this.handleFormSwitch(i,e)}>
                            <option>{object.header}</option>
                            {
                              Object.keys(rows[this.props.info.selected_template])
                              .filter(rowName=>rows[this.props.info.selected_template][rowName].switchable && (rows[this.props.info.selected_template][rowName].typeOfRow !== object.typeOfRow))
                              .sort()
                              .map(rowName => <option key={rowName} value={rowName}>{rows[this.props.info.selected_template][rowName].header}</option>)
                            }    
                          </select> : 
                          <h3>{object.header}</h3>
                      }

                      {object.fields.map((field,j)=>{
                      if(field.dropdown){
                          return(
                              <div className="label" key={i + '' + j}>
                                  <select
                                      value={this.props.info[this.props.info.selected_template][i].fields[j].value}
                                      onChange={(e)=>this.handleFieldChange(i,j,e)}
                                  >
                                      {field.dropdown
                                      .map((selection,k) => {
                                          return(
                                          <option 
                                              value={selection.value}
                                              key={i + '' + j + '' + k}
                                          >
                                          {selection.text}
                                          </option>
                                          )
                                      })}
                                  </select>
                              </div>
                          )
                      }
                      return(            
                        <div 
                          className="label"
                          key={i + ''+ j + field.name }
                        >
                        <input
                          type="text"
                          placeholder={field.label}
                          name={field.name}
                          value={this.props.info[this.props.info.selected_template][i].fields[j].value}
                          onChange={(e)=>this.handleFieldChange(i,j,e)}
                        />
                        </div>)
                      })}
                      {/* addable? */}
                      {
                        this.props.info[this.props.info.selected_template][i].addable ? 
                        <i className="icon-plus-sign add" onClick={(e)=>this.handleFormAdd(i,e)}></i> : 
                        <i></i> 
                      } 
                      </div>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


class FormSection extends React.Component{
    constructor(props) {
        super(props);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFormAdd = this.handleFormAdd.bind(this);
        this.handleFormDelete = this.handleFormDelete.bind(this);
        this.handleFormSwitch = this.handleFormSwitch.bind(this);
        this.handleFormDrag = this.handleFormDrag.bind(this);
      }

      handleFormDrag(startIndex, endIndex){
        this.props.onFormDrag(startIndex, endIndex);
      }
      
      handleFormSwitch(formIndex, formToSwitch){
        this.props.onFormSwitch(formIndex, formToSwitch);
      }

      handleFormDelete(field, e){
        this.props.onFormDelete(field);
      };

      handleFormAdd(formIndex, formToAdd){
        this.props.onFormAdd(formIndex, formToAdd);
      }
  
      handleTemplateChange(e) {
        this.props.onTemplateChange(e.target.value);
      }

      handleFieldChange(form,field,e){
        this.props.onFieldChange(form,field,e.target.value);
      }


    
    render(){
        return(
            <div id="main-form">
            <h3>1. Select an email template.</h3>

            <select
              value={this.props.info.selected_template}
              onChange={this.handleTemplateChange}
            >
              <option value="cced_thematic">CCED Thematic</option>
              <option value="idt_thematic">IDT Thematic</option>
              <option value="id_thematic">ID Thematic</option>
              <option value="idt_reader">IDT Reader Newsletter</option>
              <option value="cced_reader">CCED Reader Newsletter</option>
              <option value="id_reader">ID Reader</option>
              <option value="id_digital">ID Digital Edition Newsletter</option>
              <option value="idt_digital">IDT Digital Edition Newsletter</option>
              <option value="cced_digital">CCED Digital Edition Newsletter</option>
            </select>

            <h3>2. Complete the form.</h3>
           
            <Forms 
                info={this.props.info}
                onTemplateChange={value => this.handleTemplateChange(value)}
                onDateChange={this.handleDateChange}
                onFieldChange={(form, field, value)=>this.handleFieldChange(form, field, value)}
                onFormAdd={(formIndex,formToAdd)=>this.handleFormAdd(formIndex,formToAdd)}
                onFormDelete={(field)=>this.handleFormDelete(field)}
                onFormSwitch = {(formIndex, formToSwitch)=>this.handleFormSwitch(formIndex, formToSwitch)}
                onFormDrag = {(startIndex, endIndex)=>this.handleFormDrag(startIndex, endIndex)}
            />
          </div>


        )
    }

}

export default FormSection;