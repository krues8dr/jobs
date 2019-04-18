'use strict';

import React, { Component } from 'react';
import UserForm from './UserForm';

export default class Signup extends UserForm {
  submitButtonText = 'Create Account';

  saveData(values) {
    return this.model.create(values);
  }

  render() {
    return(
      <section>
        <h1>Signup</h1>
        { this.showForm() }
      </section>
    );
  }
}
